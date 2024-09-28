import React from "react";

interface ButtonProps {
	onClick: () => void;
	label: string;
	icon: React.ReactNode;
	className?: string;
}

interface ButtonActionsProps {
	buttons: ButtonProps[];
	className?: string;
}

function ButtonActions({ buttons, className }: ButtonActionsProps) {
	return (
		<div className={`flex flex-row space-x-xs ${className}`}>
			{buttons.map((button, index) => (
				<button
					key={index}
					onClick={button.onClick}
					className={`flex items-center justify-center text-white rounded transition duration-default p-sm sm:text-sm text-base ${button.className}`}
					aria-label={button.label}
				>
					<span className="sr-only sm:not-sr-only sm:mr-sm">
						{button.label}
					</span>
					{button.icon}
				</button>
			))}
		</div>
	);
}

export default ButtonActions;
