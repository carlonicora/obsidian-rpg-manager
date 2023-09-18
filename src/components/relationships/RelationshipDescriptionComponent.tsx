import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementType } from "src/data/enums/ElementType";
import { RelationshipType } from "src/data/enums/RelationshipType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import MarkdownEditorComponent from "../editors/MarkdownEditorComponent";
import MarkdownComponent from "../markdowns/MarkdownComponent";

export default function RelationshipDescriptionComponent({
	element,
	relationship,
}: {
	element: ElementInterface;
	relationship: RelationshipInterface;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const [editing, setEditing] = React.useState<boolean>(false);
	const [value, setValue] = React.useState<string>(relationship.description || "");
	const [type, setType] = React.useState<RelationshipType>(
		relationship.type === RelationshipType.Reversed ? RelationshipType.Bidirectional : relationship.type
	);

	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

	const resizeTextArea = () => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "auto";
			textAreaRef.current.style.minHeight = "2em";
			textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 10 + "px";
		}
	};

	React.useEffect(() => {
		if (editing) {
			resizeTextArea();
			textAreaRef.current?.focus();
		}
	}, [editing]);

	function updateRelationship(value: string): void {
		setValue(value);
		resizeTextArea();
	}

	const updateRelationshipType = (type: RelationshipType) => {
		setType(type);
	};

	function deleteRelationship() {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
		codeblockService.removeRelationship(element, relationship.component);
	}

	const saveRelationship = () => {
		let requiresUpdate = false;
		if (relationship.type !== type) {
			relationship.type = type;
			requiresUpdate = true;
		}
		if (relationship.description !== value) {
			if (relationship.isInContent) {
				relationship.isAlsoInContent = true;
				relationship.isInContent = false;
			}
			relationship.description = value;
			requiresUpdate = true;
		}

		if (requiresUpdate) {
			const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
			codeblockService.updateRelationship(relationship);
		}
	};

	return (
		<>
			{editing ? (
				<div className="w-full text-sm group">
					<div className="font-bold">{t("relationships.relationshiptype")}</div>
					<div>
						<select
							defaultValue={relationship.type}
							onChange={(e) => updateRelationshipType(e.target.value as RelationshipType)}
							className="selectBorder w-full 
							!border !border-transparent group-hover:!border-[--background-modifier-border] focus:!border-[--background-modifier-border]
							h-7 pl-1 
							focus:!shadow-none !shadow-none
							bg-transparent group-hover:bg-[--background-modifier-form-field]
							"
						>
							{Object.entries(RelationshipType)
								.filter(
									([key]) =>
										!(RelationshipType[key as keyof typeof RelationshipType] === RelationshipType.Reversed) &&
										!(
											element.type !== relationship.component.type &&
											(RelationshipType[key as keyof typeof RelationshipType] === RelationshipType.Parent ||
												RelationshipType[key as keyof typeof RelationshipType] === RelationshipType.Child)
										)
								)
								.map(([key]) => (
									<option key={key} value={RelationshipType[key as keyof typeof RelationshipType]}>
										{key}
									</option>
								))}
						</select>
					</div>
					<div>
						<MarkdownEditorComponent
							initialValue={value}
							campaignPath={element.type === ElementType.Campaign ? element.path : element.campaignPath}
							onChange={updateRelationship}
							className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] rounded-md"
						/>
					</div>
					<div>
						{relationship.type !== RelationshipType.Reversed &&
							!relationship.isInContent &&
							!relationship.isAlsoInContent && (
								<button
									className="rpgm-danger !ml-0 w-full"
									onClick={() => {
										deleteRelationship();
										setEditing(!editing);
									}}
								>
									{t("buttons.delete")}
								</button>
							)}
						<button
							className="rpgm-secondary w-full !ml-0"
							onClick={() => {
								setEditing(!editing);
							}}
						>
							{t("buttons.cancel")}
						</button>

						<button
							className="rpgm-primary w-full !ml-0"
							onClick={() => {
								saveRelationship();
								setEditing(!editing);
							}}
						>
							{t("buttons.save")}
						</button>
					</div>
				</div>
			) : (
				<div className="w-full text-sm group " onClick={() => setEditing(!editing)}>
					<div className="font-bold">{t("relationships.relationshiptype")}</div>
					<div className="mb-3 border border-transparent group-hover:border-[--background-modifier-border-hover] rounded-md min-h-[2em] cursor-pointer w-full">
						{t("relationships.relationshiptype", { context: relationship.type })}
					</div>
					<div className="border border-transparent group-hover:border-[--background-modifier-border-hover] rounded-md min-h-[2em] cursor-text w-full">
						<MarkdownComponent value={value} />
					</div>
				</div>
			)}
		</>
	);
}
