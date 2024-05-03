import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import RelationshipListComponent from "./RelationshipListComponent";

export default function RelationshipsComponent({
  element,
}: {
  element: ElementInterface;
}): React.ReactElement {
  if (element.relationships.length === 0) return null;

  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("relationships.relationship", { count: 2 })}</h2>

      <RelationshipListComponent
        key={element.type + "parent"}
        element={element}
        type={element.type}
        parent={true}
        children={false}
      />
      <RelationshipListComponent
        key={element.type + "children"}
        element={element}
        type={element.type}
        parent={false}
        children={true}
      />

      {Object.values(ElementType).map((type: ElementType) => {
        if (
          type === ElementType.Campaign ||
          type === ElementType.Session ||
          type === ElementType.Scene
        )
          return null;
        return (
          <RelationshipListComponent
            key={type}
            element={element}
            type={type}
            parent={false}
            children={false}
          />
        );
      })}
    </div>
  );
}
