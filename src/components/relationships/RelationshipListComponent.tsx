import { RelationshipType } from "@/data/enums/RelationshipType";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";
import RelationshipComponent from "./RelationshipComponent";

export default function RelationshipListComponent({
  element,
  type,
  parent,
  children,
}: {
  element: ElementInterface;
  type: ElementType;
  parent: boolean;
  children: boolean;
}): React.ReactElement {
  const { t } = useTranslation();

  let relationships: RelationshipInterface[] = element.relationships.filter(
    (relationship: RelationshipInterface) =>
      relationship.component !== undefined &&
      relationship.component.type === type &&
      relationship.component.path !== element.path,
  );

  if (relationships === undefined || relationships.length === 0) return null;

  let title = t("elements." + type, { count: 2 });
  if (parent) {
    relationships = relationships.filter(
      (relationship: RelationshipInterface) =>
        relationship.type === RelationshipType.Parent ||
        (relationship.type === RelationshipType.Reversed &&
          relationship.component.relationships.find(
            (rel: RelationshipInterface) =>
              rel.component !== undefined &&
              rel.component.path === element.path &&
              rel.type === RelationshipType.Child,
          )),
    );
    title = t("elements." + element.type, { context: "inside" });
  } else if (children) {
    relationships = relationships.filter(
      (relationship: RelationshipInterface) =>
        relationship.type === RelationshipType.Child ||
        (relationship.type === RelationshipType.Reversed &&
          relationship.component.relationships.find(
            (rel: RelationshipInterface) =>
              rel.component !== undefined &&
              rel.component.path === element.path &&
              rel.type === RelationshipType.Parent,
          )),
    );
    title = t("elements." + element.type, { context: "contains" });
  } else {
    relationships = relationships.filter(
      (relationship: RelationshipInterface) =>
        relationship.type !== RelationshipType.Parent &&
        relationship.type !== RelationshipType.Child,
    );
  }

  if (relationships === undefined || relationships.length === 0) return null;

  return (
    <div>
      <h3 className="!text-xl !font-extralight">{title}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">
        {relationships.map((relationship: RelationshipInterface) => (
          <RelationshipComponent
            key={relationship.component.file.path}
            element={element}
            relationship={relationship}
          />
        ))}
      </div>
    </div>
  );
}
