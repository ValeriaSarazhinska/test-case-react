import DatabaseService from "../../db";
import { Transaction } from "../pages/Transactions/types";

export const getTransactions = async (): Promise<Transaction[]> => {
	try {
		const transactions = DatabaseService.getAllTransactions();
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return transactions;
	} catch (error) {
		console.error("Failed to get transactions", error);
	}
};

export const importTransactions = async (data: Transaction[]) => {
	try {
		DatabaseService.setTransactions(data);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return { status: "OK" };
	} catch (error) {
		console.error("Failed to get transactions", error);
	}
};

export const deleteTransaction = async (id: string) => {
	try {
		DatabaseService.deleteTransactionById(id);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return { status: "OK" };
	} catch (error) {
		console.error("Failed to delete transaction", error);
		throw new Error("Failed to delete transaction");
	}
};

export const updateTransactionStatus = async ({
	id,
	status,
}: { id: string; status: string }) => {
	try {
		DatabaseService.updateTransactionStatus(id, status);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return { status: "OK" };
	} catch (error) {
		console.error("Failed to update transaction status", error);
		throw new Error("Failed to update transaction status");
	}
};
