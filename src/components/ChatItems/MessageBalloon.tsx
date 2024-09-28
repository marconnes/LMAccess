import React, { ReactNode } from "react";

interface MessageBalloonProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

const MessageBalloon: React.FC<MessageBalloonProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<div
			className={`
            p-sm
            rounded
            bg-primary
            text-textPrimary
            ${className}
            `}
			{...props}
		>
			{children}
		</div>
	);
};

export default MessageBalloon;
