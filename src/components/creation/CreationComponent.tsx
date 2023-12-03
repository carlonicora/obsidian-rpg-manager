import { useApp } from "@/hooks/useApp";
import { App, Modal, TFile } from "obsidian";
import * as React from "react";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { WizardContext } from "src/contexts/WizardContext";
import { ElementType } from "src/data/enums/ElementType";
import { SystemType } from "src/data/enums/SystemType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { FileCreationService } from "src/services/FileCreationService";
import { useApi } from "../../hooks/useApi";
import ChapterWizardComponent from "../wizards/chapters/ChapterWizardComponent";
import NonPlayerCharacterWizardComponent from "../wizards/npcs/NonPlayerCharacterWizardComponent";
import CreationBaseComponent from "./CreationBaseComponent";

export default function CreationComponent({
	type,
	currentNote,
	controller,
	close,
}: {
	type?: ElementType;
	currentNote?: TFile;
	controller: Modal;
	close: () => void;
}): React.ReactElement {
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const [inWizard, setInWizard] = React.useState<boolean>(false);
	const [selectedType, setSelectedType] = React.useState<ElementType | undefined>(type);
	const [name, setName] = React.useState<string | undefined>(undefined);
	const [system, setSystem] = React.useState<SystemType | undefined>(undefined);
	const [campaignId, setCampaignId] = React.useState<string | undefined>(undefined);
	const [parentId, setParentId] = React.useState<string | undefined>(undefined);
	const [positionInParent, setPositionInParent] = React.useState<number | undefined>(undefined);
	const [template, setTemplate] = React.useState<string | undefined>(undefined);

	async function setId(
		launchWizard: boolean,
		passedType: ElementType,
		passedName: string,
		passedSystem: SystemType,
		passedCampaignId?: string,
		passedParentId?: string,
		passedPositionInParent?: number,
		passedTemplate?: string
	): Promise<void> {
		if (launchWizard) {
			setSelectedType(passedType);
			setName(passedName);
			setSystem(passedSystem);
			setCampaignId(passedCampaignId);
			if (passedParentId) setParentId(passedParentId);
			if (passedPositionInParent) setPositionInParent(passedPositionInParent);
			if (passedTemplate) setTemplate(passedTemplate);
			setInWizard(true);
		} else {
			create(
				undefined,
				passedType,
				passedName,
				passedSystem,
				passedCampaignId,
				passedParentId,
				passedPositionInParent,
				passedTemplate
			);
		}
	}

	async function setData(attributes: any): Promise<void> {
		create(attributes);
	}

	async function create(
		attributes?: any,
		passedType?: ElementType,
		passedName?: string,
		passedSystem?: SystemType,
		passedCampaignId?: string,
		passedParentId?: string,
		passedPositionInParent?: number,
		passedTemplate?: string
	): Promise<void> {
		const fileCreator = new FileCreationService(
			app,
			api,
			passedType ?? selectedType,
			passedName ?? name,
			passedSystem ?? system,
			passedCampaignId ?? campaignId,
			passedParentId ?? parentId,
			passedPositionInParent ?? positionInParent,
			attributes,
			undefined,
			passedTemplate ?? template
		);

		if (currentNote !== undefined) {
			fileCreator.createInCurrentFile(currentNote).then((newFile: TFile) => {
				controller.close();
			});
		} else {
			fileCreator.create(true).then((newFile: TFile) => {
				controller.close();
			});
		}
	}

	let wizardTypeComponent: React.ReactElement | undefined = undefined;
	switch (selectedType) {
		case ElementType.Chapter:
			wizardTypeComponent = React.createElement(ChapterWizardComponent, {
				element: undefined,
				name: name,
				campaign: api.get(campaignId) as ElementInterface,
				close: undefined,
				returnData: setData,
			});

			break;
		case ElementType.NonPlayerCharacter:
			wizardTypeComponent = React.createElement(NonPlayerCharacterWizardComponent, {
				element: undefined,
				name: name,
				campaign: api.get(campaignId) as ElementInterface,
				close: undefined,
				returnData: setData,
			});

			break;
	}

	const wizardComponent: React.ReactElement | undefined =
		wizardTypeComponent !== undefined
			? React.createElement(WizardContext.Provider, { value: {} }, wizardTypeComponent)
			: undefined;

	if (inWizard && wizardComponent !== undefined) {
		return wizardComponent;
	}

	return (
		<CreationBaseComponent
			initialType={selectedType}
			currentNote={currentNote}
			setId={setId}
			hasWizard={wizardComponent !== undefined}
			closeModal={close}
		/>
	);
}
