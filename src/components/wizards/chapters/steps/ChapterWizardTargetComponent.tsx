import { RpgManagerInterface } from "@/RpgManagerInterface";
import TextAreaComponent from "@/components/attributes/primitives/TextAreaComponent";
import MarkdownComponent from "@/components/markdowns/MarkdownComponent";
import { NewRelationshipController } from "@/controllers/NewRelationshipController";
import { ElementType } from "@/data/enums/ElementType";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApi } from "@/hooks/useApi";
import { useWizard } from "@/hooks/useWizard";
import { HelperService } from "@/services/HelperService";
import * as React from "react";
import { useTranslation } from "react-i18next";

function TargetTypeComponent({
	type,
	targetType,
	setTargetType,
}: {
	type: ElementType;
	targetType: ElementType | undefined;
	setTargetType: (type: ElementType) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div
			key={type}
			className="flex items-center rounded-lg border border-[--background-modifier-border] m-4 p-4 hover:bg-[--background-primary-alt] bg-transparent cursor-pointer"
			onClick={() => setTargetType(type)}
		>
			<div className="flext min-w[50px] w-[50px] items-center justify-center">
				{targetType === type && (
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
						<path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
					</svg>
				)}
			</div>
			<div>
				<h4>{t("elements." + type, { count: 1 })}</h4>
				<small>
					<MarkdownComponent value={t("wizards.chapter.targettype", { context: type })} />
				</small>
			</div>
		</div>
	);
}

function TargetElementTypeComponent({
	isElement,
	setIsExistingTarget,
}: {
	isElement: boolean | undefined;
	setIsExistingTarget: (value: boolean) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	return (
		<>
			<div
				key={0}
				className="flex items-center rounded-lg border border-[--background-modifier-border] m-4 p-4 hover:bg-[--background-primary-alt] bg-transparent cursor-pointer"
				onClick={() => setIsExistingTarget(true)}
			>
				<div className="flext min-w[50px] w-[50px] items-center justify-center">
					{isElement === true && (
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
							<path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
						</svg>
					)}
				</div>
				<div>
					<h4>{t("wizards.chapter.targetelementtype", { context: "existing" })}</h4>
					<small>
						<MarkdownComponent value={t("wizards.chapter.targetelementtypedescription", { context: "existing" })} />
					</small>
				</div>
			</div>
			<div
				key={1}
				className="flex items-center rounded-lg border border-[--background-modifier-border] m-4 p-4 hover:bg-[--background-primary-alt] bg-transparent cursor-pointer"
				onClick={() => setIsExistingTarget(false)}
			>
				<div className="flext min-w[50px] w-[50px] items-center justify-center">
					{isElement === false && (
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
							<path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
						</svg>
					)}
				</div>
				<div>
					<h4>{t("wizards.chapter.targetelementtype", { context: "new" })}</h4>
					<small>
						<MarkdownComponent value={t("wizards.chapter.targetelementtypedescription", { context: "new" })} />
					</small>
				</div>
			</div>
		</>
	);
}

export default function ChapterWizardTargetComponent({
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

	const [targetType, setTargetType] = React.useState<ElementType | undefined>(wizardData.targetType);
	const [targetName, setTargetName] = React.useState<string>(wizardData.targetName ?? "");
	const [targetElementPath, setTargetElementPath] = React.useState<string | undefined>(wizardData.targetElement);
	const [targetElement, setTargetElement] = React.useState<ElementInterface | undefined>(
		wizardData.targetElement ? (api.get(wizardData.targetElement) as ElementInterface) : undefined
	);
	const [isExistingTarget, setIsExistingTarget] = React.useState<boolean | undefined>(
		wizardData.targetElement !== undefined ? true : wizardData.targetName !== undefined ? false : undefined
	);

	const onSetIsExistingTarget = (isExistingTarget: boolean) => {
		setIsExistingTarget(isExistingTarget);

		if (isExistingTarget) {
			const selector = new NewRelationshipController(
				app,
				api,
				undefined,
				campaignPath,
				[targetType],
				onSetTargetElement
			);
			selector.open();
		}
	};

	const onSetTargetType = (targetType: ElementType) => {
		setTargetType(targetType);
		wizardData.targetType = targetType;

		if (targetElement !== undefined) {
			setTargetElement(undefined);
			wizardData.targetElement = undefined;
			setIsExistingTarget(undefined);
		}
	};

	const onSetTargetName = (targetName: string) => {
		setTargetName(targetName);
		setTargetElement(undefined);
		setTargetElementPath(undefined);
		wizardData.targetName = targetName;
		wizardData.targetElement = undefined;
	};

	const updateDescription = (value: string) => {
		wizardData.targetDescription = value;
	};

	const onSetTargetElement = (path: string) => {
		path = HelperService.extractPath(path);

		const element: ElementInterface | undefined = api.get(path) as ElementInterface | undefined;

		if (element !== undefined) {
			setTargetElementPath(path);
			setTargetElement(element);
			setTargetName(undefined);
			wizardData.targetElement = path;
			wizardData.targetName = undefined;
		}
	};

	let error: string | undefined = undefined;
	if (errors !== undefined && errors.length > 0) {
		error = t("wizards.errors");
		errors.forEach((singleError: string) => (error += "\n- " + singleError));
	}

	return (
		<>
			<h3 className="!m-0 !text-xl !font-extralight">{t("wizards.chapter.targettitle")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.chapter.target", { name: name })} />
			</div>
			{error && (
				<div className="!mt-3 !mb-3 text-[--text-error]">
					<MarkdownComponent value={error} />
				</div>
			)}
			<div className="grid grid-cols-2">
				<TargetTypeComponent
					key={ElementType.Event}
					type={ElementType.Event}
					targetType={targetType}
					setTargetType={onSetTargetType}
				/>
				<TargetTypeComponent
					key={ElementType.Location}
					type={ElementType.Location}
					targetType={targetType}
					setTargetType={onSetTargetType}
				/>
			</div>
			{targetType !== undefined && (
				<>
					<h3 className="!m-0 !text-xl !font-extralight">{t("wizards.chapter.targetelementtype")}</h3>
					<div className="grid grid-cols-2">
						<TargetElementTypeComponent isElement={isExistingTarget} setIsExistingTarget={onSetIsExistingTarget} />
					</div>
					{isExistingTarget === undefined ? (
						<></>
					) : isExistingTarget ? (
						<>
							<h3 className="!m-0 !text-xl !font-extralight">
								{t("wizards.chapter.targetelement", { context: "existing" })}
							</h3>
							<div className="ml-3">{targetElementPath && targetElement && targetElement.name}</div>
						</>
					) : (
						<>
							<h3 className="!m-0 !text-xl !font-extralight">
								{t("wizards.chapter.targetelement", { context: "new" })}
							</h3>
							<input
								type="text"
								defaultValue={targetName}
								onChange={(e) => onSetTargetName(e.target.value)}
								className="ml-3"
							/>
							<h3 className="!m-0 !mt-3 !text-xl !font-extralight">{t("wizards.chapter.targetelementdescription")}</h3>
							<div className="ml-3">
								<TextAreaComponent
									initialValue={wizardData.targetDescription}
									campaignPath={campaignPath}
									onChange={updateDescription}
									className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] rounded-md"
								/>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
}
