import MarkdownEditorComponent from "@/components/editors/MarkdownEditorComponent";
import * as React from "react";
import { useTranslation } from "react-i18next";
import ChatGptSuggestionComponent from "src/components/chatgpt/ChatGptSuggestionComponent";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { useWizard } from "src/hooks/useWizard";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";

export default function NonPlayerCharacterWizardOppositionStepComponent({
	name,
	campaignId,
	chatGpt,
	setOverlay,
}: {
	name: string;
	campaignId?: string;
	chatGpt?: ChatGptNonPlayerCharacterModel;
	setOverlay: (show: boolean) => void;
}): React.ReactElement {
	const { t } = useTranslation();
	const wizardData = useWizard();

	const [key, setKey] = React.useState<number>(Date.now());
	const [opposition, setOpposition] = React.useState<string | undefined>(wizardData.opposition);

	const updateOpposition = (value: string) => {
		wizardData.opposition = value;
		setOpposition(value);
	};

	const applySuggestion = (suggestion: string) => {
		const updatedOpposition = opposition ? `${opposition}\n${suggestion}` : suggestion;

		updateOpposition(updatedOpposition);
		setKey(Date.now());
	};

	async function generateSuggestions(): Promise<string[]> {
		try {
			setOverlay(true);
			return chatGpt.getOpposition().then((value: string[]) => {
				setOverlay(false);
				return value;
			});
		} catch (error) {
			console.error("Failed to fetch behaviour:", error);
		}
	}

	return (
		<>
			<h3 className="!text-xl !font-extralight">{t("attributes.opposition")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.npc.description", { context: "opposition", name: name })} />
				{wizardData.want !== undefined && (
					<>
						<br />
						<small>
							{name} wants to:
							<MarkdownComponent value={wizardData.want} />
						</small>
					</>
				)}
			</div>
			<div className="">
				<MarkdownEditorComponent
					key={key}
					initialValue={opposition}
					campaignId={campaignId}
					onChange={updateOpposition}
					className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] rounded-md"
				/>
			</div>

			{chatGpt && (
				<ChatGptSuggestionComponent generateSuggestions={generateSuggestions} applySuggestions={applySuggestion} />
			)}
		</>
	);
}
