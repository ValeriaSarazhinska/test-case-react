import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation = () => {
	return (
		<Breadcrumb>
			<BreadcrumbItem>
				<Link to={"/"}>Home</Link>
			</BreadcrumbItem>
			<BreadcrumbItem>
				<Link to={"transactions"}>Transactions</Link>
			</BreadcrumbItem>
		</Breadcrumb>
	);
};
