import { useState } from "react";

interface Message {
	text: string;
	sender: string;
	model: string;
}

interface MessagesMap {
	[id: string]: Message;
}

interface ChatState {
	messages: MessagesMap;
	currentInput: string;
	currentModel: string;
}

export function useChat() {
	const [state, setState] = useState<ChatState>({
		messages: {},
		currentInput: "",
		currentModel: "GPT-4o",
	});

	const processMessage = (message: string): string => {
		let processedMessage = message.trim(); // Remove leading and trailing whitespace
		return processedMessage;
	};

	const handleSendMessage = (message: string, model: string) => {
		const processedMessage = processMessage(message);
		const newMessage: Message = {
			text: processedMessage,
			sender: "user",
			model: model,
		};
		setState((prevState) => ({
			...prevState,
			messages: {
				...prevState.messages,
				[crypto.randomUUID()]: newMessage,
			},
			currentInput: "",
		}));
	};

	const updateMessagesUpToIndex = (
		prevState: ChatState,
		targetIndex: number,
		inclusive: boolean = true
	) => {
		const messageIds = Object.keys(prevState.messages);
		const updatedMessages: MessagesMap = {};
		const limit = inclusive ? targetIndex + 1 : targetIndex;

		for (let i = 0; i < limit; i++) {
			const key = messageIds[i];
			updatedMessages[key] = prevState.messages[key];
		}

		return {
			...prevState,
			messages: updatedMessages,
		};
	};

	const handleResendMessage = (id: string) => {
		setState((prevState) => {
			const targetIndex = Object.keys(prevState.messages).indexOf(id);
			return targetIndex === -1
				? prevState
				: updateMessagesUpToIndex(prevState, targetIndex);
		});
	};

	const handleDeleteMessage = (id: string) => {
		setState((prevState) => {
			const targetIndex = Object.keys(prevState.messages).indexOf(id);
			return targetIndex === -1
				? prevState
				: updateMessagesUpToIndex(prevState, targetIndex, false);
		});
	};

	const handleTextChange = (id: string, text: string) => {
		setState((prevState) => ({
			...prevState,
			...(id === "-1"
				? { currentInput: text }
				: {
						messages: {
							...prevState.messages,
							[id]: {
								...prevState.messages[id],
								text: text,
							},
						},
				  }),
		}));
	};

	const handleModelChange = (id: string, model: string) => {
		setState((prevState) => ({
			...prevState,
			...(id === "-1"
				? { currentModel: model }
				: {
						messages: {
							...prevState.messages,
							[id]: {
								...prevState.messages[id],
								model: model,
							},
						},
				  }),
		}));
	};

	return {
		state,
		handleSendMessage,
		handleResendMessage,
		handleDeleteMessage,
		handleTextChange,
		handleModelChange,
	};
}
