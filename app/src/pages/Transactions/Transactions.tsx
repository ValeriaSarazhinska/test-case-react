import { Box, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useState } from "react";
import {
	ExportTransactionsModal,
	ImportTransactionsModal,
	TransactionsTable,
} from "./components";
import { StatusOptions, Transaction, TypeOptions } from "./types";

import { TablePagination } from "../../shared/TablePagination/TablePagination.tsx";
import { CustomSelect } from "../../shared/CustomSelect/CustomSelect.tsx";
import { usePagination } from "../../hooks/usePagination.tsx";

export const Transactions = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [statusFilter, setStatusFilter] = useState<string | null>(null);
	const [typeFilter, setTypeFilter] = useState<string | null>(null);
	const statusOptions = Object.keys(StatusOptions);
	const typeOptions = Object.keys(TypeOptions);

	const handleStatusChange = (status: string) => setStatusFilter(status);
	const handleTypeChange = (type: string) => setTypeFilter(type);

	const filteredTransactions = transactions.filter((transaction) => {
		return (
			(!statusFilter || transaction.status === statusFilter) &&
			(!typeFilter || transaction.type === typeFilter)
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
					<TransactionsTable transactions={paginatedItems} />
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
