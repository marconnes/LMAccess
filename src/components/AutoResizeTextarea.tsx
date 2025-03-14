import React, { useRef, useEffect } from "react";

interface AutoResizeTextareaProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	className?: string;
	style?: React.CSSProperties;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
	value,
	onChange,
	placeholder,
	className,
	style,
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustTextareaHeight = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

	useEffect(() => {
		adjustTextareaHeight();
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e);
		adjustTextareaHeight();
	};

	return (
		<textarea
			ref={textareaRef}
			className={className}
			style={{
				...style,
				transition: "var(--transition-default)",
			}}
			value={value}
			onChange={handleChange}
			rows={1}
			placeholder={placeholder}
		/>
	);
};

export default AutoResizeTextarea;
