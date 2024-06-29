import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { Spinner } from "@chakra-ui/react";

const Auth = lazy(() => import("../pages/Auth/Auth.tsx"));
const Transactions = lazy(
	() => import("../pages/Transactions/Transactions.tsx"),
);
const Navigation = lazy(() => import("../shared/Navigation/Navigation.tsx"));

const AppLayout = () => {
	return (
		<>
			<Navigation />
			<Outlet />
		</>
	);
};

const router = createBrowserRouter([
	{
		path: "/auth",
		element: <Auth />,
	},
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <ProtectedRoute element={Transactions} />,
			},
			{
				path: "/transactions",
				element: <ProtectedRoute element={Transactions} />,
			},
		],
	},
]);

export const AppRoute = () => {
	return (
		<Suspense fallback={<Spinner size="xl" />}>
			<RouterProvider router={router} />
		</Suspense>
	);
};
