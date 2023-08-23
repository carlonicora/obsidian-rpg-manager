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

export default function OptionsComponent({ element }: { element: ElementInterface }): React.ReactElement {
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
		<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3 col-span-1 text-xs">
			<h2 className="!m-0 !text-2xl !font-bold border-b border-b-[--background-modifier-border]">
				{t("options.option", { count: 2 })}
			</h2>
			<h3 className="!text-xl !font-extralight !mt-5 !mb-1">{t("elements." + element.type, { count: 1 })}</h3>
			<ul className="!p-1 !m-0">
				{hasWizard && (
					<li
						className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside"
						onClick={openWizard}
					>
						{t("options.wizard")}
					</li>
				)}
				<li
					className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside"
					onClick={addRelationship}
				>
					{t("create.add", { context: "relationship" })}
				</li>
				<li
					className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside"
					onClick={openGallery}
				>
					{t("gallery.title")}
				</li>
				<li
					className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside"
					onClick={createCustomAttribute}
				>
					{t("attributes.custom")}
				</li>
			</ul>
			<h3 className="!mt-5 !mb-2 !text-xl !font-extralight">{t("attributes.attribute", { count: 2 })}</h3>
			<ul className="!p-0 !m-0">
				{availableAttributes
					.filter(
						(attribute: AttributeInterface) =>
							attribute.id !== AttributeType.Description && attribute.id !== AttributeType.Duration
					)
					.map((attribute: AttributeInterface, index: number) => (
						<li
							key={index}
							className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside"
							onClick={addAttribute(attribute)}
						>
							{attribute.isCustom === true
								? attribute.customName ?? attribute.id.substring(1)
								: t("attributes." + attribute.id)}
						</li>
					))}
			</ul>
		</div>
	);
}
