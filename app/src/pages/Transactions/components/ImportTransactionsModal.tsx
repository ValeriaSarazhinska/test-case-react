import {ChangeEvent, Dispatch, FC, SetStateAction, useState} from "react";
import Papa from "papaparse";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import {Transaction, TransactionColumns} from "../types";

interface ImportTransactionsModalProps {
	setTransactions: Dispatch<SetStateAction<Transaction[]>>;
}

export const ImportTransactionsModal: FC<ImportTransactionsModalProps> = ({
	setTransactions,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [file, setFile] = useState<File | null>(null);
	const toast = useToast();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFile(event.target.files[0]);
		}
	};

	const validateCSV = (data: Transaction[]): boolean => {
		if (data.length === 0) return false;

		const headers = Object.keys(data[0]);
		const requiredHeaders = Object.values(TransactionColumns);

		return requiredHeaders.every(header => headers.includes(header));
	};

	const handleImport = () => {
		if (file) {
			Papa.parse(file, {
				header: true,
				complete: (results: Transaction) => {
					const data = results.data.map((transaction: any) => ({
						id: transaction.TransactionId,
						status: transaction.Status,
						type: transaction.Type,
						clientName: transaction.ClientName,
						amount: transaction.Amount,
					})) as Transaction[];
					if (validateCSV(data)) {
						setTransactions(data);
						toast({
							title: "Import successful.",
							description: "Transactions have been imported successfully.",
							status: "success",
							duration: 5000,
							isClosable: true,
						});
						onClose();
					} else {
						toast({
							title: "Import failed.",
							description:
								"CSV format is incorrect. Please check the file and try again.",
							status: "error",
							duration: 5000,
							isClosable: true,
						});
					}
				},
				error: (error: Error) => {
					toast({
						title: "Import failed.",
						description: `An error occurred while parsing the file: ${error.message}`,
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				},
			});
		}
	};

	return (
		<>
			<Button colorScheme="teal" variant="outline" size="md" onClick={onOpen}>
				Import
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Import CSV File</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							pt={1}
							type="file"
							accept=".csv"
							onChange={handleFileChange}
						/>
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
						<Button
							colorScheme="teal"
							variant="outline"
							size="md"
							onClick={handleImport}
						>
							Import
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
