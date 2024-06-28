import {
	Button,
	Checkbox,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { ExportColumns, Transaction } from "../types";
import { CSVLink } from "react-csv";

interface ExportTransactionsModalProps {
	transactions: Transaction[];
}

export const ExportTransactionsModal: FC<ExportTransactionsModalProps> = ({
	transactions,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [exportColumns, setExportColumns] = useState<ExportColumns>({
		id: false,
		status: false,
		type: false,
		clientName: false,
		amount: false,
	});

	const columnsToExport = Object.keys(exportColumns).filter(
		(key) => exportColumns[key as keyof ExportColumns],
	);
	const allChecked = Object.values(exportColumns).every(Boolean);
	const isIndeterminate =
		Object.values(exportColumns).some(Boolean) && !allChecked;
	const exportDisabled = !allChecked && !isIndeterminate;

	const handleSelectColumn = (column: keyof ExportColumns) => {
		setExportColumns({ ...exportColumns, [column]: !exportColumns[column] });
	};

	const csvData = transactions.map((transaction) => {
		const data: Record<string, any> = {};
		columnsToExport.forEach((column) => {
			data[column] = transaction[column as keyof Transaction];
		});
		return data;
	});

	const toggleSelectAll = () => {
		const newExportColumns = Object.keys(exportColumns).reduce((acc, key) => {
			acc[key as keyof ExportColumns] = !allChecked;
			return acc;
		}, {} as ExportColumns);
		setExportColumns(newExportColumns);
	};

	return (
		<>
			<Button
				colorScheme="red"
				variant="outline"
				size="md"
				onClick={onOpen}
				isDisabled={transactions.length === 0}
			>
				Export
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Export Columns</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Checkbox
							isChecked={allChecked}
							isIndeterminate={isIndeterminate}
							onChange={toggleSelectAll}
						>
							Select All
						</Checkbox>
						<Stack pl={6} mt={1} spacing={1}>
							{Object.keys(exportColumns).map((key) => (
								<Checkbox
									key={key}
									value={key}
									isChecked={exportColumns[key as keyof ExportColumns]}
									onChange={() =>
										handleSelectColumn(key as keyof ExportColumns)
									}
								>
									{key}
								</Checkbox>
							))}
						</Stack>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="red"
							variant="outline"
							size="md"
							mr={3}
							onClick={onClose}
						>
							Cancel
						</Button>
						<CSVLink
							data={csvData}
							headers={columnsToExport}
							filename={"transactions.csv"}
						>
							<Button
								colorScheme="teal"
								variant="outline"
								size="md"
								isDisabled={exportDisabled}
							>
								Export
							</Button>
						</CSVLink>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
