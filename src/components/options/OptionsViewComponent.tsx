import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { CustomAttributesController } from "src/controllers/CustomAttributesController";
import { GalleryController } from "src/controllers/GalleryController";
import { NewRelationshipController } from "src/controllers/NewRelationshipController";
import { WizardController } from "src/controllers/WizardController";
import { AttributeComponentType } from "src/data/enums/AttributeComponentType";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementType } from "src/data/enums/ElementType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";

export default function OptionsViewComponent({ element }: { element: ElementInterface }): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	const openWizard = () => {
		const wizard = new WizardController(app, api, element);
		wizard.open();
	};

	const addRelationship = () => {
		const relationshipModal = new NewRelationshipController(app, api, element);
		relationshipModal.open();
	};

	const openGallery = () => {
		const galleryModal = new GalleryController(app, api, element);
		galleryModal.open();
	};

	const createCustomAttribute = () => {
		const customAttributeController = new CustomAttributesController(api, element);
		customAttributeController.open();
	};

	let hasWizard = false;

	switch (element.type) {
		case ElementType.NonPlayerCharacter:
		case ElementType.Chapter:
			hasWizard = true;
			break;
	}

	const availableAttributes: AttributeInterface[] = element.attributes.filter((attribute) => !attribute.isSet);

	const addAttribute = (attribute: AttributeInterface) => () => {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

		let value: string | number | boolean | any | any[] = "";
		if (attribute.type === AttributeComponentType.StoryCircle) {
			value = {
				you: "",
				need: "",
				go: "",
				search: "",
				find: "",
				take: "",
				return: "",
				change: "",
			};
		}
		if (attribute.type === AttributeComponentType.MajorClues) value = [];
		codeblockService.updateCodeblockData(attribute.id, value);
	};

	return (
		<>
			<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3 col-span-1 text-xs mb-3">
				<h3 className="!text-xl !font-extralight !mb-1">{t("options.option", { count: 2 })}</h3>
				{hasWizard && (
					<div
						className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-lg"
						onClick={openWizard}
					>
						{t("options.wizard")}
					</div>
				)}
				<div
					className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-lg"
					onClick={addRelationship}
				>
					{t("create.add", { context: "relationship" })}
				</div>
				<div
					className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-lg"
					onClick={openGallery}
				>
					{t("gallery.title")}
				</div>
				<div
					className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-lg"
					onClick={createCustomAttribute}
				>
					{t("attributes.custom")}
				</div>
			</div>
			<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3 col-span-1 text-xs mb-1">
				<h3 className="!mb-3 !text-xl !font-extralight">{t("attributes.attribute", { count: 2 })}</h3>
				{availableAttributes
					.filter(
						(attribute: AttributeInterface) =>
							attribute.id !== AttributeType.Description && attribute.id !== AttributeType.Duration
					)
					.map((attribute: AttributeInterface, index: number) => (
						<div
							className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-lg"
							key={index}
							onClick={addAttribute(attribute)}
						>
							{attribute.isCustom === true
								? attribute.customName ?? attribute.id.substring(1)
								: t("attributes." + attribute.id)}
						</div>
					))}
			</div>
		</>
	);
}
