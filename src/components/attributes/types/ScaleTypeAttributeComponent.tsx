import { RpgManagerInterface } from "@/RpgManagerInterface";
import { AttributeInterface } from "@/data/interfaces/AttributeInterface";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { RpgManagerCodeblockService } from "@/services/RpgManagerCodeblockService";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import AttributeTitleComponent from "../AttributeTitleComponent";

export default function ScaleTypeAttributeComponent({
	element,
	attribute,
	isEditable,
}: {
	element: ElementInterface;
	attribute: AttributeInterface;
	isEditable: boolean;
}): React.ReactElement {
	if (attribute === undefined || !attribute.isSet) return null;

	const [editing, setEditing] = React.useState<boolean>(false);

	const handleEdit = () => {
		setEditing(!editing);
	};

	return (
		<div className="grid grid-cols-1">
			<AttributeTitleComponent attribute={attribute} />
			<div className="col-span-3 pl-0 lg:pl-3">
				{editing ? (
					<EditComponent element={element} attribute={attribute} onSave={handleEdit} />
				) : isEditable ? (
					<ViewComponent attribute={attribute} edit={handleEdit} />
				) : (
					<BrowseComponent attribute={attribute} />
				)}
			</div>
		</div>
	);
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

	const [widthPercentage, setWidthPercentage] = React.useState((attribute.value / 10) * 100);

	React.useEffect(() => {
		setWidthPercentage((attribute.value / 10) * 100);
	}, [attribute.value]);

	const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const newWidthPercentage = (x / rect.width) * 100;
		setWidthPercentage(newWidthPercentage);
	};

	const handleDelete = () => {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
		codeblockService.updateCodeblockData(attribute.id, undefined).then(() => {
			onSave();
		});
	};

	const handleSave = () => {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

		const newValue = (widthPercentage / 100) * 10;

		codeblockService.updateCodeblockData(attribute.id, Math.round(newValue)).then(() => {
			onSave();
		});
	};

	return (
		<>
			<div className="w-full mt-3 cursor-pointer">
				<div
					className="relative mr-3 h-2 bg-[--background-primary-alt] rounded-full"
					onMouseMove={handleMouseOver}
					onClick={handleSave}
				>
					<div style={{ width: `${widthPercentage}%` }} className="absolute h-2 bg-[--text-accent] rounded-full" />
				</div>
				<div className="text-xs text-[--text-faint] text-center">{Math.round((widthPercentage / 100) * 10)}</div>
			</div>
			<div className={`w-full flex justify-end mt-3`}>
				<button className="rpgm-danger" onClick={handleDelete}>
					{t("buttons.delete")}
				</button>
				<button className="rpgm-secondary" onClick={onSave}>
					{t("buttons.cancel")}
				</button>
				<button className="rpgm-primary ml-3" onClick={handleSave}>
					{t("buttons.save")}
				</button>
			</div>
		</>
	);
}

function ViewComponent({ attribute, edit }: { attribute: AttributeInterface; edit: () => void }): React.ReactElement {
	return (
		<div onClick={edit} className="cursor-pointer">
			<BrowseComponent attribute={attribute} />
		</div>
	);
}

function BrowseComponent({ attribute }: { attribute: AttributeInterface }): React.ReactElement {
	const widthPercentage = (attribute.value / 10) * 100;

	return (
		<div className="w-full mt-3">
			<div className="relative mr-3 h-2 bg-[--background-primary-alt] rounded-full">
				<div style={{ width: `${widthPercentage}%` }} className="absolute h-2 bg-[--text-accent] rounded-full" />
			</div>
			<div className="text-xs text-[--text-faint] text-center">{attribute.value}</div>
		</div>
	);
}
