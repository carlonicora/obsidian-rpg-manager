import MarkdownEditorComponent from "@/components/editors/MarkdownEditorComponent";
import * as React from "react";
import { useTranslation } from "react-i18next";
import ChatGptSuggestionComponent from "src/components/chatgpt/ChatGptSuggestionComponent";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { useWizard } from "src/hooks/useWizard";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";

export default function NonPlayerCharacterWizardGhostStepComponent({
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
	const [ghost, setGhost] = React.useState<string | undefined>(wizardData.ghost);

	const updateGhost = (value: string) => {
		wizardData.ghost = value;
		setGhost(value);
	};

	const applySuggestion = (suggestion: string) => {
		const updatedGhost = ghost ? `${ghost}\n${suggestion}` : suggestion;

		updateGhost(updatedGhost);
		setKey(Date.now());
	};

	async function generateSuggestions(): Promise<string[]> {
		try {
			setOverlay(true);
			return chatGpt.getGhost().then((value: string[]) => {
				setOverlay(false);
				return value;
			});
		} catch (error) {
			console.error("Failed to fetch behaviour:", error);
		}
	}

	return (
		<>
			<h3 className="!text-xl !font-extralight">{t("attributes.ghost")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.npc.description", { context: "ghost", name: name })} />
			</div>
			<div className="">
				<MarkdownEditorComponent
					key={key}
					initialValue={ghost}
					campaignPath={campaignPath}
					onChange={updateGhost}
					className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] rounded-md"
				/>
			</div>
			{chatGpt && (
				<ChatGptSuggestionComponent generateSuggestions={generateSuggestions} applySuggestions={applySuggestion} />
			)}
		</>
	);
}
