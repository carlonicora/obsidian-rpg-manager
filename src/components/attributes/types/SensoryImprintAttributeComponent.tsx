import MarkdownEditorComponent from "@/components/editors/MarkdownEditorComponent";
import { useApp } from "@/hooks/useApp";
import { faEarListen, faEdit, faEye, faHandPointer, faTint, faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import ChatGptOverlay from "src/components/chatgpt/ChatGptOverlay";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementType } from "src/data/enums/ElementType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";

interface SensoryImprintInterface {
	sight?: string;
	hear?: string;
	taste?: string;
	touch?: string;
	smell?: string;
}

function EditComponent({
	element,
	attribute,
	onSave,
}: {
	element: ElementInterface;
	attribute: AttributeInterface;
	onSave: () => void;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const [showOverlay, setShowOverlay] = React.useState<boolean>(false);

	const [sensoryImprint, setSensoryImprint] = React.useState<SensoryImprintInterface>(
		attribute.value as SensoryImprintInterface
	);

	const [sight, setSight] = React.useState<string>(attribute?.value?.sight ?? "");
	const [hear, setHear] = React.useState<string>(attribute?.value?.hear ?? "");
	const [smell, setSmell] = React.useState<string>(attribute?.value?.smell ?? "");
	const [touch, setTouch] = React.useState<string>(attribute?.value?.touch ?? "");
	const [taste, setTaste] = React.useState<string>(attribute?.value?.taste ?? "");

	let chatGpt: ChatGptNonPlayerCharacterModel | undefined = undefined;

	if (api.settings.chatGptKey !== undefined && api.settings.chatGptKey !== "") {
		chatGpt = new ChatGptNonPlayerCharacterModel(
			api,
			element.type === ElementType.Campaign ? element : element.campaign,
			element.name
		);
	}

	const handleGeneration = () => {
		if (chatGpt === undefined) return;

		setShowOverlay(true);

		if (element.attribute(AttributeType.Description).isSet)
			chatGpt.description = element.attribute(AttributeType.Description).value as string;

		if (element.attribute(AttributeType.Behaviour).isSet)
			chatGpt.description = element.attribute(AttributeType.Behaviour).value as string;

		chatGpt.getSensoryImprint().then((sensoryImprint: string[]) => {
			const newSensoryImprint: SensoryImprintInterface = {
				sight: sensoryImprint[0],
				hear: sensoryImprint[1],
				smell: sensoryImprint[2],
				touch: sensoryImprint[3],
				taste: sensoryImprint[4],
			};

			setSight(newSensoryImprint.sight ?? "");
			setHear(newSensoryImprint.hear ?? "");
			setSmell(newSensoryImprint.smell ?? "");
			setTouch(newSensoryImprint.touch ?? "");
			setTaste(newSensoryImprint.taste ?? "");

			setSensoryImprint(newSensoryImprint);

			setShowOverlay(false);
		});
	};

	const handleSightChange = (value: string) => {
		setSensoryImprint((prevSensoryImprint) => {
			return { ...prevSensoryImprint, sight: value };
		});
	};

	const handleHearChange = (value: string) => {
		setSensoryImprint((prevSensoryImprint) => {
			return { ...prevSensoryImprint, hear: value };
		});
	};

	const handleTasteChange = (value: string) => {
		setSensoryImprint((prevSensoryImprint) => {
			return { ...prevSensoryImprint, taste: value };
		});
	};

	const handleTouchChange = (value: string) => {
		setSensoryImprint((prevSensoryImprint) => {
			return { ...prevSensoryImprint, touch: value };
		});
	};

	const handleSmellChange = (value: string) => {
		setSensoryImprint((prevSensoryImprint) => {
			return { ...prevSensoryImprint, smell: value };
		});
	};

	const handleDelete = () => {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
		codeblockService.updateCodeblockData(attribute.id, undefined).then(() => {
			onSave();
		});
	};

	const handleSave = () => {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
		codeblockService.updateCodeblockData(attribute.id, sensoryImprint).then(() => {
			onSave();
		});
	};

	return (
		<div className="relative w-full bg-[--background-primary] p-3 border border-[--background-modifier-border] rounded-lg">
			{showOverlay && <ChatGptOverlay type="sensoryimprint" />}
			<div className="w-full flex justify-center mb-3">
				<h3 className="!p-0 !text-xl !font-extralight">{t("attributes.sensoryimprints")}</h3>
			</div>
			<div className={`w-full grid grid-cols-5 gap-3 items-start`}>
				<div className="grid grid-cols-1 items-center justify-center w-full">
					<div className="flex justify-center !text-[--text-faint] mb-1">
						<FontAwesomeIcon icon={faEye} title="Sight" />
					</div>
					<div className="flex justify-center">
						<MarkdownEditorComponent
							key={"sight:" + sight}
							initialValue={sight}
							onChange={handleSightChange}
							className="!p-1 m-0 border rounded-md !border-solid !border-[--background-modifier-border] bg-[--background-modifier-form-field] min-w-full min-h[100px] text-xs"
							campaignPath={element.type === ElementType.Campaign ? element.path : element.campaign.path}
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 items-center justify-center w-full mb-3">
					<div className="flex justify-center !text-[--text-faint] mb-1">
						<FontAwesomeIcon icon={faEarListen} title="Hearing" />
					</div>
					<div className="flex justify-center">
						<MarkdownEditorComponent
							key={"hear:" + hear}
							initialValue={hear}
							onChange={handleHearChange}
							className="!p-1 m-0 border rounded-md !border-solid !border-[--background-modifier-border] bg-[--background-modifier-form-field] min-w-full min-h[100px] text-xs"
							campaignPath={element.type === ElementType.Campaign ? element.path : element.campaign.path}
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 items-center justify-center w-full">
					<div className="flex justify-center !text-[--text-faint] mb-1">
						<FontAwesomeIcon icon={faWind} title="Smell" />
					</div>
					<div className="flex justify-center">
						<MarkdownEditorComponent
							key={"smell:" + smell}
							initialValue={smell}
							onChange={handleSmellChange}
							className="!p-1 m-0 border rounded-md !border-solid !border-[--background-modifier-border] bg-[--background-modifier-form-field] min-w-full min-h[100px] text-xs"
							campaignPath={element.type === ElementType.Campaign ? element.path : element.campaign.path}
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 items-center justify-center w-full">
					<div className="flex justify-center !text-[--text-faint] mb-1">
						<FontAwesomeIcon icon={faHandPointer} title="Touch" />
					</div>
					<div className="flex justify-center">
						<MarkdownEditorComponent
							key={"touch:" + touch}
							initialValue={touch}
							onChange={handleTouchChange}
							className="!p-1 m-0 border rounded-md !border-solid !border-[--background-modifier-border] bg-[--background-modifier-form-field] min-w-full min-h[100px] text-xs"
							campaignPath={element.type === ElementType.Campaign ? element.path : element.campaign.path}
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 items-center justify-center w-full">
					<div className="flex justify-center !text-[--text-faint] mb-1">
						<FontAwesomeIcon icon={faTint} title="Taste" />
					</div>
					<div className="flex justify-center">
						<MarkdownEditorComponent
							key={"taste:" + taste}
							initialValue={taste}
							onChange={handleTasteChange}
							className="!p-1 m-0 border rounded-md !border-solid !border-[--background-modifier-border] bg-[--background-modifier-form-field] min-w-full min-h[100px] text-xs"
							campaignPath={element.type === ElementType.Campaign ? element.path : element.campaign.path}
						/>
					</div>
				</div>
			</div>
			<div className={`w-full flex justify-end mt-3`}>
				<button className="rpgm-danger" onClick={handleDelete}>
					{t("buttons.delete")}
				</button>
				{chatGpt && (
					<button className="rpgm-secondary" onClick={handleGeneration}>
						{t("chatgpt.generate")}
					</button>
				)}
				<button className="rpgm-secondary" onClick={onSave}>
					{t("buttons.cancel")}
				</button>
				<button className="rpgm-primary ml-3" onClick={handleSave}>
					{t("buttons.save")}
				</button>
			</div>
		</div>
	);
}

function ViewComponent({ attribute, edit }: { attribute: AttributeInterface; edit: () => void }): React.ReactElement {
	return (
		<div className="relative w-full">
			<FontAwesomeIcon icon={faEdit} onClick={edit} className="absolute top-3 right-3 cursor-pointer" />
			<BrowseComponent attribute={attribute} />
		</div>
	);
}

function BrowseComponent({ attribute }: { attribute: AttributeInterface }): React.ReactElement {
	const { t } = useTranslation();
	const sensoryImprint: SensoryImprintInterface = attribute.value as SensoryImprintInterface;
	const totalSenses = Object.values(sensoryImprint).filter(Boolean).length;

	return (
		<div className="w-full bg-[--background-primary] p-3 border border-[--background-modifier-border] rounded-lg group">
			<div className="w-full flex justify-center mb-3">
				<h3 className="!p-0 !text-xl !font-extralight">{t("attributes.sensoryimprints")}</h3>
			</div>
			<div
				className={`w-full grid grid-cols-${totalSenses} gap-3 items-start opacity-0 visibility-hidden max-h-0 pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:max-h-[300px] group-hover:pointer-events-auto transition-all duration-500 ease-in-out`}
			>
				{sensoryImprint.sight && (
					<div className="grid items-center justify-center">
						<div className="flex justify-center !text-[--text-faint]">
							<FontAwesomeIcon icon={faEye} />
						</div>
						<div className="flex justify-center -ml-8 text-sm">
							<MarkdownComponent value={sensoryImprint.sight} specificComponent="sensory" />
						</div>
					</div>
				)}
				{sensoryImprint.hear && (
					<div className="grid items-center justify-center">
						<div className="flex justify-center !text-[--text-faint]">
							<FontAwesomeIcon icon={faEarListen} />
						</div>
						<div className="flex justify-center -ml-8 text-sm">
							<MarkdownComponent value={sensoryImprint.hear} specificComponent="sensory" />
						</div>
					</div>
				)}
				{sensoryImprint.smell && (
					<div className="grid items-center justify-center">
						<div className="flex justify-center !text-[--text-faint]">
							<FontAwesomeIcon icon={faWind} />
						</div>
						<div className="flex justify-center -ml-8 text-sm">
							<MarkdownComponent value={sensoryImprint.smell} specificComponent="sensory" />
						</div>
					</div>
				)}
				{sensoryImprint.touch && (
					<div className="grid items-center justify-center">
						<div className="flex justify-center !text-[--text-faint]">
							<FontAwesomeIcon icon={faHandPointer} />
						</div>
						<div className="flex justify-center -ml-8 text-sm">
							<MarkdownComponent value={sensoryImprint.touch} specificComponent="sensory" />
						</div>
					</div>
				)}
				{sensoryImprint.taste && (
					<div className="grid items-center justify-center">
						<div className="flex justify-center !text-[--text-faint]">
							<FontAwesomeIcon icon={faTint} />
						</div>
						<div className="flex justify-center -ml-8 text-sm">
							<MarkdownComponent value={sensoryImprint.taste} specificComponent="sensory" />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default function SensoryImprintAttributeComponent({
	element,
	attribute,
	isEditable,
}: {
	element: ElementInterface;
	attribute?: AttributeInterface;
	isEditable: boolean;
}): React.ReactElement {
	if (attribute === undefined || !attribute.isSet) return null;

	const [editing, setEditing] = React.useState<boolean>(false);

	const handleEdit = () => {
		setEditing(!editing);
	};

	return (
		<>
			{editing ? (
				<EditComponent element={element} attribute={attribute} onSave={handleEdit} />
			) : isEditable ? (
				<ViewComponent attribute={attribute} edit={handleEdit} />
			) : (
				<BrowseComponent attribute={attribute} />
			)}
		</>
	);
}
