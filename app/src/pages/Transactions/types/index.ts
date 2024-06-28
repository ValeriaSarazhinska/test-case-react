export enum TransactionColumns {
	id = "id",
	status = "status",
	type = "type",
	clientName = "clientName",
	amount = "amount",
}

export type Transaction = {
	[K in keyof typeof TransactionColumns]: string;
};

export type ExportColumns = {
	[K in keyof typeof TransactionColumns]: boolean;
};

export enum StatusOptions {
	Pending = "Pending",
	Completed = "Completed",
	Cancelled = "Cancelled",
}

export enum TypeOptions {
	Refill = "Refill",
	Withdrawal = "Withdrawal",
}
