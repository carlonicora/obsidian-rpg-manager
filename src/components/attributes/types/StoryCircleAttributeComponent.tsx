import * as React from "react";
import { useTranslation } from "react-i18next";
import { StoryCircleStage } from "src/data/enums/StoryCircleStage";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import StoryCircleStageComponent from "./StoryCircleStageComponent";

export default function StoryCircleAttributeComponent({
  element,
  attribute,
  isEditable,
}: {
  element: ElementInterface;
  attribute: AttributeInterface;
  isEditable: boolean;
}): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div className="rounded-md border border-[--background-modifier-border] overflow-hidden bg-[--background-primary] mb-3 p-3">
      <h2 className="!text-2xl !font-bold border-b border-b-[--background-modifier-border]">
        {t("attributes.storycircle")}
      </h2>
      <div
        className={`gap-3 grid grid-cols-1 ${
          isEditable && "sm:grid-cols-1 lg:grid-cols-7"
        }`}
      >
        {Object.entries(StoryCircleStage)
          .filter(([key]) => isNaN(Number(key)))
          .map(([key, index]) => {
            return (
              <StoryCircleStageComponent
                key={key}
                element={element}
                attribute={attribute}
                stage={key}
                isEditable={isEditable}
              />
            );
          })}
      </div>
    </div>
  );
}
