import {
 Button,
 Modal,
 ModalCloseButton,
 ModalContent,
 ModalHeader,
 ModalOverlay,
 ModalBody, useDisclosure, FormErrorMessage,
} from "@chakra-ui/react";
import {StatusOptions, Transaction} from "../types";
import {FormControl} from "@chakra-ui/react";
import {FormLabel} from "@chakra-ui/react";
import {Select} from "@chakra-ui/react";
import {ModalFooter} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {FC} from "react";

interface TransactionsTableProps {
 transaction: Transaction;
 onUpdate: (updatedTransaction: Transaction) => void;
}


export const EditTransactionsModal: FC<TransactionsTableProps> = ({transaction , onUpdate}) => {
 const { isOpen, onOpen, onClose } = useDisclosure();
 const { register, handleSubmit, formState: { errors } } = useForm<{ status: string }>();
 const statusOptions = Object.keys(StatusOptions);

 const onSubmit = (data: { status: string }) => {
  onUpdate({ ...transaction, status: data.status });
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
     <ModalCloseButton/>
     <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>

       <FormControl isInvalid={!!errors.status}>
        <FormLabel>Status</FormLabel>
        <Select
            placeholder="Select status"
            defaultValue={transaction.status}
            {...register("status", {required: "Status is required"})}
        >
         {statusOptions.map((option) => (
             <option key={option} value={option}>
              {option}
             </option>
         ))}
        </Select>
        <FormErrorMessage  ml={2}>
         {errors.status?.message}
        </FormErrorMessage>
       </FormControl>
      </ModalBody>
      <ModalFooter>
      <Button colorScheme="red" variant="outline" size="md" mr={3} onClick={onClose}>Close</Button>
     <Button type="submit" colorScheme="teal" variant="outline" size="md">
      Update
     </Button>
     </ModalFooter>
     </form>
    </ModalContent>
   </Modal>

  </>
 );
};

