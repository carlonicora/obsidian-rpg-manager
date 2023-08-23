import * as React from "react";
import { useTranslation } from "react-i18next";

export default function FuzzyNewElementComponent({ name }: { name: string }) {
	const { t } = useTranslation();

	return (
		<div className="flex items-center">
			<div className="w-full">{name}</div>
			<div className="w-64 flex items-center justify-end">
				<small>{t("search.entertocreate")}</small>
			</div>
		</div>
	);
}
