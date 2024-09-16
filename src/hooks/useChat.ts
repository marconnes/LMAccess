import { useState } from "react";

interface Message {
	id: string;
	text: string;
	sender: "user" | "bot";
	model: string;
}

interface ChatState {
	currentInput: string;
	messages: Message[];
	currentModel: string;
}

export const useChat = () => {
	const [chatState, setChatState] = useState<ChatState>({
		currentInput: "",
		messages: [],
		currentModel: "Select an option",
	});

	const handleDelete = (id: string) => {
		setChatState((prevState) => ({
			...prevState,
			messages: prevState.messages.filter((message) => message.id !== id),
		}));
	};

	const handleResend = (id: string) => {
		// TODO: implementar lógica de reenvio
        id = id;
	};

	const handleTextChange = (id: string, newText: string) => {
		if (id === "current") {
			setChatState((prevState) => ({
				...prevState,
				currentInput: newText,
			}));
		} else {
			setChatState((prevState) => ({
				...prevState,
				messages: prevState.messages.map((message) =>
					message.id === id ? { ...message, text: newText } : message
				),
			}));
		}
	};

	const handleSendMessage = () => {
		if (chatState.currentInput.trim()) {
			setChatState((prevState) => ({
				...prevState,
				messages: [
					...prevState.messages,
					{
						id: crypto.randomUUID(),
						text: prevState.currentInput,
						sender: "user",
						model: prevState.currentModel,
					},
				],
				currentInput: "",
			}));
		}
	};

	const handleModelChange = (id: string, newModel: string) => {
		if (id === "current") {
			setChatState((prevState) => ({
				...prevState,
				currentModel: newModel,
			}));
		} else {
			setChatState((prevState) => ({
				...prevState,
				messages: prevState.messages.map((message) =>
					message.id === id
						? { ...message, model: newModel }
						: message
				),
			}));
		}
	};

	return {
		chatState,
		handleDelete,
		handleResend,
		handleTextChange,
		handleSendMessage,
		handleModelChange,
	};
};
