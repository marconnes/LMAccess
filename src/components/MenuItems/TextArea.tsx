import TextareaAutosize from "react-textarea-autosize";

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	value: string;
	rows?: number;
	maxRows?: number;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
	value,
	onChange,
	rows = 1,
	maxRows,
	className,
	...props
}) => {
	return (
		<TextareaAutosize
			value={value}
			onChange={onChange}
			maxRows={maxRows}
			rows={rows}
			className={`
				w-full px-sm py-base
				resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500
				bg-primary text-textPrimary rounded
				transition duration-default ease-in-out text-sm
				${className}
			`}
			{...props}
			style={{}}
		/>
	);
};

export default TextArea;
