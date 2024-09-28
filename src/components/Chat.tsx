import React, { useState } from "react";
import { useChat } from "../hooks/useChat";
import ChatMessage from "./ChatItems/ChatMessage";

const Chat: React.FC = () => {
	const {
		state,
		handleSendMessage,
		handleResendMessage,
		handleDeleteMessage,
		handleTextChange,
		handleModelChange,
	} = useChat();

	const [focusedMessageId, setFocusedMessageId] = useState<string | null>(
		null
	);

	return (
		<div className="flex flex-col h-screen bg-primary">
			<div className="flex-grow overflow-y-auto p-base space-y-base">
				{Object.entries(state.messages).map(([id, message]) => (
					<ChatMessage
						key={id}
						id={id}
						message={message}
						isFocused={focusedMessageId === id}
						onFocus={setFocusedMessageId}
						onTextChange={handleTextChange}
						onModelChange={handleModelChange}
						onResend={handleResendMessage}
						onDelete={handleDeleteMessage}
					/>
				))}
			</div>
			<footer className="p-base">
				<ChatMessage
					id="-1"
					message={{
						text: state.currentInput,
						model: state.currentModel,
						sender: "user",
					}}
					onSend={handleSendMessage}
					onTextChange={handleTextChange}
					onModelChange={handleModelChange}
					onFocus={setFocusedMessageId}
					isFocused={true}
				/>
			</footer>
		</div>
	);
};

export default Chat;
