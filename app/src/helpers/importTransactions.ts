import { Transaction, TransactionColumns } from "../pages/Transactions/types";
import Papa from "papaparse";

interface ParsedTransaction {
	TransactionId: string;
	Status: string;
	Type: string;
	ClientName: string;
	Amount: string;
}

const validateCSV = (data: Transaction[]): boolean => {
	if (data.length === 0) return false;

	const headers = Object.keys(data[0]);
	const requiredHeaders = Object.values(TransactionColumns);

	return requiredHeaders.every((header) => headers.includes(header));
};

export const importTransactionsFromFile = (
	file: File | null,
): Promise<Transaction[]> => {
	return new Promise((resolve, reject) => {
		if (!file) {
			reject(new Error("No file provided"));
			return;
		}

		Papa.parse(file, {
			header: true,
			complete: (results: Papa.ParseResult<Transaction>) => {
				const data = results.data.map(
					(transaction: ParsedTransaction) => ({
						id: transaction.TransactionId,
						status: transaction.Status,
						type: transaction.Type,
						clientName: transaction.ClientName,
						amount: transaction.Amount,
					}),
				) as Transaction[];

				if (validateCSV(data)) {
					resolve(data);
				} else {
					reject(
						new Error(
							"CSV format is incorrect. Please check the file and try again.",
						),
					);
				}
			},
			error: (error: Error) => {
				reject(
					new Error(
						`An error occurred while parsing the file: ${error.message}`,
					),
				);
			},
		});
	});
};
