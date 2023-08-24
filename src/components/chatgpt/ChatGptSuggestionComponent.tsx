import * as React from "react";
import { useTranslation } from "react-i18next";

const Spinner: React.FC = () => (
	<svg width="24" height="24" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#333">
		<g fill="none" fillRule="evenodd">
			<g transform="translate(1 1)" strokeWidth="2">
				<circle strokeOpacity=".5" cx="18" cy="18" r="18" />
				<path d="M36 18c0-9.94-8.06-18-18-18">
					<animateTransform
						attributeName="transform"
						type="rotate"
						from="0 18 18"
						to="360 18 18"
						dur="0.9s"
						repeatCount="indefinite"
					/>
				</path>
			</g>
		</g>
	</svg>
);

export default function ChatGptSuggestionComponent({
	generateSuggestions,
	applySuggestions,
}: {
	generateSuggestions: () => Promise<string[]>;
	applySuggestions: (suggestion: string) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	const [suggestions, setSuggestions] = React.useState<string[] | undefined>(undefined);
	const [retrievingSuggestions, setRetrievingSuggestions] = React.useState<boolean>(false);
	const [message, setMessage] = React.useState<string>("Retrieving suggestions from ChatGPT...");

	const selectSuggestion = (suggestion: string) => {
		applySuggestions(suggestion);
	};

	const requestSuggestions = async () => {
		setSuggestions(undefined);
		setRetrievingSuggestions(true);
		const providedSuggestions = await generateSuggestions();
		setRetrievingSuggestions(false);
		setSuggestions(providedSuggestions);
	};

	React.useEffect(() => {
		if (retrievingSuggestions) {
			const interval = setInterval(() => {
				const randomMessage = (t("chatgpt.messages", { returnObjects: true }) as string[])[
					Math.floor(Math.random() * ((t("chatgpt.messages", { returnObjects: true }) as string[]).length - 1)) + 1
				];
				setMessage(randomMessage);
			}, 5000);

			return () => clearInterval(interval);
		} else {
			setMessage((t("chatgpt.messages", { returnObjects: true }) as string[])[0]);
		}
	}, [retrievingSuggestions]);

	return (
		<div className="!mt-3 p-3 grid grid-cols-1 rounded-lg border border-[--background-modifier-border]">
			<div>
				<button className="rpgm-secondary !m-0" onClick={requestSuggestions} disabled={retrievingSuggestions}>
					{t("chatgpt.generate")}
				</button>
			</div>
			{retrievingSuggestions && (
				<div className="mt-3 p-3 flex items-center justify-start">
					<Spinner />
					<span className="ml-3">{message}</span>
				</div>
			)}
			{suggestions && (
				<>
					{suggestions.map((suggestion: string, index: number) => {
						return (
							<div
								key={index}
								className="rounded-lg border border-[--background-modifier-border] m-2 p-1 hover:bg-[--background-primary-alt] bg-transparent cursor-pointer"
								onClick={() => selectSuggestion(suggestion)}
							>
								{suggestion}
							</div>
						);
					})}
				</>
			)}
		</div>
	);
}
