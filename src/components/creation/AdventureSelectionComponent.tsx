import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementInterface } from "src/data/interfaces/ElementInterface";

export default function AdventureSelectionComponent({
	adventures,
	setAdventureId,
}: {
	adventures: ElementInterface[];
	setAdventureId: (id: string) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div className="max-w-md mb-3">
			<div>{t("adventure", { count: 1 })}</div>
			<div>
				<select onChange={(e) => setAdventureId(e.target.value)} className="w-full">
					{adventures.length > 1 && <option value=""></option>}
					{adventures.map((adventure: ElementInterface) => (
						<option key={adventure.id} value={adventure.id}>
							{adventure.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
