import { RpgManagerInterface } from "OLD/src/RpgManagerInterface";
import { CustomAttributesController } from "OLD/src/controllers/CustomAttributesController";
import { GalleryController } from "OLD/src/controllers/GalleryController";
import { NewRelationshipController } from "OLD/src/controllers/NewRelationshipController";
import { WizardController } from "OLD/src/controllers/WizardController";
import { AttributeComponentType } from "OLD/src/data/enums/AttributeComponentType";
import { AttributeType } from "OLD/src/data/enums/AttributeType";
import { ElementType } from "OLD/src/data/enums/ElementType";
import { AttributeInterface } from "OLD/src/data/interfaces/AttributeInterface";
import { ElementInterface } from "OLD/src/data/interfaces/ElementInterface";
import { useApi } from "OLD/src/hooks/useApi";
import { useApp } from "OLD/src/hooks/useApp";
import { FileUploadService } from "OLD/src/services/FileUploadService";
import { RpgManagerCodeblockService } from "OLD/src/services/RpgManagerCodeblockService";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function OptionsViewComponent({ element }: { element: ElementInterface }): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const [isDragging, setIsDragging] = React.useState(false);

	React.useEffect(() => {
		let dragCounter = 0;

		const handleWindowDragEnter = (event: DragEvent) => {
			event.preventDefault();
			dragCounter++;
			setIsDragging(true);
		};

		const handleWindowDragLeave = () => {
			dragCounter--;
			if (dragCounter === 0) {
				setIsDragging(false);
			}
		};

		const handleWindowDrop = (event: DragEvent) => {
			event.preventDefault();
			dragCounter = 0;
			setIsDragging(false);
		};

		window.addEventListener("dragenter", handleWindowDragEnter);
		window.addEventListener("dragleave", handleWindowDragLeave);
		window.addEventListener("drop", handleWindowDrop);

		return () => {
			window.removeEventListener("dragenter", handleWindowDragEnter);
			window.removeEventListener("dragleave", handleWindowDragLeave);
			window.removeEventListener("drop", handleWindowDrop);
		};
	}, []);

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
		const customAttributeController = new CustomAttributesController(app, api, element);
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

		switch (attribute.type) {
			case AttributeComponentType.StoryCircle:
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
				break;
			case AttributeComponentType.Kishotenketsu:
				value = {
					ki: "",
					sho: "",
					ten: "",
					ketsu: "",
				};
				break;
			case AttributeComponentType.MajorClues:
				value = [];
				break;
			case AttributeComponentType.Conflict:
				value = {
					status: "planned",
				};
				break;
		}

		codeblockService.updateCodeblockData(attribute.id, value);
	};

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
	};

	const handleFileDrop = (event: React.DragEvent) => {
		event.preventDefault();
		setIsDragging(false);
		const fileUpload = new FileUploadService(app, api);

		fileUpload.uploadFileList(element, event.dataTransfer.files);
	};

	return (
		<>
			<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3 col-span-1 text-xs mb-3">
				<h3 className="!text-xl !font-extralight !mb-1 mt-0">{t("options.option", { count: 2 })}</h3>
				{hasWizard && (
					<div
						className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-lg"
						onClick={openWizard}
					>
						{t("options.wizard")}
					</div>
				)}
				{element.type !== ElementType.Campaign && (
					<div
						className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-lg"
						onClick={addRelationship}
					>
						{t("create.add", { context: "relationship" })}
					</div>
				)}
				<div
					className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-lg"
					onClick={createCustomAttribute}
				>
					{t("attributes.custom")}
				</div>
				<div
					className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-lg"
					onClick={openGallery}
				>
					{t("gallery.title")}
				</div>
				{isDragging && (
					<div
						className="border-2 border-dashed p-4 cursor-pointer flex-1"
						onDrop={handleFileDrop}
						onDragOver={handleDragOver}
					>
						{t("gallery.dragdrop")}
					</div>
				)}
			</div>
			<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3 col-span-1 text-xs mb-1">
				<h3 className="!text-xl !font-extralight !mb-1 mt-0">{t("attributes.attribute", { count: 2 })}</h3>
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
