import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element: Element, ...rest }: any) => {
	const token = localStorage.getItem("token");
	return token ? <Element {...rest} /> : <Navigate to="/auth" />;
};
