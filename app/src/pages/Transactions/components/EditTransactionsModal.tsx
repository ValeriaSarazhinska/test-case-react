import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	useDisclosure,
} from "@chakra-ui/react";
import { StatusOptions } from "../types";
import { useForm } from "react-hook-form";
import { FC } from "react";
import { useUpdateTransactionStatus } from "../mutations";

interface TransactionsTableProps {
	transactionId: string;
	transactionStatus: string;
}

export const EditTransactionsModal: FC<TransactionsTableProps> = ({
	transactionId,
	transactionStatus,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ status: string }>();
	const statusOptions = Object.keys(StatusOptions);
	const { mutate: updateTransactionStatus } = useUpdateTransactionStatus();

	const onSubmit = ({ status }: { status: string }) => {
		updateTransactionStatus({ id: transactionId, status });
		onClose();
	};

	return (
		<>
			<Button colorScheme="teal" size="xs" onClick={onOpen}>
				Edit
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Transaction</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<FormControl isInvalid={!!errors.status}>
								<FormLabel>Status</FormLabel>
								<Select
									placeholder="Select status"
									defaultValue={transactionStatus}
									{...register("status", { required: "Status is required" })}
								>
									{statusOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</Select>
								<FormErrorMessage ml={2}>
									{errors.status?.message}
								</FormErrorMessage>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button
								colorScheme="red"
								variant="outline"
								size="md"
								mr={3}
								onClick={onClose}
							>
								Close
							</Button>
							<Button
								type="submit"
								colorScheme="teal"
								variant="outline"
								size="md"
							>
								Update
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};
