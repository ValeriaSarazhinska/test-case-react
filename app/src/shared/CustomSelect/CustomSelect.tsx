import { FC } from "react";
import { Select } from "@chakra-ui/react";

interface CustomSelectProps {
	placeholder: string;
	options: string[];
	onChange: (value: string) => void;
	width?: string;
}

export const CustomSelect: FC<CustomSelectProps> = ({
	placeholder,
	options,
	onChange,
	width = "50%",
}) => (
	<Select
		placeholder={placeholder}
		width={width}
		onChange={(e) => onChange(e.target.value)}
	>
		{options.map((option) => (
			<option key={option} value={option}>
				{option}
			</option>
		))}
	</Select>
);
