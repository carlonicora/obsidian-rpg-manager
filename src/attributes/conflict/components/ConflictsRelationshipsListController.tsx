import ContainerComponent from "@/components/groups/ContainerComponent";
import MarkdownComponent from "@/components/markdowns/MarkdownComponent";
import { AttributeType } from "@/data/enums/AttributeType";
import { ElementType } from "@/data/enums/ElementType";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { RelationshipInterface } from "@/data/interfaces/RelationshipInterface";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function ConflictsRelationshipsListController({
  element,
}: {
  element: ElementInterface;
}): React.ReactElement {
  const relationships = element.relationships.filter(
    (relationship: RelationshipInterface) =>
      relationship.component !== undefined &&
      relationship.component.type === ElementType.Conflict,
  );
  if (relationships.length === 0) return null;
  const { t } = useTranslation();

  return (
    <ContainerComponent
      title={t("attributes.conflict", { count: relationships.length })}
    >
      {relationships.map((relationship: RelationshipInterface) => (
        <div className="flex flex-col w-full mb-4" key={relationship.id}>
          <a
            href={relationship.component.file.path}
            className="flex w-full text-xl font-light text-[--text-accent] internal-link !no-underline"
          >
            {relationship.component.name}
          </a>
          <div className="flex flex-row justify-start">
            <div className="flex justify-end w-28 mr-3 font-semibold text-sm">
              Who
            </div>
            <div className="w-full text-sm">
              <MarkdownComponent
                value={
                  relationship.component?.attribute(AttributeType.Conflict)
                    ?.value?.who
                }
              />
            </div>
          </div>
          <div className="flex flex-row justify-start">
            <div className="flex justify-end w-28 mr-3 font-semibold text-sm">
              Wants
            </div>
            <div className="w-full text-sm">
              <MarkdownComponent
                value={
                  relationship.component?.attribute(AttributeType.Conflict)
                    ?.value?.wants
                }
              />
            </div>
          </div>
          <div className="flex flex-row justify-start">
            <div className="flex justify-end w-28 mr-3 font-semibold text-sm">
              But
            </div>
            <div className="w-full text-sm">
              <MarkdownComponent
                value={
                  relationship.component?.attribute(AttributeType.Conflict)
                    ?.value?.but
                }
              />
            </div>
          </div>
          <div className="flex flex-row justify-start">
            <div className="flex justify-end w-28 mr-3 font-semibold text-sm">
              Therefore
            </div>
            <div className="w-full text-sm">
              <MarkdownComponent
                value={
                  relationship.component?.attribute(AttributeType.Conflict)
                    ?.value?.therefore
                }
              />
            </div>
          </div>
        </div>
      ))}
    </ContainerComponent>
  );
}
