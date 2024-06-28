import { ChangeEvent, FC } from "react";
import { Box, Button, HStack, Select, Text } from "@chakra-ui/react";

interface CustomPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	itemsPerPage: number;
	onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const TablePagination: FC<CustomPaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	itemsPerPage,
	onItemsPerPageChange,
}) => {
	const handlePageChange = (page: number) => {
		onPageChange(page);
	};

	const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedItemsPerPage = Number(e.target.value);
		onItemsPerPageChange(selectedItemsPerPage);
	};

	return (
		<HStack justifyContent="space-between" alignItems="center" mt={5}>
			<Box display="flex" alignItems="center" gap={2}>
				<Text whiteSpace="nowrap">Items per page:</Text>
				<Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={20}>20</option>
				</Select>
			</Box>
			<HStack spacing={2}>
				<Button
					onClick={() => handlePageChange(currentPage - 1)}
					isDisabled={currentPage === 1}
				>
					Previous
				</Button>
				<Text>
					Page {currentPage} of {totalPages}
				</Text>
				<Button
					onClick={() => handlePageChange(currentPage + 1)}
					isDisabled={currentPage === totalPages}
				>
					Next
				</Button>
			</HStack>
		</HStack>
	);
};
