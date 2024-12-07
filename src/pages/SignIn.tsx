import * as React from "react";
import { useState } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";

export default function OAuthSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  type User = {
    id: number;
    email: string;
    password: string;
    name: {
      firstname: string;
      lastname: string;
    };
  };

  const providers = [{ id: "credentials", name: "Email and Password" }];

  const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await fetch("https://fakestoreapi.com/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const signIn: (provider: AuthProvider, formData?: FormData) => void = async (
    provider,
    formData
  ) => {
    if (provider.id === "credentials" && formData) {
      const email = formData.get("email")?.toString();
      const password = formData.get("password")?.toString();

      if (!email || !password) {
        setError("Please enter both email and password");
        return;
      }

      const users = await fetchUsers();
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        console.log("Sign-in successful", user);
        setError(null);
        localStorage.setItem("userId", user.id.toString()); 
        localStorage.setItem("userName", user.name.toString()); 

        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } else {
      console.log(`Sign in with ${provider.id}`);
    }
  };
  return (
    <AppProvider theme={theme}>
      {error && (
        <Box mt={2}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Box>
      )}
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { variant: "outlined", fullWidth: true },
          passwordField: { variant: "outlined", fullWidth: true },
          submitButton: { variant: "contained", fullWidth: true },
        }}
      />
    </AppProvider>
  );
}
