import * as React from "react";
import { useTranslation } from "react-i18next";

export default function ChildDefaultHeadersComponent({ isInPopover }: { isInPopover: boolean }): React.ReactElement {
	const { t } = useTranslation();
	return (
		<div className="flex w-full border-b border-b-[--background-modifier-border] pb-1 mb-1">
			<div className="flex">
				{!isInPopover && <div className="col-span-1 max-w-[12px] w-[12px] mr-1"></div>}
				<div className="col-span-1 max-w-[20px] w-[20px] font-bold">#</div>
			</div>
			<div className="grid grid-cols-1 gap-2 w-full">
				<div className="font-bold">{t("name")}</div>
			</div>
		</div>
	);
}
