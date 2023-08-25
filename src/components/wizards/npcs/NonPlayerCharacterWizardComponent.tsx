import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import ChatGptOverlay from "src/components/chatgpt/ChatGptOverlay";
import { ArcType } from "src/data/enums/ArcType";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementType } from "src/data/enums/ElementType";
import { NonPlayerCharacterType } from "src/data/enums/NonPlayerCharacterType";
import { StrengthType } from "src/data/enums/StrengthType";
import { WeaknessType } from "src/data/enums/WeaknessType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { useWizard } from "src/hooks/useWizard";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import NonPlayerCharacterWizardArcStepComponent from "./steps/NonPlayerCharacterWizardArcStepComponent";
import NonPlayerCharacterWizardBehaviourStepComponent from "./steps/NonPlayerCharacterWizardBehaviourStepComponent";
import NonPlayerCharacterWizardBeliefsStepComponent from "./steps/NonPlayerCharacterWizardBeliefsStepComponent";
import NonPlayerCharacterWizardDescriptionStepComponent from "./steps/NonPlayerCharacterWizardDescriptionStepComponent";
import NonPlayerCharacterWizardGhostStepComponent from "./steps/NonPlayerCharacterWizardGhostStepComponent";
import NonPlayerCharacterWizardLieStepComponent from "./steps/NonPlayerCharacterWizardLieStepComponent";
import NonPlayerCharacterWizardNeedStepComponent from "./steps/NonPlayerCharacterWizardNeedStepComponent";
import NonPlayerCharacterWizardOppositionStepComponent from "./steps/NonPlayerCharacterWizardOppositionStepComponent";
import NonPlayerCharacterWizardStrengthsAndWeaknessesStepComponent from "./steps/NonPlayerCharacterWizardStrengthsAndWeaknessesStepComponent";
import NonPlayerCharacterWizardTypeStepComponent from "./steps/NonPlayerCharacterWizardTypeStepComponent";
import NonPlayerCharacterWizardWantStepComponent from "./steps/NonPlayerCharacterWizardWantStepComponent";

interface StepComponentInterface {
	name: string;
	component: any;
	chatGptId?: string;
}

const initialStepComponents: StepComponentInterface[] = [
	{ name: "Type", component: NonPlayerCharacterWizardTypeStepComponent },
	{ name: "Description", component: NonPlayerCharacterWizardDescriptionStepComponent },
];

const stepComponents: StepComponentInterface[] = [
	{ name: "Type", component: NonPlayerCharacterWizardTypeStepComponent },
	{ name: "Description", component: NonPlayerCharacterWizardDescriptionStepComponent },
	{ name: "Character Arc", component: NonPlayerCharacterWizardArcStepComponent },
	{ name: "Beliefs", component: NonPlayerCharacterWizardBeliefsStepComponent, chatGptId: "beliefs" },
	{ name: "Ghost", component: NonPlayerCharacterWizardGhostStepComponent, chatGptId: "ghost" },
	{ name: "Lie", component: NonPlayerCharacterWizardLieStepComponent, chatGptId: "lie" },
	{ name: "Need", component: NonPlayerCharacterWizardNeedStepComponent, chatGptId: "need" },
	{
		name: "Strengths and Weaknesses",
		component: NonPlayerCharacterWizardStrengthsAndWeaknessesStepComponent,
		chatGptId: "sw",
	},
	{ name: "Behaviour", component: NonPlayerCharacterWizardBehaviourStepComponent, chatGptId: "behaviour" },
	{ name: "Want", component: NonPlayerCharacterWizardWantStepComponent, chatGptId: "want" },
	{ name: "Opposition", component: NonPlayerCharacterWizardOppositionStepComponent, chatGptId: "opposition" },
];

const minimalStepComponents: StepComponentInterface[] = [
	{ name: "Type", component: NonPlayerCharacterWizardTypeStepComponent },
	{ name: "Description", component: NonPlayerCharacterWizardDescriptionStepComponent },
	{
		name: "Strengths and Weaknesses",
		component: NonPlayerCharacterWizardStrengthsAndWeaknessesStepComponent,
		chatGptId: "sw",
	},
	{ name: "Behaviour", component: NonPlayerCharacterWizardBehaviourStepComponent, chatGptId: "behaviour" },
	{ name: "Want", component: NonPlayerCharacterWizardWantStepComponent, chatGptId: "want" },
];

function navigator({
	steps,
	step,
	setStep,
}: {
	steps: StepComponentInterface[];
	step: number;
	setStep: (step: number) => void;
}): React.ReactElement {
	return (
		<>
			<ul className="!p-0 !m-0 !mt-3 !mb-3">
				{steps.map((stepComponent: StepComponentInterface, index: number) => {
					return (
						<li
							key={index}
							className={
								step > index ? "text-[--text-normal]" : "text-[--text-muted] hover:text-[--text-accent] cursor-pointer"
							}
							onClick={() => {
								setStep(index + 1);
							}}
						>
							{stepComponent.name}
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default function NonPlayerCharacterWizardComponent({
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

	const [stepsType, setStepsType] = React.useState<StepComponentInterface[]>(initialStepComponents);
	const [showOverlay, setShowOverlay] = React.useState<boolean>(false);

	const api: RpgManagerInterface = useApi();
	const wizardData = useWizard();

	const chatGpt = React.useRef<ChatGptNonPlayerCharacterModel | undefined>(undefined);

	const createAutomatically = async () => {
		if (chatGpt.current === undefined) return;

		setShowOverlay(true);

		for (let index = 0; index < stepsType.length; index++) {
			const step: StepComponentInterface = stepsType[index];

			if (step.chatGptId !== undefined && wizardData[step.chatGptId] === undefined) {
				let responses: string[] = [];
				switch (step.chatGptId) {
					case "want":
						responses = await chatGpt.current.getWant();
						if (responses.length > 0) {
							wizardData.want = responses[0];
							chatGpt.current.want = responses[0];
						}
						break;
					case "beliefs":
						responses = await chatGpt.current.getBeliefs();
						if (responses.length > 0) {
							wizardData.beliefs = responses[0];
							chatGpt.current.beliefs = responses[0];
						}
						break;
					case "ghost":
						responses = await chatGpt.current.getGhost();
						if (responses.length > 0) {
							wizardData.ghost = responses[0];
							chatGpt.current.ghost = responses[0];
						}
						break;
					case "lie":
						responses = await chatGpt.current.getLie();
						if (responses.length > 0) {
							wizardData.lie = responses[0];
							chatGpt.current.lie = responses[0];
						}
						break;
					case "need":
						responses = await chatGpt.current.getNeed();
						if (responses.length > 0) {
							wizardData.need = responses[0];
							chatGpt.current.need = responses[0];
						}
						break;
					case "behaviour":
						responses = await chatGpt.current.getBehaviour();
						if (responses.length > 0) {
							wizardData.behaviour = responses[0];
							chatGpt.current.behaviour = responses[0];
						}
						break;
					case "opposition":
						responses = await chatGpt.current.getOpposition();
						if (responses.length > 0) {
							wizardData.opposition = responses[0];
							chatGpt.current.opposition = responses[0];
						}
						break;
					case "sw":
						responses = await chatGpt.current.getStrenghts();
						if (responses.length > 0) {
							let strengthValue = 0;

							for (const strength of responses) {
								const normalizedStrength = strength.charAt(0).toUpperCase() + strength.slice(1).toLowerCase();

								if (StrengthType[normalizedStrength as keyof typeof StrengthType] !== undefined)
									strengthValue |= StrengthType[normalizedStrength as keyof typeof StrengthType];
							}

							wizardData.strengths = strengthValue;
							setStrengthsValue();
						}

						responses = await chatGpt.current.getWeaknesses();
						if (responses.length > 0) {
							let weaknessValue = 0;

							for (const weakness of responses) {
								const normalizedWeakness = weakness.charAt(0).toUpperCase() + weakness.slice(1).toLowerCase();

								if (WeaknessType[normalizedWeakness as keyof typeof WeaknessType] !== undefined)
									weaknessValue |= WeaknessType[normalizedWeakness as keyof typeof WeaknessType];
							}

							wizardData.weaknesses = weaknessValue;
							setWeaknessesValue();
						}
						break;
				}
			}
		}

		save();
	};

	const setStrengthsValue = () => {
		const strengths: string[] = [];
		Object.entries(StrengthType)
			.filter(([key]) => isNaN(Number(key)))
			.map(([key, currentStrength]) => {
				const strengthValue = currentStrength as unknown as StrengthType;
				if ((wizardData.strengths & strengthValue) === strengthValue) {
					strengths.push(key);
				}
			});
		chatGpt.current.strengths = strengths.join(", ");
	};

	const setWeaknessesValue = () => {
		const weaknesses: string[] = [];
		Object.entries(WeaknessType)
			.filter(([key]) => isNaN(Number(key)))
			.map(([key, currentWeakness]) => {
				const weaknessValue = currentWeakness as unknown as WeaknessType;
				if ((wizardData.weaknesses & weaknessValue) === weaknessValue) {
					weaknesses.push(key);
				}
			});
		chatGpt.current.weaknesses = weaknesses.join(", ");
	};

	if (api.settings.chatGptKey !== undefined && api.settings.chatGptKey !== "" && !chatGpt.current) {
		chatGpt.current = new ChatGptNonPlayerCharacterModel(api, element?.campaign ?? campaign, element?.name ?? name);
	}

	if (Object.keys(wizardData).length === 0) {
		wizardData.nonplayercharactertype = element?.attribute(AttributeType.NonPlayerCharacterType)?.value;
		wizardData.description = element?.attribute(AttributeType.Description)?.value;
		wizardData.arc = element?.attribute(AttributeType.Arc)?.value;
		wizardData.ghost = element?.attribute(AttributeType.Ghost)?.value;
		wizardData.lie = element?.attribute(AttributeType.Lie)?.value;
		wizardData.need = element?.attribute(AttributeType.Need)?.value;
		wizardData.want = element?.attribute(AttributeType.Want)?.value;
		wizardData.opposition = element?.attribute(AttributeType.Opposition)?.value;
		wizardData.strengths = element?.attribute(AttributeType.Strengths)?.value;
		wizardData.weaknesses = element?.attribute(AttributeType.Weaknesses)?.value;
		wizardData.beliefs = element?.attribute(AttributeType.Beliefs)?.value;
		wizardData.behaviour = element?.attribute(AttributeType.Behaviour)?.value;

		if (chatGpt.current !== undefined) {
			if (wizardData.description !== undefined) chatGpt.current.description = wizardData.description;
			if (wizardData.arc !== undefined) chatGpt.current.characterArc = wizardData.arc as ArcType;
			if (wizardData.beliefs !== undefined) chatGpt.current.beliefs = wizardData.beliefs;
			if (wizardData.ghost !== undefined) chatGpt.current.ghost = wizardData.ghost;
			if (wizardData.lie !== undefined) chatGpt.current.lie = wizardData.lie;
			if (wizardData.need !== undefined) chatGpt.current.need = wizardData.need;
			if (wizardData.strengths !== undefined) setStrengthsValue();
			if (wizardData.weaknesses !== undefined) setWeaknessesValue();
			if (wizardData.behaviour !== undefined) chatGpt.current.behaviour = wizardData.behaviour;
			if (wizardData.want !== undefined) chatGpt.current.want = wizardData.want;
			if (wizardData.opposition !== undefined) chatGpt.current.opposition = wizardData.opposition;
		}
	}

	const [step, setStep] = React.useState(1);

	const updateStep = (newStep: number) => {
		if (api.settings.chatGptKey !== undefined && api.settings.chatGptKey !== "") {
			switch (step) {
				case 2:
					if (wizardData.description !== undefined) chatGpt.current.description = wizardData.description;
					break;
				case 3:
					if (wizardData.arc !== undefined) chatGpt.current.characterArc = wizardData.arc as ArcType;
					break;
				case 4:
					if (wizardData.beliefs !== undefined) chatGpt.current.beliefs = wizardData.beliefs;
					break;
				case 5:
					if (wizardData.ghost !== undefined) chatGpt.current.ghost = wizardData.ghost;
					break;
				case 6:
					if (wizardData.lie !== undefined) chatGpt.current.lie = wizardData.lie;
					break;
				case 7:
					if (wizardData.need !== undefined) chatGpt.current.need = wizardData.need;
					break;
				case 8:
					if (wizardData.strengths !== undefined) setStrengthsValue();
					if (wizardData.weaknesses !== undefined) setWeaknessesValue();
					break;
				case 9:
					if (wizardData.behaviour !== undefined) chatGpt.current.behaviour = wizardData.behaviour;
					break;
				case 10:
					if (wizardData.want !== undefined) chatGpt.current.want = wizardData.want;
					break;
				case 11:
					if (wizardData.opposition !== undefined) chatGpt.current.opposition = wizardData.opposition;
					break;
			}
		}

		if (step === 1) {
			console.log(wizardData.nonplayercharactertype);
			if (wizardData.nonplayercharactertype === NonPlayerCharacterType.Extra) {
				setStepsType(minimalStepComponents);
			} else {
				setStepsType(stepComponents);
			}
		}

		if (
			(newStep === 5 || newStep === 6) &&
			(wizardData.arc === ArcType.Flat || wizardData.arc === ArcType.Corruption)
		) {
			if (step > newStep) {
				newStep = 4;
			} else {
				newStep = 7;
			}
		}

		setStep(newStep);
	};

	const CurrentStepComponent = stepsType[step - 1];

	const save = () => {
		const attributes = Object.entries(wizardData).map(([name, value]) => ({
			name: name,
			value: value,
		}));

		if (returnData !== undefined) {
			returnData(attributes);
		} else {
			const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
			codeblockService.updateCodeblockDataList(attributes);
			close();
		}
	};

	let campaignPath;

	if (element !== undefined) {
		campaignPath = element?.type === ElementType.Campaign ? element?.path : element.campaignPath;
	} else {
		campaignPath = campaign?.path;
	}

	return (
		<div className="relative">
			{showOverlay && <ChatGptOverlay />}
			<h2 className="!m-0 !text-2xl !font-extralight border-b border-b-[--background-modifier-border]">
				{t("wizards.npc.title")}
			</h2>
			<div className="grid grid-cols-5 border-b border-b-[--background-modifier-border]">
				<div className="col-span-1 border-r border-r-[--background-modifier-border]">
					{navigator({ steps: stepsType, step: step, setStep: setStep })}
				</div>
				<div className="p-3 col-span-4">
					<CurrentStepComponent.component
						key={step}
						name={element ? element?.name : name}
						chatGpt={chatGpt.current}
						campaignPath={campaignPath}
						setOverlay={setShowOverlay}
					/>
				</div>
			</div>
			<div className="flex justify-end pt-5">
				<button className="rpgm-danger pl-3 pr-3 mr-6" onClick={() => close()}>
					{t("buttons.cancel")}
				</button>
				{api.settings.chatGptKey !== undefined && api.settings.chatGptKey !== "" && chatGpt.current && step > 2 && (
					<button className="rpgm-secondary pl-3 pr-3 mr-6" onClick={() => createAutomatically()}>
						{t("wizards.npc.create")}
					</button>
				)}
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
					disabled={step === stepsType.length}
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
