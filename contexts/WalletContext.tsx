import React, { createContext, ReactNode, useContext, useState } from 'react';

interface WalletContextType {
  balance: number;
  deductAmount: (amount: number) => boolean;
  addAmount: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
  initialBalance?: number;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({
  children,
  initialBalance = 2450.00
}) => {
  const [balance, setBalance] = useState<number>(initialBalance);

  const deductAmount = (amount: number): boolean => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addAmount = (amount: number): void => {
    setBalance(prev => prev + amount);
  };

  return (
    <WalletContext.Provider value={{ balance, deductAmount, addAmount }}>
      {children}
    </WalletContext.Provider>
  );
};