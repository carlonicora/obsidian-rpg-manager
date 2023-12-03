import { RpgManagerInterface } from "@/RpgManagerInterface";
import ChatGptOverlay from "@/components/chatgpt/ChatGptOverlay";
import { AttributeType } from "@/data/enums/AttributeType";
import { ElementType } from "@/data/enums/ElementType";
import { RelationshipType } from "@/data/enums/RelationshipType";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { RelationshipInterface } from "@/data/interfaces/RelationshipInterface";
import { StepComponentInterface } from "@/data/interfaces/StepComponentInterface";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { useWizard } from "@/hooks/useWizard";
import { FileCreationService } from "@/services/FileCreationService";
import { HelperService } from "@/services/HelperService";
import { RpgManagerCodeblockService } from "@/services/RpgManagerCodeblockService";
import { App, TFile } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import WizardNavigatorComponent from "../WizardNavigatorComponent";
import { ChapterCluesInterface } from "./interfaces/ChapterCluesInterface";
import ChapterWizardCluesComponent from "./steps/ChapterWizardCluesComponent";
import ChapterWizardDescriptionComponent from "./steps/ChapterWizardDescriptionComponent";
import ChapterWizardDestinationComponent from "./steps/ChapterWizardDestinationComponent";
import ChapterWizardTargetComponent from "./steps/ChapterWizardTargetComponent";

const stepComponents: StepComponentInterface[] = [
	{ name: "Description", component: ChapterWizardDescriptionComponent },
	{ name: "Destination", component: ChapterWizardDestinationComponent },
	{ name: "Target", component: ChapterWizardTargetComponent },
	{ name: "Clues", component: ChapterWizardCluesComponent },
];

export default function ChapterWizardComponent({
	element,
	name,
	campaign,
	close,
	returnData,
}: {
	element?: ElementInterface;
	name?: string;
	campaign?: ElementInterface;
	close?: () => void;
	returnData?: (attributes: any) => void;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();
	const wizardData = useWizard();

	if (campaign === undefined && element !== undefined) campaign = element.campaign;

	const [validation, setValidation] = React.useState<number>(10000);
	const [showOverlay, setShowOverlay] = React.useState<boolean>(false);
	const [step, setStep] = React.useState(1);
	const [steps, setSteps] = React.useState<StepComponentInterface[]>(stepComponents);

	if (Object.keys(wizardData).length === 0) {
		wizardData.description = element?.attribute(AttributeType.Description)?.value;

		wizardData.destinationType = undefined;
		wizardData.destinationName = undefined;
		wizardData.destinationElement = undefined;
		wizardData.tagetType = undefined;
		wizardData.targetName = undefined;
		wizardData.targetElement = undefined;
		wizardData.targetDescription = "";

		wizardData.clues = [];
	}

	const updateStep = (newStep: number) => {
		setStep(newStep);
	};

	const setError = (step: number, error: string) => {
		stepComponents[step].errors = stepComponents[step].errors || [];
		stepComponents[step].errors.push(t(error));
	};

	const save = async () => {
		stepComponents[1].errors = undefined;
		stepComponents[2].errors = undefined;

		if (!wizardData.targetType) setError(2, "wizards.chapter.errors.missingtargettype");
		if (!wizardData.targetElement && !wizardData.targetName) setError(2, "wizards.chapter.errors.missingtargetname");

		if (wizardData.destinationType && !wizardData.destinationElement && !wizardData.destinationName)
			setError(1, "wizards.chapter.errors.missingdestination");

		setSteps(stepComponents);

		const hasStep1Errors = !!stepComponents[1].errors;
		const hasStep2Errors = !!stepComponents[2].errors;

		if (hasStep1Errors || hasStep2Errors) {
			setValidation((prev) => prev + 1);
			setStep(hasStep1Errors ? 2 : 3);
			return;
		}

		let destinationFile: string | undefined = undefined;
		let finalClues: string[] = [];
		let targetFile: string | undefined = undefined;

		if (wizardData.destinationType !== undefined) {
			if (wizardData.destinationElement) {
				const destination: ElementInterface = api.get(wizardData.destinationElement) as ElementInterface;
				destinationFile = destination.path;
			} else {
				let positionInParent;

				if (wizardData.destinationElement === ElementType.Adventure) {
					positionInParent = HelperService.getPositionInParent(
						api.get(undefined, campaign, ElementType.Adventure) as ElementInterface[]
					);
				} else {
					positionInParent = HelperService.getPositionInParent(
						api.get(undefined, campaign, ElementType.Chapter, element.parent) as ElementInterface[]
					);
				}

				const fileCreationService = new FileCreationService(
					app,
					api,
					wizardData.destinationType,
					wizardData.destinationName,
					campaign.system,
					element.campaignId,
					wizardData.destinationElement === ElementType.Adventure ? element.campaignId : element.parentId,
					positionInParent
				);
				const file: TFile = await fileCreationService.create(false);
				destinationFile = file.path;
			}
		}

		if (wizardData.clues !== undefined && wizardData.clues.length > 0) {
			let clues: ChapterCluesInterface[] = wizardData.clues;
			clues = clues.filter((clue: ChapterCluesInterface) => clue.clueName !== "");

			finalClues = await Promise.all(
				clues.map(async (clue: ChapterCluesInterface) => {
					if (clue.isExistingClue || clue.clueId) return clue.clueId;

					const fileCreationService = new FileCreationService(
						app,
						api,
						ElementType.Clue,
						clue.clueName,
						campaign.system,
						element.campaignId,
						undefined,
						undefined,
						[{ name: AttributeType.Description, value: clue.description }]
					);

					const file: TFile = await fileCreationService.create(false);

					return file.path;
				})
			);
		}
		if (wizardData.targetElement !== undefined) {
			targetFile = wizardData.targetElement;
		} else {
			const relationships: RelationshipInterface[] = [];
			finalClues.forEach((clue: string) => {
				relationships.push({ type: RelationshipType.Bidirectional, id: clue, isInContent: false });
			});

			const fileCreationService = new FileCreationService(
				app,
				api,
				wizardData.targetType,
				wizardData.targetName,
				campaign.system,
				element.campaignId,
				undefined,
				undefined,
				[{ name: AttributeType.Description, value: wizardData.targetDescription }],
				relationships
			);
			const file: TFile = await fileCreationService.create(false);

			targetFile = file.path;
		}

		const majorClues: any[] = [];
		finalClues.forEach((clue: string) => {
			majorClues.push({ clue: "[[" + clue + "]]", description: undefined, destination: "[[" + destinationFile + "]]" });
		});

		const data = {
			data: {
				[AttributeType.Description]: wizardData.description,
				[AttributeType.MajorClues]: majorClues,
			},
			relationships: [{ type: RelationshipType.Bidirectional, id: targetFile, isInContent: false }],
		};

		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
		await codeblockService.update(data);

		close();
	};

	const CurrentStepComponent = steps[step - 1];

	let campaignId;

	if (element !== undefined) {
		campaignId = element?.type === ElementType.Campaign ? element?.id : element.campaignId;
	} else {
		campaignId = campaign?.id;
	}

	return (
		<div className="relative">
			{showOverlay && <ChatGptOverlay type={ElementType.Chapter} />}
			<h2 className="!text-2xl !font-extralight border-b border-b-[--background-modifier-border]">
				{t("wizards.chapter.title")}
			</h2>
			<div className="grid grid-cols-5 border-b border-b-[--background-modifier-border]">
				<div className="col-span-1 border-r border-r-[--background-modifier-border]">
					<WizardNavigatorComponent key={step + validation} steps={stepComponents} step={step} setStep={setStep} />
				</div>
				<div className="p-3 col-span-4">
					<CurrentStepComponent.component
						key={step + validation}
						name={element ? element?.name : name}
						//chatGpt={chatGpt.current}
						chatGpt={undefined}
						campaignId={campaignId}
						setOverlay={setShowOverlay}
						errors={CurrentStepComponent.errors}
					/>
				</div>
			</div>
			<div className="flex justify-end pt-5">
				<button className="rpgm-danger pl-3 pr-3 mr-6" onClick={() => close()}>
					{t("buttons.cancel")}
				</button>
				<button
					className="rpgm-secondary pl-3 pr-3 ml-3 disabled:text-[--text-faint]"
					onClick={() => updateStep(step - 1)}
					disabled={step === 1}
				>
					{t("buttons.previous")}
				</button>
				<button
					className="rpgm-secondary pl-3 pr-3 ml-3 disabled:text-[--text-faint]"
					onClick={() => updateStep(step + 1)}
					disabled={step === stepComponents.length}
				>
					{t("buttons.next")}
				</button>
				<button className="rpgm-primary pl-3 pr-3 ml-3 mr-5" onClick={() => save()}>
					{t("buttons.create")}
				</button>
			</div>
		</div>
	);
}
