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
import { FC, useRef } from "react";
import { useDeleteTransaction } from "../mutations";
import { useCustomToast } from "../../../hooks";

interface DeleteConfirmationDialogProps {
	transactionId: string;
}

export const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({
	transactionId,
}) => {
	const { showSuccess } = useCustomToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef(null);
	const { mutate: deleteTransaction } = useDeleteTransaction();

	const handleDelete = () => {
		deleteTransaction(transactionId, {
			onSuccess: () => {
				showSuccess(
					"Transaction deleted.",
					`Transaction with ID ${transactionId} has been deleted.`,
				);
				onClose();
			},
		});
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
							Are you sure you want to delete this transaction id:{" "}
							{transactionId}? This action cannot be undone.
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								colorScheme="teal"
								variant="outline"
								size="md"
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								variant="outline"
								size="md"
								ml={3}
								onClick={handleDelete}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};
