import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";
import { SearchableElementInterface } from "src/data/interfaces/SearchableElementInterface";

export default function FuzzySearchResult({
	searchableElement,
}: {
	searchableElement: SearchableElementInterface;
}): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div className="flex items-center">
			<div className="w-[40px] h-[40px] flex items-center justify-center overflow-hidden">
				{searchableElement.image && (
					<img
						src={searchableElement.image.src}
						alt={searchableElement.image.caption}
						className="max-w-[40px] max-h-[40px]"
					/>
				)}
			</div>
			<div className="ml-2">
				<div>{searchableElement.alias ?? searchableElement.name}</div>
				<small>
					{searchableElement.type ? t("elements." + searchableElement.type, { count: 1 }) : ElementType.PlayerCharacter}
				</small>
			</div>
		</div>
	);
}
