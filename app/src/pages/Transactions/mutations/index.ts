import {
	deleteTransaction,
	importTransactions,
	updateTransactionStatus,
} from "../../../api";
import { Transaction } from "../types";
import { useMutation, useQueryClient } from "react-query";

export const useImportTransactions = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Transaction[]) => importTransactions(data),
		onSuccess: () => {
			queryClient.invalidateQueries(["transactions"]);
		},
	});
};

export const useDeleteTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteTransaction(id),
		onSuccess: () => {
			queryClient.invalidateQueries(["transactions"]);
		},
	});
};

export const useUpdateTransactionStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { id: string; status: string }) =>
			updateTransactionStatus(data),
		onSuccess: () => {
			queryClient.invalidateQueries(["transactions"]);
		},
	});
};
