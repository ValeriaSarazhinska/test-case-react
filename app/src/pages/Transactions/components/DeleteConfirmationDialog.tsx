import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import {FC, useRef} from "react";

interface DeleteConfirmationDialogProps {
	transactionId: string;
	onDelete: (updatedTransactionId: string) => void;
}

export const DeleteConfirmationDialog: FC<
	DeleteConfirmationDialogProps
> = ({transactionId, onDelete}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();

	const handleDelete = () => {
		onDelete(transactionId);
		onClose();
	};

	return (
		<>
			<Button onClick={onOpen} colorScheme="red" size="xs">
				Delete
			</Button>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Transaction
						</AlertDialogHeader>
						<AlertDialogBody>
							Are you sure you want to delete this transaction id: {transactionId}? This action
							cannot be undone.
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="red" onClick={handleDelete} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};
