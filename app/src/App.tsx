import "./App.css";
import { initDatabase } from "../db";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ChakraProvider } from "@chakra-ui/react";

initDatabase();

function App() {
	return (
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	);
}

export default App;
