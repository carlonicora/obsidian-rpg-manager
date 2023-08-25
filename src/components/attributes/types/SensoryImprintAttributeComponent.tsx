import { faEarListen, faEdit, faEye, faHandPointer, faTint, faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import TextAreaComponent from "../primitives/TextAreaComponent";

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
		setSensoryImprint({ ...sensoryImprint, sight: value });
	};

	const handleHearChange = (value: string) => {
		setSensoryImprint({ ...sensoryImprint, hear: value });
	};

	const handleTasteChange = (value: string) => {
		setSensoryImprint({ ...sensoryImprint, taste: value });
	};

	const handleTouchChange = (value: string) => {
		setSensoryImprint({ ...sensoryImprint, touch: value });
	};

	const handleSmellChange = (value: string) => {
		setSensoryImprint({ ...sensoryImprint, smell: value });
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
			{showOverlay && <ChatGptOverlay />}
			<div className="w-full flex justify-center mb-3">
				<h3 className="!m-0 !p-0 !text-xl !font-extralight">{t("attributes.sensoryimprints")}</h3>
			</div>
			<div className={`w-full grid grid-cols-5 gap-3 items-start`}>
				<div className="grid items-center justify-center">
					<div className="flex justify-center !text-[--text-faint] mb-1">
						<FontAwesomeIcon icon={faEye} title="Sight" />
					</div>
					<div className="flex justify-center">
						<TextAreaComponent
							key={"sight:" + sight}
							initialValue={sight}
							onChange={handleSightChange}
							campaignPath={element.type === ElementType.Campaign ? element.path : element.campaign.path}
						/>
					</div>
				</div>
				<div className="grid items-center justify-center">
					<div className="flex justify-center !text-[--text-faint] mb-1">
						<FontAwesomeIcon icon={faEarListen} title="Hearing" />
					</div>
					<div className="flex justify-center">
						<TextAreaComponent
							key={"hear:" + hear}
							initialValue={hear}
							onChange={handleHearChange}
							campaignPath={element.type === ElementType.Campaign ? element.path : element.campaign.path}
						/>
					</div>
				</div>
				<div className="grid items-center justify-center">
					<div className="flex justify-center !text-[--text-faint] mb-1">
						<FontAwesomeIcon icon={faWind} title="Smell" />
					</div>
					<div className="flex justify-center">
						<TextAreaComponent
							key={"smell:" + smell}
							initialValue={smell}
							onChange={handleSmellChange}
							campaignPath={element.type === ElementType.Campaign ? element.path : element.campaign.path}
						/>
					</div>
				</div>
				<div className="grid items-center justify-center">
					<div className="flex justify-center !text-[--text-faint] mb-1">
						<FontAwesomeIcon icon={faHandPointer} title="Touch" />
					</div>
					<div className="flex justify-center">
						<TextAreaComponent
							key={"touch:" + touch}
							initialValue={touch}
							onChange={handleTouchChange}
							campaignPath={element.type === ElementType.Campaign ? element.path : element.campaign.path}
						/>
					</div>
				</div>
				<div className="grid items-center justify-center">
					<div className="flex justify-center !text-[--text-faint] mb-1">
						<FontAwesomeIcon icon={faTint} title="Taste" />
					</div>
					<div className="flex justify-center">
						<TextAreaComponent
							key={"taste:" + taste}
							initialValue={taste}
							onChange={handleTasteChange}
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
				<h3 className="!m-0 !p-0 !text-xl !font-extralight">{t("attributes.sensoryimprints")}</h3>
			</div>
			<div
				className={`w-full grid grid-cols-${totalSenses} gap-3 items-start opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[100vh] transition-all duration-500 ease-in-out`}
			>
				{sensoryImprint.sight && (
					<div className="grid items-center justify-center">
						<div className="flex justify-center !text-[--text-faint]">
							<FontAwesomeIcon icon={faEye} />
						</div>
						<div className="flex justify-center -ml-8">
							<MarkdownComponent value={sensoryImprint.sight} />
						</div>
					</div>
				)}
				{sensoryImprint.hear && (
					<div className="grid items-center justify-center">
						<div className="flex justify-center !text-[--text-faint]">
							<FontAwesomeIcon icon={faEarListen} />
						</div>
						<div className="flex justify-center -ml-8">
							<MarkdownComponent value={sensoryImprint.hear} />
						</div>
					</div>
				)}
				{sensoryImprint.smell && (
					<div className="grid items-center justify-center">
						<div className="flex justify-center !text-[--text-faint]">
							<FontAwesomeIcon icon={faWind} />
						</div>
						<div className="flex justify-center -ml-8">
							<MarkdownComponent value={sensoryImprint.smell} />
						</div>
					</div>
				)}
				{sensoryImprint.touch && (
					<div className="grid items-center justify-center">
						<div className="flex justify-center !text-[--text-faint]">
							<FontAwesomeIcon icon={faHandPointer} />
						</div>
						<div className="flex justify-center -ml-8">
							<MarkdownComponent value={sensoryImprint.touch} />
						</div>
					</div>
				)}
				{sensoryImprint.taste && (
					<div className="grid items-center justify-center">
						<div className="flex justify-center !text-[--text-faint]">
							<FontAwesomeIcon icon={faTint} />
						</div>
						<div className="flex justify-center -ml-8">
							<MarkdownComponent value={sensoryImprint.taste} />
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
