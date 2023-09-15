import * as React from "react";
import { useTranslation } from "react-i18next";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";

export default function AttributeTitleComponent({ attribute }: { attribute: AttributeInterface }): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div className="!font-bold">
			{attribute.isCustom === true
				? attribute.customName ?? attribute.id.substring(1)
				: t("attributes." + attribute.id)}
		</div>
	);
}
