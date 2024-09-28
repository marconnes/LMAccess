import React from "react";

interface ButtonProps {
	onClick: () => void;
	label?: string;
	icon?: React.ReactNode;
	className?: string;
	disabled?: boolean;
	children?: React.ReactNode;
}

interface ButtonActionsProps {
	buttons: ButtonProps[];
	className?: string;
	direction?: "row" | "column";
	containerClassName?: string;
	buttonClassName?: string;
}

function ButtonActions({
	buttons,
	className,
	direction = "row",
	containerClassName = "",
	buttonClassName = "",
}: ButtonActionsProps) {
	const flexDirection = direction === "row" ? "flex-row" : "flex-col";

	return (
		<div
			className={`flex ${flexDirection} ${containerClassName} ${className}`}
		>
			{buttons.map((button, index) => (
				<button
					key={index}
					onClick={button.onClick}
					className={`
						flex items-center justify-center 
						text-white rounded 
						p-base text-sm
						focus:outline-none focus:ring-2 focus:ring-indigo-500
						transition duration-default ease-in-out
						${button.disabled ? "opacity-50 cursor-not-allowed" : ""}
						${buttonClassName}
						${button.className}
					`}
					aria-label={button.label}
					disabled={button.disabled}
				>
					{button.children || (
						<>
							<span className="sr-only sm:not-sr-only sm:mr-sm">
								{button.label}
							</span>
							{button.icon && (
								<span className="text-base">{button.icon}</span>
							)}
						</>
					)}
				</button>
			))}
		</div>
	);
}

export default ButtonActions;
