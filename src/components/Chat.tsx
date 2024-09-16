import { useState } from "react";
import Message from "./Message";
import {
	PaperAirplaneIcon,
	TrashIcon,
	ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";

interface MessageType {
	id: number;
	text: string;
	sender: "user" | "bot";
}

const Chat = () => {
	const [messages, setMessages] = useState<MessageType[]>([
		{ id: 1, text: "Olá, como posso ajudar?", sender: "bot" },
		{
			id: 2,
			text: "Preciso de informações sobre o produto.",
			sender: "user",
		},
	]);

	const options = ["Option 1", "Option 2", "Option 3"];

	const handleSend = (id: number) => {
		console.log(`Enviando mensagem ${id}`);
	};

	const handleDelete = (id: number) => {
		console.log(`Deletando mensagem ${id}`);
		setMessages(messages.filter((msg) => msg.id !== id));
	};

	const handleResend = (id: number) => {
		console.log(`Reenviando mensagem ${id}`);
	};

	const handleTextChange = (id: number, newText: string) => {
		setMessages(
			messages.map((msg) =>
				msg.id === id ? { ...msg, text: newText } : msg
			)
		);
	};

	return (
		<div className="flex flex-col space-y-2 p-4">
			{messages.map((message) => (
				<Message
					key={message.id}
					text={message.text}
					sender={message.sender}
					options={options}
					placeholder={
						message.sender === "user"
							? "Digite sua mensagem..."
							: ""
					}
					actions={[
						{
							icon: PaperAirplaneIcon,
							onClick: () => handleSend(message.id),
							label: "Enviar",
							condition: message.sender === "user",
						},
						{
							icon: ArrowPathRoundedSquareIcon,
							onClick: () => handleResend(message.id),
							label: "Reenviar",
							condition: message.sender === "bot",
						},
						{
							icon: TrashIcon,
							onClick: () => handleDelete(message.id),
							label: "Deletar",
						},
					]}
					onTextChange={(newText) =>
						handleTextChange(message.id, newText)
					}
				/>
			))}
		</div>
	);
};

export default Chat;
