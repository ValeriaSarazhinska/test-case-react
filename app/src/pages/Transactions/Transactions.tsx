import { Box, Select, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, useState } from "react";
import {
	ExportTransactionsModal,
	ImportTransactionsModal,
	TransactionsTable,
} from "./components";
import { Transaction } from "./types";

enum StatusOptions {
	Pending = "Pending",
	Completed = "Completed",
	Cancelled = "Cancelled",
}

enum TypeOptions {
	Refill = "Refill",
	Withdrawal = "Withdrawal",
}

interface CustomSelectProps {
	placeholder: string;
	options: Record<string, string>;
	onChange: (value: string) => void;
	width?: string;
}

export const Transactions = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [statusFilter, setStatusFilter] = useState<string | null>(null);
	const [typeFilter, setTypeFilter] = useState<string | null>(null);

	const CustomSelect: FC<CustomSelectProps> = ({
		placeholder,
		options,
		onChange,
		width = "50%",
	}) => (
		<Select
			placeholder={placeholder}
			width={width}
			onChange={(e) => onChange(e.target.value)}
		>
			{Object.keys(options).map((key) => (
				<option key={key} value={key}>
					{options[key as keyof typeof options]}
				</option>
			))}
		</Select>
	);

	const filteredTransactions = transactions.filter((transaction) => {
		return (
			(!statusFilter || transaction.status === statusFilter) &&
			(!typeFilter || transaction.type === typeFilter)
		);
	});

	return (
		<>
			<Stack
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				mb={5}
				mt={5}
			>
				<Box display="flex" gap={5}>
					<CustomSelect
						placeholder="Status"
						options={StatusOptions}
						onChange={setStatusFilter}
					/>
					<CustomSelect
						placeholder="Type"
						options={TypeOptions}
						onChange={setTypeFilter}
					/>
				</Box>
				<Box>
					<Wrap spacing={4}>
						<WrapItem>
							<ImportTransactionsModal setTransactions={setTransactions} />
						</WrapItem>
						<WrapItem>
							<ExportTransactionsModal transactions={filteredTransactions} />
						</WrapItem>
					</Wrap>
				</Box>
			</Stack>
			<TransactionsTable transactions={filteredTransactions} />
		</>
	);
};
