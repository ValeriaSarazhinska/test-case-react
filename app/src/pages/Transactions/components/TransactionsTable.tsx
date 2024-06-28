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

interface TransactionsTableProps {
	transactions: Transaction[];
}

export const TransactionsTable: FC<TransactionsTableProps> = ({
	transactions,
}) => {
	return (
		<TableContainer>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Id</Th>
						<Th>Status</Th>
						<Th>Type</Th>
						<Th>Client name</Th>
						<Th isNumeric>Amount</Th>
						<Th>Action</Th>
					</Tr>
				</Thead>
				<Tbody>
					{transactions.map((transaction) => (
						<Tr key={transaction.id}>
							<Td>{transaction.id}</Td>
							<Td>{transaction.status}</Td>
							<Td>{transaction.type}</Td>
							<Td>{transaction.clientName}</Td>
							<Td>{transaction.amount}</Td>
							<Td>
								<Wrap spacing={4}>
									<WrapItem>
										<Button colorScheme="teal" size="xs">
											Edit
										</Button>
									</WrapItem>
									<WrapItem>
										<Button colorScheme="red" size="xs">
											Delete
										</Button>
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
