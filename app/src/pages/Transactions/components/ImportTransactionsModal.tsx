import { ChangeEvent, useState } from "react";

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
} from "@chakra-ui/react";
import { importTransactionsFromFile } from "../../../helpers";
import { useImportTransactions } from "../mutations";
import { useCustomToast } from "../../../hooks";

export const ImportTransactionsModal = () => {
	const { showSuccess, showError } = useCustomToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [file, setFile] = useState<File | null>(null);

	const { mutateAsync: importTransactions, isLoading } =
		useImportTransactions();

	const importDisabled = !file || isLoading;

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFile(event.target.files[0]);
		}
	};

	const handleImport = async () => {
		try {
			const transactions = await importTransactionsFromFile(file);
			await importTransactions(transactions);
			showSuccess(
				"Import successful.",
				"Transactions have been imported successfully.",
			);
		} catch (error) {
			showError(
				"Import failed.",
				`An error occurred while parsing the file: ${error.message}`,
			);
		} finally {
			onClose();
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
							isDisabled={importDisabled}
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
