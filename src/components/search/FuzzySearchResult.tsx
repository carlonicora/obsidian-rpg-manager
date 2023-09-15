import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";
import { SearchableElementInterface } from "src/data/interfaces/SearchableElementInterface";

export default function FuzzySearchResult({
	searchableElement,
	hasCampaign,
}: {
	searchableElement: SearchableElementInterface;
	hasCampaign: boolean;
}): React.ReactElement {
	const { t } = useTranslation();

	let small = searchableElement.type
		? t("elements." + searchableElement.type, { count: 1 })
		: ElementType.PlayerCharacter;

	if (!hasCampaign && searchableElement.type !== ElementType.Campaign && searchableElement.campaignName !== undefined) {
		small += " (" + (searchableElement.campaignName ?? "") + ")";
	} else if (
		hasCampaign &&
		searchableElement.type !== ElementType.Campaign &&
		searchableElement.campaignName === undefined
	) {
		small += " (" + t("global") + ")";
	}

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
				<small>{small}</small>
			</div>
		</div>
	);
}
