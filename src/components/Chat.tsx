import Message from "./Message";
import { useChat } from "../hooks/useChat";
import {
	ArrowPathRoundedSquareIcon,
	TrashIcon,
	PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const Chat = () => {
	const {
		chatState,
		handleDelete,
		handleResend,
		handleTextChange,
		handleSendMessage,
		handleModelChange,
	} = useChat();
	const modelOptions = ["GPT-3.5", "GPT-4", "Claude"];

	return (
		<div className="flex flex-col h-screen">
			<div className="flex-grow overflow-y-auto p-4 space-y-2">
				{chatState.messages.map((message) => (
					<Message
						key={message.id}
						text={message.text}
						isReadOnly={message.sender === "bot"}
						options={message.sender === "bot" ? [] : modelOptions}
						selectedOption={message.model}
						onOptionChange={(newModel) =>
							handleModelChange(message.id, newModel)
						}
						onTextChange={(newText) =>
							handleTextChange(message.id, newText)
						}
						actions={
							message.sender === "user"
								? [
										{
											icon: ArrowPathRoundedSquareIcon,
											onClick: () =>
												handleResend(message.id),
											label: "Resend",
										},
										{
											icon: TrashIcon,
											onClick: () =>
												handleDelete(message.id),
											label: "Delete",
										},
								  ]
								: []
						}
					/>
				))}
			</div>
			<div className="p-4 bg-gray-800">
				<Message
					text={chatState.currentInput}
					options={modelOptions}
					selectedOption={chatState.currentModel}
					onOptionChange={(newModel) =>
						handleModelChange("current", newModel)
					}
					onTextChange={(newText) =>
						handleTextChange("current", newText)
					}
					actions={[
						{
							icon: PaperAirplaneIcon,
							onClick: handleSendMessage,
							label: "Send",
						},
					]}
				/>
			</div>
		</div>
	);
};

export default Chat;
