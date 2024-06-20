import { RelationshipInterface } from "@/data/interfaces/RelationshipInterface";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import ContainerComponent from "../groups/ContainerComponent";
import UsedInListComponent from "./UsedInListComponent";

export default function UsedInListContainerComponent({
  element,
}: {
  element: ElementInterface;
}): React.ReactElement {
  if (
    element.relationships.filter(
      (relationship: RelationshipInterface) =>
        relationship.component !== undefined &&
        (relationship.component.type === ElementType.Chapter ||
          relationship.component.type === ElementType.Session),
    ).length === 0
  )
    return null;

  const { t } = useTranslation();

  return (
    <ContainerComponent title={t("relationships.relationship", { count: 2 })}>
      <UsedInListComponent key={element.type + "parent"} element={element} />
    </ContainerComponent>
  );
}
