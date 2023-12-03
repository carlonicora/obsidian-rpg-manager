import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";

export default function ParentAttributeComponent({
	element,
	isEditable,
}: {
	element: ElementInterface;
	isEditable: boolean;
}): React.ReactElement {
	const { t } = useTranslation();

	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const possibleParents: ElementInterface[] = api.get(
		undefined,
		element.campaign,
		element.parent.type
	) as ElementInterface[];

	if (possibleParents === undefined || possibleParents.length === 0) return null;

	possibleParents.sort((a, b) => b.positionInParent - a.positionInParent);

	const updateParent = (newId: string) => {
		const newParentChildren: ElementInterface[] = api.get(
			undefined,
			element.campaign,
			element.type,
			possibleParents.find((parentElement: ElementInterface) => parentElement.id === newId)
		) as ElementInterface[];

		const newPositionInParent: number =
			newParentChildren.length === 0
				? 0
				: Math.max(...newParentChildren.map((element: ElementInterface) => element.positionInParent));

		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
		codeblockService.updateCodeblockIdList([
			{ name: "parent", value: newId },
			{ name: "positionInParent", value: newPositionInParent + 1 },
		]);
	};

	return (
		<>
			<div className="!font-bold">{t("parents.parent", { context: element.parent.type })}</div>
			<div>
				{isEditable && (
					<select
						onChange={(e) => updateParent(e.target.value)}
						className="min-w-full pl-3"
						defaultValue={element.parent.id}
					>
						{possibleParents.map((parent) => (
							<option key={parent.id} value={parent.id}>
								{parent.name}
							</option>
						))}
					</select>
				)}
				<div className="!ml-3 text-sm !mt-1">
					<a
						href={element.parent.id}
						className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
					>
						{element.parent.name}
					</a>
				</div>
			</div>
		</>
	);
}
