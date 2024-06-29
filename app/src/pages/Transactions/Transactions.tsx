import {Box, Input, Stack, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {ChangeEvent, useState} from "react";
import {
	ExportTransactionsModal,
	ImportTransactionsModal,
	TransactionsTable,
} from "./components";
import { StatusOptions, Transaction, TypeOptions } from "./types";
import { TablePagination } from "../../shared/TablePagination";
import { CustomSelect } from "../../shared/CustomSelect";
import { usePagination } from "../../hooks";

export const Transactions = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [statusFilter, setStatusFilter] = useState<string | null>(null);
	const [typeFilter, setTypeFilter] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const statusOptions = Object.keys(StatusOptions);
	const typeOptions = Object.keys(TypeOptions);

	const handleStatusChange = (status: string) => setStatusFilter(status);
	const handleTypeChange = (type: string) => setTypeFilter(type);
	const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) =>
		setSearchQuery(event.target.value.toLowerCase());

	const filteredTransactions = transactions.filter((transaction) => {
		return (
			(!statusFilter || transaction.status === statusFilter) &&
			(!typeFilter || transaction.type === typeFilter) &&
			(transaction.clientName.toLowerCase().includes(searchQuery))
		);
	});

	const {
		currentPage,
		itemsPerPage,
		setPage,
		setItemsPerPage,
		paginatedItems,
		totalPages,
	} = usePagination<Transaction>(filteredTransactions);

	const handleUpdateTransaction = (updatedTransaction: Transaction) => {
		setTransactions((prevTransactions) =>
			prevTransactions.map((t) =>
				t.id === updatedTransaction.id ? updatedTransaction : t,
			),
		);
	};

	const handleDeleteTransaction = (selectedTransactionId: string) => {
		setTransactions((prevTransactions) =>
			prevTransactions.filter(
				(t) => Number(t.id) !== Number(selectedTransactionId),
			),
		);
	};

	const handlePageChange = (page: number) => setPage(page);
	const handleItemsPerPageChange = (perPage: number) =>
		setItemsPerPage(perPage);

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
						options={statusOptions}
						onChange={handleStatusChange}
					/>
					<CustomSelect
						placeholder="Type"
						options={typeOptions}
						onChange={handleTypeChange}
					/>
					<Input
						placeholder="Search by Client Name"
						value={searchQuery}
						onChange={handleSearchQueryChange}
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
			{paginatedItems.length ? (
				<>
					<TransactionsTable
						transactions={paginatedItems}
						onUpdateTransaction={handleUpdateTransaction}
						onDeleteTransaction={handleDeleteTransaction}
					/>

					<TablePagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
						itemsPerPage={itemsPerPage}
						onItemsPerPageChange={handleItemsPerPageChange}
					/>
				</>
			) : (
				<Text>No Data</Text>
			)}
		</>
	);
};
