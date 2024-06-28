import { createBrowserRouter, Outlet } from "react-router-dom";
import { Transactions } from "../pages/Transactions";
import { Navigation } from "../shared/Navigation";

const AppLayout = () => {
	return (
		<>
			<Navigation />
			<Outlet />
		</>
	);
};

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Transactions />,
			},
			{
				path: "/transactions",
				element: <Transactions />,
			},
		],
	},
]);
