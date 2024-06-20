import MarkdownEditorComponent from "@/components/editors/MarkdownEditorComponent";
import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { ElementType } from "src/data/enums/ElementType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";

export default function ConflictElementComponent({
  element,
  attribute,
  stage,
  isEditable,
}: {
  element: ElementInterface;
  attribute: AttributeInterface;
  stage: string;
  isEditable: boolean;
}): React.ReactElement {
  const { t } = useTranslation();
  const api: RpgManagerInterface = useApi();
  const app: App = useApp();

  const [value, setValue] = React.useState<string>(
    attribute?.value?.[stage.toLowerCase()] ?? "",
  );
  const [editing, setEditing] = React.useState<boolean>(false);

  function saveStage(newValue: string): void {
    if (newValue === undefined) {
      setEditing(false);
      return;
    }

    const codeblockService = new RpgManagerCodeblockService(
      app,
      api,
      element.file,
    );
    codeblockService
      .updateCodeblockSubData([attribute.id, stage.toLowerCase()], newValue)
      .then(() => {
        setEditing(false);
      });
  }

  let content;
  if (editing) {
    content = (
      <div className={`${isEditable && "sm:col-span-1 lg:col-span-6"}`}>
        <div className="grid grid-cols-1">
          <div>
            <MarkdownEditorComponent
              initialValue={value}
              campaign={
                element.type === ElementType.Campaign
                  ? element
                  : element.campaign
              }
              onChange={setValue}
              onBlur={() => saveStage(value)}
              className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md"
            />
          </div>
          <div className="flex justify-end mt-3">
            <button className="rpgm-primary" onClick={() => saveStage(value)}>
              {t("buttons.save")}
            </button>
          </div>
        </div>
      </div>
    );
  } else if (isEditable) {
    content = (
      <div
        className={`border border-[--background-modifier-border] hover:border-[--background-modifier-border-hover] rounded-md p-3 cursor-text min-h-[3rem] ${
          isEditable && "sm:col-span-1 lg:col-span-6"
        }`}
        onClick={() => setEditing(!editing)}
      >
        <MarkdownComponent value={attribute.value[stage.toLowerCase()]} />
      </div>
    );
  } else {
    content = (
      <div>
        <MarkdownComponent value={attribute.value[stage.toLowerCase()]} />
      </div>
    );
  }

  return (
    <>
      <div
        className={`!font-bold ${isEditable && "sm:col-span-1 lg:col-span-1"}`}
      >
        <div>{t("conflict." + stage.toLowerCase())}</div>
      </div>
      {content}
    </>
  );
}
