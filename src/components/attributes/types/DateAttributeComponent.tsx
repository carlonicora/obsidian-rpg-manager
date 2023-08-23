import { DateTime } from "luxon";
import * as React from "react";
import Flatpickr from "react-flatpickr";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import AttributeTitleComponent from "../AttributeTitleComponent";

export default function DateAttributeComponent({
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

	const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

	function removeAttribute(): void {
		codeblockService.updateCodeblockData(attribute.id, undefined);
	}

	const saveAttribute = (newValue: string | undefined) => {
		if (newValue === undefined) return;

		codeblockService.updateCodeblockData(attribute.id, newValue);
	};

	let content;

	if (isEditable) {
		content = (
			<div className="grid grid-cols-1 lg:grid-cols-2 group">
				<div>
					<Flatpickr
						value={attribute.value}
						options={{ dateFormat: "Y-m-d", altInput: true, altFormat: "D, M j, Y" }}
						onChange={(selectedDates: Date[], currentDate: string) => {
							saveAttribute(currentDate);
						}}
					/>
				</div>
				<div className="flex justify-end !ml-3">
					<button className="rpgm-danger opacity-0 group-hover:opacity-100" onClick={removeAttribute}>
						{t("buttons.delete")}
					</button>
				</div>
			</div>
		);
	} else {
		content = (
			<div className="flex flex-wrap p-3">
				{attribute.value ? DateTime.fromISO(attribute.value).toJSDate().toDateString() : ""}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4">
			<AttributeTitleComponent attribute={attribute} />
			<div className="col-span-3 pl-0 lg:pl-3">{content}</div>
		</div>
	);
}
