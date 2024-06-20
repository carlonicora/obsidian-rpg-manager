import ContainerComponent from "@/components/groups/ContainerComponent";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import ConflictElementComponent from "./ConflictElementComponent";

export default function ConflictComponent({
  element,
  attribute,
  isEditable,
}: {
  element: ElementInterface;
  attribute: AttributeInterface;
  isEditable: boolean;
}): React.ReactElement {
  if (!attribute.isSet) return null;
  const { t } = useTranslation();

  return (
    <ContainerComponent title={t("attributes.conflict", { count: 1 })}>
      {["who", "wants", "but", "therefore"].map((key: string) => {
        return (
          <ConflictElementComponent
            key={key}
            element={element}
            attribute={attribute}
            stage={key}
            isEditable={isEditable}
          />
        );
      })}
    </ContainerComponent>
  );
}
