import { CreateNewUserData, CreateNewUserVariables, GetMyWalletData, AddTransactionData, AddTransactionVariables, ListAllUsersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNewUser(options?: useDataConnectMutationOptions<CreateNewUserData, FirebaseError, CreateNewUserVariables>): UseDataConnectMutationResult<CreateNewUserData, CreateNewUserVariables>;
export function useCreateNewUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewUserData, FirebaseError, CreateNewUserVariables>): UseDataConnectMutationResult<CreateNewUserData, CreateNewUserVariables>;

export function useGetMyWallet(options?: useDataConnectQueryOptions<GetMyWalletData>): UseDataConnectQueryResult<GetMyWalletData, undefined>;
export function useGetMyWallet(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyWalletData>): UseDataConnectQueryResult<GetMyWalletData, undefined>;

export function useAddTransaction(options?: useDataConnectMutationOptions<AddTransactionData, FirebaseError, AddTransactionVariables>): UseDataConnectMutationResult<AddTransactionData, AddTransactionVariables>;
export function useAddTransaction(dc: DataConnect, options?: useDataConnectMutationOptions<AddTransactionData, FirebaseError, AddTransactionVariables>): UseDataConnectMutationResult<AddTransactionData, AddTransactionVariables>;

export function useListAllUsers(options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
export function useListAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
