import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddTransactionData {
  transaction_insert: Transaction_Key;
}

export interface AddTransactionVariables {
  amount: number;
  description?: string | null;
  type: string;
}

export interface CreateNewUserData {
  user_insert: User_Key;
}

export interface CreateNewUserVariables {
  email: string;
  name: string;
  phoneNumber: string;
}

export interface GetMyWalletData {
  wallets: ({
    id: UUIDString;
    balance: number;
    updatedAt: TimestampString;
  } & Wallet_Key)[];
}

export interface ListAllUsersData {
  users: ({
    id: UUIDString;
    name: string;
    email: string;
  } & User_Key)[];
}

export interface MicroCredit_Key {
  id: UUIDString;
  __typename?: 'MicroCredit_Key';
}

export interface Transaction_Key {
  id: UUIDString;
  __typename?: 'Transaction_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Wallet_Key {
  id: UUIDString;
  __typename?: 'Wallet_Key';
}

interface CreateNewUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
  operationName: string;
}
export const createNewUserRef: CreateNewUserRef;

export function createNewUser(vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;
export function createNewUser(dc: DataConnect, vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;

interface GetMyWalletRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyWalletData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyWalletData, undefined>;
  operationName: string;
}
export const getMyWalletRef: GetMyWalletRef;

export function getMyWallet(): QueryPromise<GetMyWalletData, undefined>;
export function getMyWallet(dc: DataConnect): QueryPromise<GetMyWalletData, undefined>;

interface AddTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTransactionVariables): MutationRef<AddTransactionData, AddTransactionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddTransactionVariables): MutationRef<AddTransactionData, AddTransactionVariables>;
  operationName: string;
}
export const addTransactionRef: AddTransactionRef;

export function addTransaction(vars: AddTransactionVariables): MutationPromise<AddTransactionData, AddTransactionVariables>;
export function addTransaction(dc: DataConnect, vars: AddTransactionVariables): MutationPromise<AddTransactionData, AddTransactionVariables>;

interface ListAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
  operationName: string;
}
export const listAllUsersRef: ListAllUsersRef;

export function listAllUsers(): QueryPromise<ListAllUsersData, undefined>;
export function listAllUsers(dc: DataConnect): QueryPromise<ListAllUsersData, undefined>;

