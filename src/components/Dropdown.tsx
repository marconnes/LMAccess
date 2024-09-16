import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
	options: string[];
	selectedOption?: string;
	onOptionChange?: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
	options,
	selectedOption,
	onOptionChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showAbove, setShowAbove] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		if (!isOpen) {
			const rect = dropdownRef.current?.getBoundingClientRect();
			if (rect) {
				const spaceBelow = window.innerHeight - rect.bottom;
				setShowAbove(spaceBelow < 200);
			}
		}
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="custom-select relative" ref={dropdownRef}>
			<button
				onClick={toggleDropdown}
				className="flex items-center justify-between min-w-24 text-sm text-gray-200 bg-gray-900 p-1 border border-gray-700 rounded focus:outline-none focus:ring-0 hover:text-gray-400"
			>
				{selectedOption || "Select an option"}
				<span className="ml-2 text-xs text-gray-200">▼</span>
			</button>
			{isOpen && (
				<ul
					className={`absolute z-10 min-w-24 text-sm text-gray-200 bg-gray-900 border border-gray-700 max-h-52 overflow-y-auto shadow-lg rounded ${
						showAbove ? "bottom-full mb-1" : "top-full mt-1"
					} shadow-xl`}
				>
					{options.map((option, index) => (
						<li
							key={index}
							onClick={() => {
								onOptionChange?.(option);
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
