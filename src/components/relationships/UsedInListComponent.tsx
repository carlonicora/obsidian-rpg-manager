import { RelationshipType } from "@/data/enums/RelationshipType";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";

export default function UsedInListComponent({
  element,
}: {
  element: ElementInterface;
}): React.ReactElement {
  const { t } = useTranslation();

  const relationships: RelationshipInterface[] = element.relationships.filter(
    (relationship: RelationshipInterface) =>
      relationship.component !== undefined &&
      relationship.type !== RelationshipType.Parent &&
      relationship.type !== RelationshipType.Child &&
      (relationship.component.type === ElementType.Chapter ||
        relationship.component.type === ElementType.Session),
  );

  if (relationships === undefined || relationships.length === 0) return null;

  relationships.sort((a, b) => a.type.localeCompare(b.type));

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col">
        {relationships.map((relationship: RelationshipInterface) => (
          <div key={relationship.component.id} className="flex flex-row">
            <span className="!text-[--text-muted] !font-light mr-3">
              {t("elements." + relationship.component.type, { count: 2 })}
            </span>
            <a
              href={relationship.component.file.path}
              className="internal-link !no-underline !text-[--text-normal] hover:!text-[--text-accent]"
            >
              {relationship.component.file.basename}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
