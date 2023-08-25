import * as React from "react";
import { useTranslation } from "react-i18next";

/*
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
*/

export default function ChatGptOverlay(): React.ReactElement {
	const { t } = useTranslation();

	const [currentMessage, setCurrentMessage] = React.useState<string>(
		(t("chatgpt.messages", { returnObjects: true }) as string[])[0]
	);

	React.useEffect(() => {
		const interval = setInterval(() => {
			const randomMessage = (t("chatgpt.messages", { returnObjects: true }) as string[])[
				Math.floor(Math.random() * ((t("chatgpt.messages", { returnObjects: true }) as string[]).length - 1)) + 1
			];
			setCurrentMessage(randomMessage);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 p-4">
			<div className="text-center space-y-4">
				<div className="text-2xl text-white font-semibold">{t("chatgpt.overlaytitle")}</div>
				<div className="text-xl text-white">{t("chatgpt.overlaydescription")}</div>
				<div className="text-white">{currentMessage}</div>
			</div>
		</div>
	);
}
