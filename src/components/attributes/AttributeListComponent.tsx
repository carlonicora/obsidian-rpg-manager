import AbtStageComponent from "@/attributes/abtstage/components/AbtStageComponent";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { AttributeComponentType } from "src/data/enums/AttributeComponentType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import ArcComponent from "../../attributes/arc/components/ArcComponent";
import BooleanComponent from "../../attributes/boolean/components/BooleanComponent";
import DateComponent from "../../attributes/date/components/DateComponent";
import LinkComponent from "../../attributes/link/components/LinkComponent";
import LongTextComponent from "../../attributes/longtext/components/LongTextComponent";
import NumberComponent from "../../attributes/number/components/NumberComponent";
import PronounComponent from "../../attributes/pronoun/components/PronounComponent";
import ContainerComponent from "../groups/ContainerComponent";
import DefaultAttributeTypeComponent from "./types/DefaultAttributeTypeComponent";
import ScaleTypeAttributeComponent from "./types/ScaleTypeAttributeComponent";
import SceneTypeAttributeComponent from "./types/SceneTypeAttributeComponent";
import SelectAttributeTypeComponent from "./types/SelectAttributeTypeComponent";
import StoryCircleStageAttributeComponent from "./types/StoryCircleStageAttributeComponent";
import StrengthsAttributeComponent from "./types/StrengthsAttributeComponent";
import WeaknessesAttributeComponent from "./types/WeaknessesAttributeComponent";

export default function AttributeListComponent({
  element,
  isEditable,
}: {
  element: ElementInterface;
  isEditable: boolean;
}): React.ReactElement {
  if (
    element.attributes.filter(
      (attribute: AttributeInterface) =>
        attribute.type !== AttributeComponentType.Description &&
        attribute.type !== AttributeComponentType.StoryCircle &&
        attribute.type !== AttributeComponentType.Conflict &&
        attribute.type !== AttributeComponentType.Kishotenketsu &&
        attribute.type !== AttributeComponentType.Duration &&
        attribute.type !== AttributeComponentType.Parent &&
        attribute.type !== AttributeComponentType.SensoryImprint &&
        attribute.type !== AttributeComponentType.Stats &&
        attribute.isSet,
    ).length === 0
  )
    return null;

  const { t } = useTranslation();

  return (
    <ContainerComponent title={t("attributes.attribute", { count: 2 })}>
      {element.attributes.map(
        (attribute: AttributeInterface, index: number) => {
          if (
            attribute.type === AttributeComponentType.Description ||
            attribute.type === AttributeComponentType.StoryCircle ||
            attribute.type === AttributeComponentType.Conflict ||
            attribute.type === AttributeComponentType.Kishotenketsu ||
            attribute.type === AttributeComponentType.Duration ||
            attribute.type === AttributeComponentType.Parent ||
            attribute.type === AttributeComponentType.SensoryImprint ||
            attribute.type === AttributeComponentType.Stats ||
            !attribute.isSet
          )
            return null;

          let attributeComponent;

          switch (attribute.type) {
            case AttributeComponentType.Pronoun:
              attributeComponent = (
                <PronounComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.Scale:
              attributeComponent = (
                <ScaleTypeAttributeComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.SceneType:
              attributeComponent = (
                <SceneTypeAttributeComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.Arc:
              attributeComponent = (
                <ArcComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.Date:
              attributeComponent = (
                <DateComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.Strengths:
              attributeComponent = (
                <StrengthsAttributeComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.Weaknesses:
              attributeComponent = (
                <WeaknessesAttributeComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.LongText:
              attributeComponent = (
                <LongTextComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.StoryCircleStage:
              attributeComponent = (
                <StoryCircleStageAttributeComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.AbtStage:
              attributeComponent = (
                <AbtStageComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.Boolean:
              attributeComponent = (
                <BooleanComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.Number:
              attributeComponent = (
                <NumberComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.Link:
              attributeComponent = (
                <LinkComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.Select:
              attributeComponent = (
                <SelectAttributeTypeComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
              break;
            case AttributeComponentType.Text:
            default:
              attributeComponent = (
                <DefaultAttributeTypeComponent
                  element={element}
                  attribute={attribute}
                  isEditable={isEditable}
                />
              );
          }

          if (attributeComponent === undefined) return null;

          return (
            <div className="!mb-6" key={index}>
              {attributeComponent}
            </div>
          );
        },
      )}
    </ContainerComponent>
  );
}
