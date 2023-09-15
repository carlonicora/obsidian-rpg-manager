import MarkdownEditorComponent from "@/components/editors/MarkdownEditorComponent";
import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { ElementType } from "src/data/enums/ElementType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import AttributeTitleComponent from "../AttributeTitleComponent";

export default function LongTextAttributeComponent({
	element,
	attribute,
	isEditable,
}: {
	element: ElementInterface;
	attribute: AttributeInterface;
	isEditable: boolean;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	if (!attribute.isSet) return null;

	const [value, setValue] = React.useState<string>(attribute.value ?? "");
	const [editing, setEditing] = React.useState<boolean>(false);

	const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

	function reset(): void {
		setValue(attribute.value ?? "");
		setEditing(false);
	}

	function removeAttribute(): void {
		codeblockService.updateCodeblockData(attribute.id, undefined).then(() => {
			setEditing(false);
		});
	}

	function saveAttribute(newValue: string | undefined): void {
		if (newValue === undefined) {
			setEditing(false);
			return;
		}

		codeblockService.updateCodeblockData(attribute.id, newValue).then(() => {
			setEditing(false);
		});
	}

	let content;

	if (editing) {
		content = (
			<div className="grid grid-cols-1">
				<div>
					<MarkdownEditorComponent
						initialValue={attribute.value}
						campaignPath={element.type === ElementType.Campaign ? element.path : element.campaignPath}
						onChange={setValue}
						className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md"
					/>
				</div>
				<div className="flex justify-end mt-3">
					<button className="rpgm-danger" onClick={removeAttribute}>
						{t("buttons.delete")}
					</button>
					<button className="rpgm-secondary" onClick={reset}>
						{t("buttons.cancel")}
					</button>
					<button className="rpgm-primary" onClick={() => saveAttribute(value)}>
						{t("buttons.save")}
					</button>
				</div>
			</div>
		);
	} else if (isEditable) {
		content = (
			<div
				onClick={() => setEditing(!editing)}
				className="border border-[--background-modifier-border] hover:border-[--background-modifier-border-hover] rounded-md p-3 cursor-text"
			>
				<MarkdownComponent value={attribute.value} />
			</div>
		);
	} else {
		content = (
			<div>
				<MarkdownComponent value={attribute.value} />
			</div>
		);
	}

	return (
		<>
			<AttributeTitleComponent attribute={attribute} />
			{content}
		</>
	);
}
