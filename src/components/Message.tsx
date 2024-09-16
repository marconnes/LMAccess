import React, { useRef, useEffect } from "react";
import Dropdown from "./Dropdown";
import MessageActions, { ActionButton } from "./MessageActions";

interface MessageProps {
	text: string;
	sender: "user" | "bot";
	options?: string[];
	placeholder?: string;
	actions?: ActionButton[];
	onTextChange?: (text: string) => void;
	className?: string;
}

const Message: React.FC<MessageProps> = ({
	text,
	sender,
	options = [],
	placeholder = "Digite sua mensagem aqui...",
	actions = [],
	onTextChange,
	className = "",
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustTextareaHeight = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

	useEffect(() => {
		adjustTextareaHeight();
	}, [text]);

	const handleTextareaChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		adjustTextareaHeight();
		onTextChange?.(e.target.value);
	};

	return (
		<div
			className={`w-full p-2 rounded-md bg-gray-900 text-white ${className}`}
		>
			<textarea
				ref={textareaRef}
				className="w-full bg-gray-900 text-gray-200 text-sm rounded-md p-1 mb-1 cursor-text resize-none overflow-hidden focus:outline-none focus:ring-0 border-none"
				value={text}
				onChange={handleTextareaChange}
				rows={1}
				placeholder={placeholder}
			/>
			{(options.length > 0 || actions.length > 0) && (
				<div className="flex items-center justify-between">
					{options.length > 0 && <Dropdown options={options} />}
					{actions.length > 0 && <MessageActions actions={actions} />}
				</div>
			)}
		</div>
	);
};

export default Message;
