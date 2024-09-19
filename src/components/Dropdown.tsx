import React, { useState, useRef } from "react";

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

	const handleBlur = (event: React.FocusEvent) => {
		if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
			setIsOpen(false);
		}
	};

	return (
		<div className="custom-select relative" ref={dropdownRef} onBlur={handleBlur}>
			<button
				onClick={toggleDropdown}
				className="flex items-center justify-between min-w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				style={{
					backgroundColor: "var(--color-bg-primary)",
					color: "var(--color-text-secondary)",
					borderColor: "var(--color-border)",
					fontSize: "var(--font-size-default)",
					padding: "var(--spacing-small)",
					borderRadius: "var(--border-radius)",
					transition: "var(--transition-default)",
					minWidth: "calc(var(--icon-size) * 6)",
				}}
			>
				{selectedOption || "Select an option"}
				<span className="ml-2 text-xs">▼</span>
			</button>
			{isOpen && (
				<ul
					className={`absolute z-10 max-h-52 overflow-y-auto shadow-lg ${
						showAbove ? "bottom-full mb-1" : "top-full mt-1"
					} shadow-xl`}
					style={{
						backgroundColor: "var(--color-bg-primary)",
						color: "var(--color-text-secondary)",
						borderColor: "var(--color-border)",
						fontSize: "var(--font-size-default)",
						borderRadius: "var(--border-radius)",
						minWidth: "calc(var(--icon-size) * 6)",
					}}
				>
					{options.map((option, index) => (
						<li
							key={index}
							onClick={() => {
								onOptionChange?.(option);
								setIsOpen(false);
							}}
							className="cursor-pointer"
							style={{
								padding: "var(--spacing-small)",
								transition: "var(--transition-default)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor =
									"var(--color-hover)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor =
									"var(--color-bg-primary)";
							}}
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
