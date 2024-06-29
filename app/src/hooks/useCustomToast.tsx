import { useToast } from "@chakra-ui/react";

type ToastStatus = "success" | "error";

export const useCustomToast = () => {
	const toast = useToast();

	const showToast = (
		status: ToastStatus,
		title: string,
		description: string,
	) => {
		toast({
			title,
			description,
			status,
			duration: 5000,
			isClosable: true,
		});
	};

	const showSuccess = (title: string, description: string) => {
		showToast("success", title, description);
	};

	const showError = (title: string, description: string) => {
		showToast("error", title, description);
	};

	return { showSuccess, showError };
};
