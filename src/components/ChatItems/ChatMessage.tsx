import React from "react";
import MessageBalloon from "./MessageBalloon";
import TextArea from "../MenuItems/TextArea";
import DropdownBox from "../MenuItems/DropdownBox";
import ButtonActions from "../MenuItems/ButtonActions";
import { IoRefresh, IoTrash, IoSend } from "react-icons/io5";

interface ChatMessageProps {
	id: string;
	message: {
		text: string;
		sender: string;
		model: string;
	};
	isFocused?: boolean;
	onFocus?: (id: string) => void;
	onTextChange?: (id: string, value: string) => void;
	onModelChange?: (id: string, model: string) => void;
	onSend?: (text: string, model: string) => void;
	onResend?: (id: string) => void;
	onDelete?: (id: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
	id,
	message,
	isFocused = true,
	onFocus,
	onTextChange,
	onModelChange,
	onSend,
	onResend,
	onDelete,
}) => {
	const handleFocus = () => {
		if (onFocus) {
			onFocus(id);
		}
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (onTextChange) {
			onTextChange(id, e.target.value);
		}
	};

	const handleModelChange = (model: string) => {
		if (onModelChange) {
			onModelChange(id, model);
		}
	};

	const handleSend = () => {
		if (onSend) {
			onSend(message.text, message.model);
		}
	};

	const handleResend = () => {
		if (onResend) {
			onResend(id);
		}
	};

	const handleDelete = () => {
		if (onDelete) {
			onDelete(id);
		}
	};

	const buttons = [
		...(onSend
			? [
					{
						onClick: handleSend,
						label: "Enviar",
						icon: <IoSend className="" />,
						className: "bg-secondary hover:bg-blue-600 p-sm",
					},
			  ]
			: []),
		...(onResend
			? [
					{
						onClick: handleResend,
						label: "Reenviar",
						icon: <IoRefresh className="" />,
						className: "bg-secondary hover:bg-blue-600 p-sm",
					},
			  ]
			: []),
		...(onDelete
			? [
					{
						onClick: handleDelete,
						label: "Deletar",
						icon: <IoTrash className="" />,
						className: "bg-secondary hover:bg-red-600 p-sm",
					},
			  ]
			: []),
	];

	return (
		<MessageBalloon className="border border-border" onFocus={handleFocus}>
			<div>
				<TextArea
					value={message.text}
					placeholder="Type your message here..."
					onChange={handleTextChange}
					readOnly={message.sender !== "user"}
					maxRows={20}
				/>
			</div>
			{message.sender === "user" && isFocused && (
				<div className="flex justify-between items-center mt-sm">
					<DropdownBox
						options={["gpt-4", "gpt-3.5", "gpt-4o", "gpt-4-turbo"]}
						selectedOption={message.model}
						onSelect={handleModelChange}
					/>
					<ButtonActions buttons={buttons} className="rounded" />
				</div>
			)}
		</MessageBalloon>
	);
};

export default ChatMessage;
