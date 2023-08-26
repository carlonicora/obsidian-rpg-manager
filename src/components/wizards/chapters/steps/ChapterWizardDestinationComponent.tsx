import { RpgManagerInterface } from "@/RpgManagerInterface";
import MarkdownComponent from "@/components/markdowns/MarkdownComponent";
import { NewRelationshipController } from "@/controllers/NewRelationshipController";
import { ElementType } from "@/data/enums/ElementType";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApi } from "@/hooks/useApi";
import { useWizard } from "@/hooks/useWizard";
import { HelperService } from "@/services/HelperService";
import * as React from "react";
import { useTranslation } from "react-i18next";

function DestinationTypeComponent({
	type,
	destinationType,
	setDestinationType,
}: {
	type: ElementType;
	destinationType: ElementType | undefined;
	setDestinationType: (type: ElementType) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div
			key={type}
			className="flex items-center rounded-lg border border-[--background-modifier-border] m-4 p-4 hover:bg-[--background-primary-alt] bg-transparent cursor-pointer"
			onClick={() => setDestinationType(type)}
		>
			<div className="flext min-w[50px] w-[50px] items-center justify-center">
				{destinationType === type && (
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
						<path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
					</svg>
				)}
			</div>
			<div>
				<h4>{t("elements." + type, { count: 1 })}</h4>
				<small>
					<MarkdownComponent value={t("wizards.chapter.destinationtype", { context: type })} />
				</small>
			</div>
		</div>
	);
}

function DestinationElementTypeComponent({
	isElement,
	setIsExistingDestination,
}: {
	isElement: boolean | undefined;
	setIsExistingDestination: (value: boolean) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	return (
		<>
			<div
				key={0}
				className="flex items-center rounded-lg border border-[--background-modifier-border] m-4 p-4 hover:bg-[--background-primary-alt] bg-transparent cursor-pointer"
				onClick={() => setIsExistingDestination(true)}
			>
				<div className="flext min-w[50px] w-[50px] items-center justify-center">
					{isElement === true && (
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
							<path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
						</svg>
					)}
				</div>
				<div>
					<h4>{t("wizards.chapter.destinationelementtype", { context: "existing" })}</h4>
					<small>
						<MarkdownComponent
							value={t("wizards.chapter.destinationelementtypedescription", { context: "existing" })}
						/>
					</small>
				</div>
			</div>
			<div
				key={1}
				className="flex items-center rounded-lg border border-[--background-modifier-border] m-4 p-4 hover:bg-[--background-primary-alt] bg-transparent cursor-pointer"
				onClick={() => setIsExistingDestination(false)}
			>
				<div className="flext min-w[50px] w-[50px] items-center justify-center">
					{isElement === false && (
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
							<path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
						</svg>
					)}
				</div>
				<div>
					<h4>{t("wizards.chapter.destinationelementtype", { context: "new" })}</h4>
					<small>
						<MarkdownComponent value={t("wizards.chapter.destinationelementtypedescription", { context: "new" })} />
					</small>
				</div>
			</div>
		</>
	);
}

export default function ChapterWizardDestinationComponent({
	name,
	campaignPath,
	chatGpt,
	setOverlay,
	errors,
}: {
	name: string;
	campaignPath?: string;
	chatGpt?: any;
	setOverlay: (show: boolean) => void;
	errors?: any[];
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	const wizardData = useWizard();

	const [destinationType, setDestinationType] = React.useState<ElementType | undefined>(wizardData.destinationType);
	const [destinationName, setDestinationName] = React.useState<string>(wizardData.destinationName ?? "");
	const [destinationElementPath, setDestinationElementPath] = React.useState<string | undefined>(
		wizardData.destinationElement
	);
	const [destinationElement, setDestinationElement] = React.useState<ElementInterface | undefined>(
		wizardData.destinationElement ? (api.get(wizardData.destinationElement) as ElementInterface) : undefined
	);
	const [isExistingDestination, setIsExistingDestination] = React.useState<boolean | undefined>(
		wizardData.destinationElement !== undefined ? true : wizardData.destinationName !== undefined ? false : undefined
	);

	const onSetIsExistingDestination = (isExistingDestination: boolean) => {
		setIsExistingDestination(isExistingDestination);

		if (isExistingDestination) {
			const selector = new NewRelationshipController(
				app,
				api,
				undefined,
				campaignPath,
				[destinationType],
				onSetDestinationElement
			);
			selector.open();
		}
	};

	const onSetDestinationType = (destinationType: ElementType) => {
		setDestinationType(destinationType);
		wizardData.destinationType = destinationType;

		if (destinationElement !== undefined) {
			setDestinationElement(undefined);
			wizardData.destinationElement = undefined;
			setIsExistingDestination(undefined);
		}
	};

	const onSetDestinationName = (destinationName: string) => {
		setDestinationName(destinationName);
		setDestinationElement(undefined);
		setDestinationElementPath(undefined);
		wizardData.destinationName = destinationName;
		wizardData.destinationElement = undefined;
	};

	const onSetDestinationElement = (path: string) => {
		path = HelperService.extractPath(path);

		const element: ElementInterface | undefined = api.get(path) as ElementInterface | undefined;

		if (element !== undefined) {
			setDestinationElementPath(path);
			setDestinationElement(element);
			setDestinationName(undefined);
			wizardData.destinationElement = path;
			wizardData.destinationName = undefined;
		}
	};

	let error: string | undefined = undefined;
	if (errors !== undefined && errors.length > 0) {
		error = t("wizards.errors");
		errors.forEach((singleError: string) => (error += "\n- " + singleError));
	}

	return (
		<>
			<h3 className="!m-0 !text-xl !font-extralight">{t("wizards.chapter.destinationtitle")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.chapter.destination", { name: name })} />
			</div>
			{error && (
				<div className="!mt-3 !mb-3 text-[--text-error]">
					<MarkdownComponent value={error} />
				</div>
			)}
			<div className="grid grid-cols-2">
				<DestinationTypeComponent
					key={ElementType.Adventure}
					type={ElementType.Adventure}
					destinationType={destinationType}
					setDestinationType={onSetDestinationType}
				/>
				<DestinationTypeComponent
					key={ElementType.Chapter}
					type={ElementType.Chapter}
					destinationType={destinationType}
					setDestinationType={onSetDestinationType}
				/>
			</div>
			{destinationType !== undefined && (
				<>
					<h3 className="!m-0 !text-xl !font-extralight">{t("wizards.chapter.destinationelementtype")}</h3>
					<div className="grid grid-cols-2">
						<DestinationElementTypeComponent
							isElement={isExistingDestination}
							setIsExistingDestination={onSetIsExistingDestination}
						/>
					</div>
					{isExistingDestination === undefined ? (
						<></>
					) : isExistingDestination ? (
						<>
							<h3 className="!m-0 !text-xl !font-extralight">
								{t("wizards.chapter.destinationelement", { context: "existing" })}
							</h3>
							<div className="ml-3">{destinationElementPath && destinationElement && destinationElement.name}</div>
						</>
					) : (
						<>
							<h3 className="!m-0 !text-xl !font-extralight">
								{t("wizards.chapter.destinationelement", { context: "new" })}
							</h3>
							<input
								type="text"
								defaultValue={destinationName}
								onChange={(e) => onSetDestinationName(e.target.value)}
								className="ml-3"
							/>
						</>
					)}
				</>
			)}
		</>
	);
}
