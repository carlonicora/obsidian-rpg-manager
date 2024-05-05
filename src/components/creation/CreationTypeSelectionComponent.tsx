import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";

export default function CreationTypeSelectionComponent({
  setType,
}: {
  setType: (type: ElementType) => void;
}): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="!text-xl !font-extralight">
        {t("create.new", { context: "element" })}
      </h3>
      <div className="!mt-3 !mb-3">
        {t("create.select", { context: "type" })}
      </div>
      <div className="">
        {Object.keys(ElementType).map((type: ElementType, index: number) => {
          return (
            <div
              key={index}
              className="flex items-center rounded-md border border-[--background-modifier-border] m-4 p-4 hover:bg-[--background-primary-alt] bg-transparent cursor-pointer"
              onClick={() => setType(type)}
            >
              <div>
                <h4>{type as ElementType}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
