import React from "react";
import MessageBalloon from "./MessageBalloon";
import TextArea from "../MenuItems/TextArea";
import DropdownBox from "../MenuItems/DropdownBox";
import ButtonActions from "../MenuItems/ButtonActions";
import { IoSend } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";

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
						className: "bg-secondary hover:bg-blue-600 p-sm",
						children: (
							<>
								<span className="mr-sm">
									Reenviar
								</span>
								<span className="text-base">{<TfiReload />}</span>
							</>
						),
					},
			  ]
			: []),
		...(onDelete
			? [
					{
						onClick: handleDelete,
						label: "Deletar",
						icon: <FaRegTrashAlt className="" />,
						className: "bg-secondary hover:bg-red-600 p-sm",
					},
			  ]
			: []),
	];

	const messageActionsClass = `message-actions ${
		message.sender === "user" && isFocused ? "message-actions-visible" : ""
	}`;

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
			<div className={messageActionsClass}>
				<div className="flex justify-between items-center">
					<DropdownBox
						options={["GPT-4o", "Claude-3.5-Sonnet", "o1-mini"]}
						selectedOption={message.model}
						onSelect={handleModelChange}
					/>
					<ButtonActions
						buttons={buttons}
						className="rounded"
						containerClassName="space-x-sm"
					/>
				</div>
			</div>
		</MessageBalloon>
	);
};

export default ChatMessage;
