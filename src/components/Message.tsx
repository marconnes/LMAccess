import React from "react";
import Dropdown from "./Dropdown";
import MessageActions, { ActionButton } from "./MessageActions";
import AutoResizeTextarea from "./AutoResizeTextarea";

interface MessageProps {
	text: string;
	isReadOnly?: boolean;
	options?: string[];
	selectedOption?: string;
	placeholder?: string;
	actions?: ActionButton[];
	onTextChange?: (text: string) => void;
	onOptionChange?: (option: string) => void;
	className?: string;
}

const Message: React.FC<MessageProps> = ({
	text,
	isReadOnly = false,
	options = [],
	selectedOption,
	placeholder = "Type your message here...",
	actions = [],
	onTextChange,
	onOptionChange,
	className = "",
}) => {
	return (
		<div
			className={`w-full ${className}`}
			style={{
				backgroundColor: "var(--color-bg-primary)",
				color: "var(--color-text-primary)",
				padding: "var(--spacing-small)",
				borderRadius: "var(--border-radius)",
			}}
		>
			{isReadOnly ? (
				<div
					style={{
						backgroundColor: "var(--color-bg-primary)",
						color: "var(--color-text-secondary)",
						fontSize: "var(--font-size-default)",
						padding: "var(--spacing-small)",
						borderRadius: "var(--border-radius)",
					}}
				>
					{text}
				</div>
			) : (
				<AutoResizeTextarea
					value={text}
					onChange={(e) => onTextChange?.(e.target.value)}
					placeholder={placeholder}
					style={{
						backgroundColor: "var(--color-bg-primary)",
						color: "var(--color-text-secondary)",
						fontSize: "var(--font-size-default)",
						padding: "var(--spacing-small)",
						borderRadius: "var(--border-radius)",
						transition: "var(--transition-default)",
					}}
				/>
			)}
			{(options.length > 0 || actions.length > 0) && (
				<div
					className="flex items-center justify-between mt-1"
					style={{ marginTop: "var(--spacing-small)" }}
				>
					{options.length > 0 && (
						<Dropdown
							options={options}
							selectedOption={selectedOption}
							onOptionChange={onOptionChange}
						/>
					)}
					{actions.length > 0 && <MessageActions actions={actions} />}
				</div>
			)}
		</div>
	);
};

export default Message;
