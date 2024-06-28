import { useState } from "react";

interface PaginationOptions {
	defaultPage?: number;
	defaultItemsPerPage?: number;
}

interface PaginationResult<T> {
	currentPage: number;
	itemsPerPage: number;
	setPage: (page: number) => void;
	setItemsPerPage: (itemsPerPage: number) => void;
	paginatedItems: T[];
	totalPages: number;
}

export function usePagination<T>(
	items: T[],
	options: PaginationOptions = {},
): PaginationResult<T> {
	const { defaultPage = 1, defaultItemsPerPage = 10 } = options;
	const [currentPage, setCurrentPage] = useState(defaultPage);
	const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

	const setPage = (page: number) => {
		setCurrentPage(page);
	};

	const calculateTotalPages = () => Math.ceil(items.length / itemsPerPage);

	const totalPages = calculateTotalPages();

	const paginatedItems = items.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const setPerPage = (perPage: number) => {
		setItemsPerPage(perPage);
		setCurrentPage(1);
	};

	return {
		currentPage,
		itemsPerPage,
		setPage,
		setItemsPerPage: setPerPage,
		paginatedItems,
		totalPages,
	};
}
