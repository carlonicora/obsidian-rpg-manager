import * as React from "react";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { NewRelationshipController } from "src/controllers/NewRelationshipController";
import { useApi } from "src/hooks/useApi";

export default function TextInputComponent({
	initialValue,
	campaignPath,
	className,
	onChange,
	onBlur,
}: {
	initialValue?: string;
	campaignPath: string;
	className?: string;
	onChange: (value: string) => void;
	onBlur?: (value: string) => void;
}): React.ReactElement {
	const api: RpgManagerInterface = useApi();

	const [value, setValue] = React.useState<string>(initialValue || "");

	const inputTextRef = React.useRef<HTMLInputElement>(null);
	const previousValueRef = React.useRef<string>(value);
	const lastDetectedPositionRef = React.useRef<number | null>(null);
	const shadowSpanRef = React.useRef<HTMLSpanElement>(null);

	React.useEffect(() => {
		inputTextRef.current?.focus();
	}, []);

	const handleNewRelationship = () => {
		const relationshipModal = new NewRelationshipController(
			app,
			api,
			undefined,
			campaignPath,
			undefined,
			replaceSequenceWithModalValue
		);
		relationshipModal.open();
	};

	const replaceSequenceWithModalValue = (replacementString: string) => {
		if (lastDetectedPositionRef.current !== null && inputTextRef.current) {
			const startPos = lastDetectedPositionRef.current;

			const nextChar = inputTextRef.current.value.charAt(startPos + 2) || "END_OF_STRING";
			const specialCharacters = [" ", ",", ";", ":", "!", ".", "?", "-"];
			const shouldAppendSpace = !specialCharacters.includes(nextChar) || nextChar === "END_OF_STRING";

			const appendedReplacement = shouldAppendSpace ? replacementString + " " : replacementString;

			setValue((prev) => prev.substring(0, startPos) + appendedReplacement + prev.substring(startPos + 2));
			onChange(value.substring(0, startPos) + appendedReplacement + value.substring(startPos + 2));

			setTimeout(() => {
				if (inputTextRef.current && shadowSpanRef.current) {
					const newCursorPos = startPos + appendedReplacement.length;
					inputTextRef.current.selectionStart = newCursorPos;
					inputTextRef.current.selectionEnd = newCursorPos;

					shadowSpanRef.current.textContent = inputTextRef.current.value.substring(0, newCursorPos);

					const cursorPixelPos = shadowSpanRef.current.offsetWidth;

					inputTextRef.current.scrollLeft = cursorPixelPos - inputTextRef.current.offsetWidth / 2;
				}
			}, 0);

			lastDetectedPositionRef.current = null;
		}
	};

	const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const currentValue = event.target.value;

		const position = event.target.selectionStart;
		const lastTwoChars = currentValue.slice(position - 2, position);

		if (lastTwoChars === "[[") {
			lastDetectedPositionRef.current = position - 2;
			handleNewRelationship();
		}

		setValue(currentValue);
		onChange(currentValue);

		previousValueRef.current = currentValue;
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const { selectionStart, selectionEnd } = inputTextRef.current;
		if (selectionStart === selectionEnd) return;

		if ((event.metaKey || event.ctrlKey) && (event.key === "b" || event.key === "i")) {
			if (event.key === "b") {
				const end = inputTextRef.current.selectionEnd;
				inputTextRef.current.value =
					inputTextRef.current.value.substring(0, inputTextRef.current.selectionStart) +
					"**" +
					inputTextRef.current.value.substring(inputTextRef.current.selectionStart, inputTextRef.current.selectionEnd) +
					"**" +
					inputTextRef.current.value.substring(inputTextRef.current.selectionEnd);
				inputTextRef.current.selectionStart = end + 5;
				inputTextRef.current.selectionEnd = end + 5;
			}

			if (event.key === "i") {
				const end = inputTextRef.current.selectionEnd;
				inputTextRef.current.value =
					inputTextRef.current.value.substring(0, inputTextRef.current.selectionStart) +
					"*" +
					inputTextRef.current.value.substring(inputTextRef.current.selectionStart, inputTextRef.current.selectionEnd) +
					"*" +
					inputTextRef.current.value.substring(inputTextRef.current.selectionEnd);
				inputTextRef.current.selectionStart = end + 2;
				inputTextRef.current.selectionEnd = end + 2;
			}

			setValue(inputTextRef.current.value);
		}
	};

	return (
		<>
			<span ref={shadowSpanRef} className="absolute top-[-9999px] left-[-9999px] whitespace-pre" />
			<input
				ref={inputTextRef}
				type="text"
				className={className ?? ""}
				value={value}
				onKeyDown={handleKeyDown}
				onChange={(event) => {
					updateValue(event);
				}}
				onBlur={() => {
					onBlur && onBlur(value);
				}}
			/>
		</>
	);
}
