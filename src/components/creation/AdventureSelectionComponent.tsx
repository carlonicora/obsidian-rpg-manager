import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementInterface } from "src/data/interfaces/ElementInterface";

export default function AdventureSelectionComponent({
	adventures,
	setAdventurePath,
}: {
	adventures: ElementInterface[];
	setAdventurePath: (path: string) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div>
			<div>{t("adventure", { count: 1 })}</div>
			<div>
				<select onChange={(e) => setAdventurePath(e.target.value)}>
					{adventures.length > 1 && <option value=""></option>}
					{adventures.map((adventure: ElementInterface) => (
						<option key={adventure.path} value={adventure.path}>
							{adventure.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
