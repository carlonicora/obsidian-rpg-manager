import * as React from "react";
import { useTranslation } from "react-i18next";

export default function ChildSceneHeadersComponent({ isInPopover }: { isInPopover: boolean }): React.ReactElement {
	const { t } = useTranslation();
	return (
		<div className="flex w-full border-b border-b-[--background-modifier-border] pb-1  text-sm">
			<div className="flex">
				{!isInPopover && <div className="col-span-1 max-w-[12px] w-[12px] mr-1"></div>}
				<div className="col-span-1 max-w-[20px] w-[20px] font-bold">#</div>
			</div>
			{isInPopover ? (
				<div className="w-full">
					<div className="font-bold">{t("name")}</div>
				</div>
			) : (
				<div className="grid grid-cols-12 gap-2 w-full">
					<div className="font-bold col-span-2">{t("name")}</div>
					<div className="font-bold">{t("attributes.stage")}</div>
					<div className="font-bold col-span-5">{t("attributes.description")}</div>
					<div className="font-bold col-span-2">{t("attributes.scenetype")}</div>
					<div className="font-bold">{t("attributes.externalactions")}</div>
					<div></div>
				</div>
			)}
		</div>
	);
}
