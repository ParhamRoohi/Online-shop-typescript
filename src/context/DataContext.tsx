import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
}

interface DataContextType {
  data: Product[];
  setData: React.Dispatch<React.SetStateAction<Product[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Product[]>([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};