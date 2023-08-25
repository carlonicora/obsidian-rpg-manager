import * as React from "react";
import { useTranslation } from "react-i18next";
import TextAreaComponent from "src/components/attributes/primitives/TextAreaComponent";
import ChatGptSuggestionComponent from "src/components/chatgpt/ChatGptSuggestionComponent";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { useWizard } from "src/hooks/useWizard";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";

export default function NonPlayerCharacterWizardBeliefsStepComponent({
	name,
	campaignPath,
	chatGpt,
	setOverlay,
}: {
	name: string;
	campaignPath?: string;
	chatGpt?: ChatGptNonPlayerCharacterModel;
	setOverlay: (show: boolean) => void;
}): React.ReactElement {
	const { t } = useTranslation();
	const wizardData = useWizard();

	const [key, setKey] = React.useState<number>(Date.now());
	const [beliefs, setBeliefs] = React.useState<string | undefined>(wizardData.beliefs);

	const updateBeliefs = (value: string) => {
		wizardData.beliefs = value;
		setBeliefs(value);
	};

	const applySuggestion = (suggestion: string) => {
		const updatedBeliefs = beliefs ? `${beliefs}\n${suggestion}` : suggestion;

		updateBeliefs(updatedBeliefs);
		setKey(Date.now());
	};

	async function generateSuggestions(): Promise<string[]> {
		try {
			setOverlay(true);
			return chatGpt.getBeliefs().then((values: string[]) => {
				setOverlay(false);
				return values;
			});
		} catch (error) {
			console.error("Failed to fetch beliefs:", error);
		}
	}

	return (
		<>
			<h3 className="!m-0 !text-xl !font-extralight">{t("attributes.beliefs")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.npc.description", { context: "beliefs", name: name })} />
			</div>
			<div className="">
				<TextAreaComponent
					key={key}
					initialValue={beliefs}
					campaignPath={campaignPath}
					onChange={updateBeliefs}
					className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] rounded-md"
				/>
			</div>
			{chatGpt && (
				<ChatGptSuggestionComponent generateSuggestions={generateSuggestions} applySuggestions={applySuggestion} />
			)}
		</>
	);
}
