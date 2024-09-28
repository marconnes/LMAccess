import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropdownBoxProps {
	options: string[];
	selectedOption: string;
	onSelect: (option: string) => void;
	buttonClassName?: string;
	menuClassName?: string;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({
	options,
	selectedOption,
	onSelect,
	buttonClassName,
	menuClassName,
}) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button
					className={`
						flex items-center justify-between
						min-w-36 p-sm rounded
						bg-primary
						focus:outline-none focus:ring-2 focus:ring-indigo-500
						transition duration-default ease-in-out
						text-sm
						${buttonClassName}
					`}
				>
					{selectedOption}
					<span className="ml-2 text-xs">▼</span>
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content
				align="start"
				sideOffset={5}
				className={`
					dropdown-content
					bg-primary border border-border rounded
					shadow-lg overflow-auto z-10 text-sm min-w-36
					${menuClassName}
				`}
			>
				{options.map((option) => (
					<DropdownMenu.Item
						key={option}
						onSelect={() => onSelect(option)}
						className={`
							px-4 py-2 cursor-pointer
							text-textPrimary
							hover:bg-hover
							focus:bg-hover
							transition duration-default ease-in-out
							${option === selectedOption ? "bg-secondary" : ""}
						`}
					>
						{option}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};

export default DropdownBox;
