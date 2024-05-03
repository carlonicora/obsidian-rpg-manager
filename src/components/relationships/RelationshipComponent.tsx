import { ElementType } from "@/data/enums/ElementType";
import { useApp } from "@/hooks/useApp";
import { App, TFile } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { RelationshipType } from "src/data/enums/RelationshipType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import RelationshipDescriptionComponent from "./RelationshipDescriptionComponent";

export default function RelationshipComponent({
  element,
  relationship,
}: {
  element: ElementInterface;
  relationship: RelationshipInterface;
}): React.ReactElement {
  const { t } = useTranslation();
  const api: RpgManagerInterface = useApi();
  const app: App = useApp();

  const removeRelationship = () => {
    let file: TFile;
    let relatedElementToRemove: ElementInterface;
    let currentElement: ElementInterface;

    if (relationship.type === RelationshipType.Reversed) {
      file = relationship.component.file;
      currentElement = relationship.component;
      relatedElementToRemove = element;
    } else {
      file = element.file;
      currentElement = element;
      relatedElementToRemove = relationship.component;
    }

    const codeblockService = new RpgManagerCodeblockService(app, api, file);
    codeblockService.removeRelationship(currentElement, relatedElementToRemove);
  };

  let campaign = undefined;

  if (element.type !== ElementType.Campaign && element.campaign === undefined)
    campaign = relationship.component?.campaign?.path;

  let isGeneric = false;
  if (
    relationship.component.type !== ElementType.Campaign &&
    !relationship.component.campaign
  )
    isGeneric = true;

  return (
    <div className="border border-[--background-modifier-border] rounded-lg flex flex-col">
      {relationship.component.images.length > 0 && (
        <div className="flex justify-center relative">
          <div className="w-full relative pb-[100%]">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-tl-lg rounded-tr-lg">
              <a
                href={relationship.component.file.path}
                className="w-full h-full internal-link flex items-center justify-center"
              >
                <img
                  src={relationship.component.images[0].src}
                  alt={relationship.component.images[0].caption}
                  className="min-w-full min-h-full object-cover !cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center p-2">
        <a
          href={relationship.component.file.path}
          className="internal-link !no-underline !text-[--text-normal]"
        >
          <h4 className="!font-extralight !m-0 !text-base">
            {relationship.component.file.basename}
          </h4>
        </a>
      </div>

      {campaign !== undefined && (
        <div className="flex justify-center -mt-2 mb-2">
          <a
            href={campaign}
            className="internal-link !no-underline !text-[--text-muted] text-sm mt-0"
          >
            {relationship.component.campaign?.name}
          </a>
        </div>
      )}

      {isGeneric && (
        <div className="flex justify-center -mt-2 mb-2!text-[--text-muted] text-xs italic">
          {t("global")}
        </div>
      )}

      <div className="flex p-2">
        <RelationshipDescriptionComponent
          element={element}
          relationship={relationship}
        />
      </div>

      <div className="flex align-bottom mt-auto w-full p-2">
        <button
          className={`w-full
							${
                relationship.isInContent ||
                relationship.isAlsoInContent ||
                relationship.type === RelationshipType.Reversed
                  ? "text-[--text-faint] cursor-not-allowed"
                  : "rpgm-danger"
              }`}
          disabled={
            relationship.isInContent ||
            relationship.isAlsoInContent ||
            relationship.type === RelationshipType.Reversed
          }
          onClick={removeRelationship}
          title={
            relationship.isInContent ||
            relationship.isAlsoInContent ||
            relationship.type === RelationshipType.Reversed
              ? relationship.type === RelationshipType.Reversed
                ? "You cannot remove the relationship, as it is contained in the content of the related element"
                : "You cannot remove the relationship, as it is contained in the content"
              : "Remove relationship"
          }
        >
          {t("buttons.delete")}
        </button>
      </div>
    </div>
  );
}
