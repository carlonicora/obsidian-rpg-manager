import * as React from "react";
import { useTranslation } from "react-i18next";

export default function ChildDefaultHeadersComponent({
  isInPopover,
}: {
  isInPopover: boolean;
}): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row w-full justify-start border-b border-b-[--background-modifier-border] pb-1">
      {!isInPopover && (
        <div className="col-span-1 max-w-[12px] w-[12px] mr-1"></div>
      )}
      <div className="col-span-1 max-w-[20px] w-[20px] font-bold">#</div>
      <div className="w-full font-bold">{t("name")}</div>
    </div>
  );
}
