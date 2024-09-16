import React, { useState } from "react";

interface DropdownProps {
	options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="custom-select">
			<button
				onClick={toggleDropdown}
				className="flex items-center justify-between min-w-24 text-sm text-gray-200 bg-gray-900 p-1 border border-gray-700 rounded focus:outline-none focus:ring-0 hover:text-gray-400"
			>
				{selectedOption || "Select an option"}
				<span className="ml-2 text-xs text-gray-200">▼</span>
			</button>
			{isOpen && (
				<ul
					className={`absolute z-10 min-w-24 text-sm text-gray-200 bg-gray-900 border border-gray-700 max-h-52 overflow-y-auto shadow-lg`}
				>
					{options.map((option, index) => (
						<li
							key={index}
							onClick={() => {
								setSelectedOption(option);
								setIsOpen(false);
							}}
							className="p-1 transition-colors duration-200 ease-in-out cursor-pointer hover:bg-gray-700"
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
