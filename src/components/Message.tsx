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
			className={`w-full p-2 rounded-md bg-gray-900 text-white ${className}`}
		>
			{isReadOnly ? (
				<div className="w-full bg-gray-900 text-gray-200 text-sm rounded-md p-1">
					{text}
				</div>
			) : (
				<AutoResizeTextarea
					value={text}
					onChange={(e) => onTextChange?.(e.target.value)}
					placeholder={placeholder}
					className="w-full bg-gray-900 text-gray-200 text-sm rounded-md p-1 cursor-text resize-none overflow-hidden focus:outline-none focus:ring-0 border-none"
				/>
			)}
			{(options.length > 0 || actions.length > 0) && (
				<div className="flex items-center justify-between mt-1">
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
