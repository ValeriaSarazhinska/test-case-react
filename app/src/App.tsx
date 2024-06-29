import "./App.css";
import { AppRoute } from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import DatabaseService from "../db";
import { QueryClient, QueryClientProvider } from "react-query";

DatabaseService.initDatabase();
const queryClient = new QueryClient();

function App() {
	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<AppRoute />
			</QueryClientProvider>
		</ChakraProvider>
	);
}

export default App;
