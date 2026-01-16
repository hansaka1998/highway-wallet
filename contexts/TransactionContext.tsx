import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Transaction {
  id: string;
  type: 'payment' | 'topup';
  amount: number;
  description: string;
  timestamp: Date;
  location?: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'topup',
      amount: 1000,
      description: 'Wallet Top-up',
      timestamp: new Date('2024-01-15T10:30:00'),
    },
    {
      id: '2',
      type: 'payment',
      amount: -150,
      description: 'Toll Payment - Colombo Expressway',
      timestamp: new Date('2024-01-15T14:20:00'),
      location: 'Colombo Expressway - Kadawatha',
    },
    {
      id: '3',
      type: 'payment',
      amount: -150,
      description: 'Toll Payment - Southern Expressway',
      timestamp: new Date('2024-01-14T16:45:00'),
      location: 'Southern Expressway - Kottawa',
    },
  ]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};