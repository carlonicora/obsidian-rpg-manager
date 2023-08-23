import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import WeaknessesComponent from "src/components/editors/WeaknessesComponent";
import { WeaknessType } from "src/data/enums/WeaknessType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";

export default function WeaknessesAttributeComponent({
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

	if (!attribute.isSet) return null;

	const [editing, setEditing] = React.useState<boolean>(false);
	const [value, setValue] = React.useState<number>(attribute.value);

	const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

	function reset(): void {
		setValue(attribute.value);
		setEditing(false);
	}

	const removeAttribute = (attribute: AttributeInterface) => () => {
		codeblockService.updateCodeblockData(attribute.id, undefined);
	};

	const saveAttribute = (weakness: number) => {
		setValue(value ^ weakness);
	};

	const updateAttribute = () => {
		codeblockService.updateCodeblockData(attribute.id, value);
		setEditing(false);
	};

	let content;

	if (editing) {
		content = (
			<>
				<div>
					<WeaknessesComponent initialValue={value} propagateValue={saveAttribute} />
				</div>

				<div className="flex justify-end mt-3">
					<button className="rpgm-danger" onClick={removeAttribute(attribute)}>
						{t("buttons.delete")}
					</button>
					<button className="rpgm-secondary" onClick={reset}>
						{t("buttons.cancel")}
					</button>
					<button className="rpgm-primary" onClick={updateAttribute}>
						{t("buttons.save")}
					</button>
				</div>
			</>
		);
	} else if (isEditable) {
		content = (
			<div
				onClick={() => setEditing(!editing)}
				className="flex flex-wrap border border-[--background-modifier-border] hover:border-[--background-modifier-border-hover] rounded-md p-3 cursor-pointer"
			>
				{Object.entries(WeaknessType)
					.filter(([key]) => isNaN(Number(key)))
					.map(([key, currentWeaknesses]) => {
						const weaknessesValue = currentWeaknesses as unknown as WeaknessType;
						if ((attribute.value & weaknessesValue) !== weaknessesValue) return null;

						return (
							<div key={key} className="pl-2 pr-2">
								{key}
							</div>
						);
					})}
			</div>
		);
	} else {
		content = (
			<div className="flex flex-wrap p-3">
				{Object.entries(WeaknessType)
					.filter(([key]) => isNaN(Number(key)))
					.map(([key, currentWeaknesses]) => {
						const weaknessesValue = currentWeaknesses as unknown as WeaknessType;
						if ((attribute.value & weaknessesValue) !== weaknessesValue) return null;

						return (
							<div key={key} className="pl-2 pr-2">
								{key}
							</div>
						);
					})}
			</div>
		);
	}

	return (
		<>
			<div className="!font-bold">{t("attributes." + attribute.id)}</div>
			{content}
		</>
	);
}
