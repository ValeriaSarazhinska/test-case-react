import { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
`;

const ErrorMessage = styled.div`
    color: #e74c3c;
    margin-bottom: 10px;
`;

const StyledInput = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const StyledButton = styled.button`
    padding: 10px;
    background-color: #2C7A7B;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #349596;
    }
`;

const Auth = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const handleLogin = () => {
		if (username && password) {
			const token = btoa(`${username}:${password}`);
			localStorage.setItem("token", token);
			navigate("/");
		} else {
			setError("Please enter username and password");
		}
	};

	return (
		<Container>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<StyledInput
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<StyledInput
				placeholder="Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<StyledButton onClick={handleLogin}>Login</StyledButton>
		</Container>
	);
};

export default Auth;
