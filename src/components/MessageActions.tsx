import React from "react";

export interface ActionButton {
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	onClick: (() => void) | undefined;
	label: string;
	condition?: boolean;
}

interface MessageActionsProps {
	actions: ActionButton[];
}

const MessageActions: React.FC<MessageActionsProps> = ({ actions }) => {
	return (
		<div className="flex space-x-2">
			{actions.map(
				(action, index) =>
					action.condition !== false &&
					action.onClick && (
						<button
							key={index}
							onClick={action.onClick}
							className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
							aria-label={action.label}
						>
							<action.icon className="h-5 w-5" />
						</button>
					)
			)}
		</div>
	);
};

export default MessageActions;
