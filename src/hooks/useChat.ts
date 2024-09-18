import { useReducer } from "react";

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

type ChatAction =
	| { type: "DELETE_MESSAGE"; payload: string }
	| { type: "RESEND_MESSAGE"; payload: string }
	| { type: "CHANGE_TEXT"; payload: { id: string; text: string } }
	| { type: "SEND_MESSAGE" }
	| { type: "CHANGE_MODEL"; payload: { id: string; model: string } };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
	switch (action.type) {
		case "DELETE_MESSAGE":
			return {
				...state,
				messages: state.messages.filter((message) => message.id !== action.payload),
			};
		case "RESEND_MESSAGE":
			return {
				...state,
				messages: state.messages.map((message) =>
					message.id === action.payload ? { ...message, sender: "user" } : message
				),
			};
		case "CHANGE_TEXT":
			if (action.payload.id === "current") {
				return { ...state, currentInput: action.payload.text };
			}
			return {
				...state,
				messages: state.messages.map((message) =>
					message.id === action.payload.id ? { ...message, text: action.payload.text } : message
				),
			};
		case "SEND_MESSAGE":
			if (state.currentInput.trim()) {
				return {
					...state,
					messages: [
						...state.messages,
						{
							id: crypto.randomUUID(),
							text: state.currentInput,
							sender: "user",
							model: state.currentModel,
						},
					],
					currentInput: "",
				};
			}
			return state;
		case "CHANGE_MODEL":
			if (action.payload.id === "current") {
				return { ...state, currentModel: action.payload.model };
			}
			return {
				...state,
				messages: state.messages.map((message) =>
					message.id === action.payload.id ? { ...message, model: action.payload.model } : message
				),
			};
		default:
			return state;
	}
};

const initialState: ChatState = {
	currentInput: "",
	messages: [],
	currentModel: "Select an option",
};

export const useChat = () => {
	const [chatState, dispatch] = useReducer(chatReducer, initialState);

	const handleDelete = (id: string) => dispatch({ type: "DELETE_MESSAGE", payload: id });

	const handleResend = (id: string) => dispatch({ type: "RESEND_MESSAGE", payload: id });

	const handleTextChange = (id: string, newText: string) =>
		dispatch({ type: "CHANGE_TEXT", payload: { id, text: newText } });

	const handleSendMessage = () => dispatch({ type: "SEND_MESSAGE" });

	const handleModelChange = (id: string, newModel: string) =>
		dispatch({ type: "CHANGE_MODEL", payload: { id, model: newModel } });

	return {
		chatState,
		handleDelete,
		handleResend,
		handleTextChange,
		handleSendMessage,
		handleModelChange,
	};
};
