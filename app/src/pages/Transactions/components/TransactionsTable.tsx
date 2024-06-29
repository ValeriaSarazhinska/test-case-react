import {
	Button,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import { FC } from "react";
import { Transaction } from "../types";
import { EditTransactionsModal } from "./EditTransactionsModal.tsx";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog.tsx";

interface TransactionsTableProps {
	transactions: Transaction[];
	onUpdateTransaction: (transaction: Transaction) => void;
	onDeleteTransaction: (transactionId: string) => void;
}

export const TransactionsTable: FC<TransactionsTableProps> = ({
	transactions,onUpdateTransaction, onDeleteTransaction
}) => {
	return (
		<TableContainer>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>#</Th>
						<Th>Status</Th>
						<Th>Type</Th>
						<Th>Id</Th>
						<Th>Client name</Th>
						<Th isNumeric>Amount</Th>
						<Th>Action</Th>
					</Tr>
				</Thead>
				<Tbody>
					{transactions.map((transaction, index) => (
						<Tr key={transaction.id}>
							<Td>{index + 1}</Td>
							<Td>{transaction.status}</Td>
							<Td>{transaction.type}</Td>
							<Td>{transaction.id}</Td>
							<Td>{transaction.clientName}</Td>
							<Td>{transaction.amount}</Td>
							<Td>
								<Wrap spacing={4}>
									<WrapItem>
										<EditTransactionsModal
											transaction={transaction}
											onUpdate={onUpdateTransaction}
										/>
									</WrapItem>
									<WrapItem>
										<DeleteConfirmationDialog
											transactionId={transaction.id}
											onDelete={onDeleteTransaction}
										/>
									</WrapItem>
								</Wrap>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
