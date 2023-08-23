import * as React from "react";
import { useTranslation } from "react-i18next";
import StrengthsComponent from "src/components/editors/StrengthsComponent";
import WeaknessesComponent from "src/components/editors/WeaknessesComponent";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { StrengthType } from "src/data/enums/StrengthType";
import { WeaknessType } from "src/data/enums/WeaknessType";
import { useWizard } from "src/hooks/useWizard";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";

export default function NonPlayerCharacterWizardStrengthsAndWeaknessesStepComponent({
	name,
	campaignPath,
	chatGpt,
}: {
	name: string;
	campaignPath?: string;
	chatGpt?: ChatGptNonPlayerCharacterModel;
}): React.ReactElement {
	const { t } = useTranslation();
	const wizardData = useWizard();

	const [key, setKey] = React.useState<number>(Date.now());
	const [retrievingStrengthsSuggestions, setRetrievingStrengthsSuggestions] = React.useState<boolean>(false);
	const [retrievingWeaknessesSuggestions, setRetrievingWeaknessesSuggestions] = React.useState<boolean>(false);
	const [strengths, setStrengths] = React.useState<number>(wizardData.strengths);
	const [weaknesses, setWeaknesses] = React.useState<number>(wizardData.weaknesses);

	const requestStrengthsSuggestions = async () => {
		setRetrievingStrengthsSuggestions(true);
		try {
			const suggestedStrengths: string[] = await chatGpt.getStrenghts();

			let strengthValue = 0;

			for (const strength of suggestedStrengths) {
				const normalizedStrength = strength.charAt(0).toUpperCase() + strength.slice(1).toLowerCase();

				if (StrengthType[normalizedStrength as keyof typeof StrengthType] !== undefined)
					strengthValue |= StrengthType[normalizedStrength as keyof typeof StrengthType];
			}

			wizardData.strengths = strengthValue;
			setStrengths(strengthValue);
		} catch (error) {
			console.error("Failed to fetch behaviour:", error);
		}
		setKey(Date.now());
		setRetrievingStrengthsSuggestions(false);
	};

	const requestWeaknessesSuggestions = async () => {
		setRetrievingWeaknessesSuggestions(true);
		try {
			const suggestedWeaknesses: string[] = await chatGpt.getWeaknesses();

			let weaknessValue = 0;

			for (const weakness of suggestedWeaknesses) {
				const normalizedWeakness = weakness.charAt(0).toUpperCase() + weakness.slice(1).toLowerCase();

				if (WeaknessType[normalizedWeakness as keyof typeof WeaknessType] !== undefined)
					weaknessValue |= WeaknessType[normalizedWeakness as keyof typeof WeaknessType];
			}

			wizardData.weaknesses = weaknessValue;
			setWeaknesses(weaknessValue);
		} catch (error) {
			console.error("Failed to fetch behaviour:", error);
		}
		setKey(Date.now());
		setRetrievingWeaknessesSuggestions(false);
	};

	const updateStrengths = (strengths: number) => {
		wizardData.strengths = wizardData.strengths ^ strengths;
		setStrengths(wizardData.strengths);
	};

	const updateWeaknesses = (weaknesses: number) => {
		wizardData.weaknesses = wizardData.weaknesses ^ weaknesses;
		setWeaknesses(wizardData.weaknesses);
	};

	return (
		<>
			<h3 className="!m-0 !text-xl !font-extralight">{t("attributes.strengths")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.npc.description", { context: "strengths", name: name })} />
			</div>
			<div className="!mb-5">
				<StrengthsComponent key={key} initialValue={strengths} propagateValue={updateStrengths} />
			</div>
			{chatGpt && (
				<div className="!mt-3 grid grid-cols-1">
					<div className="!mb-3">
						<button
							className="rpgm-secondary"
							onClick={requestStrengthsSuggestions}
							disabled={retrievingStrengthsSuggestions}
						>
							{t("chatgpt.generate")}
						</button>
					</div>
					{retrievingStrengthsSuggestions && (
						<div className="p-3 rounded-lg border border-[--background-modifier-border]">
							{(t("chatgpt.messages", { returnObjects: true }) as string[])[0]}
						</div>
					)}
				</div>
			)}

			<h3 className="!m-0 !text-xl !font-extralight">{t("attributes.weaknesses")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.npc.description", { context: "weaknesses", name: name })} />
			</div>
			<div>
				<WeaknessesComponent key={key} initialValue={weaknesses} propagateValue={updateWeaknesses} />
			</div>
			{chatGpt && (
				<div className="!mt-3 grid grid-cols-1">
					<div className="!mb-3">
						<button
							className="rpgm-secondary"
							onClick={requestWeaknessesSuggestions}
							disabled={retrievingWeaknessesSuggestions}
						>
							{t("chatgpt.generate")}
						</button>
					</div>
					{retrievingWeaknessesSuggestions && (
						<div className="p-3 rounded-lg border border-[--background-modifier-border]">
							{(t("chatgpt.messages", { returnObjects: true }) as string[])[0]}
						</div>
					)}
				</div>
			)}
		</>
	);
}
