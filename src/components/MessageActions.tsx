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
							className="flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
							aria-label={action.label}
							style={{
								color: "var(--color-text-secondary)",
								backgroundColor: "var(--color-bg-secondary)",
								padding: "var(--spacing-small)",
								borderRadius: "50%",
								width: "calc(var(--icon-size) * 2)",
								height: "calc(var(--icon-size) * 2)",
								transition: "var(--transition-default)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor =
									"var(--color-hover)";
								e.currentTarget.style.color =
									"var(--color-text-primary)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor =
									"var(--color-bg-secondary)";
								e.currentTarget.style.color =
									"var(--color-text-secondary)";
							}}
						>
							<action.icon
								style={{
									height: "var(--icon-size)",
									width: "var(--icon-size)",
								}}
							/>
						</button>
					)
			)}
		</div>
	);
};

export default MessageActions;
