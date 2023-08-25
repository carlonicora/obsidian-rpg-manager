import * as React from "react";
import { useTranslation } from "react-i18next";

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
