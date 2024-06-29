import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navigation = () => {
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

export default Navigation;
