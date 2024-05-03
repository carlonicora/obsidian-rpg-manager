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

export default function DescriptionAttributeComponent({
  element,
  attribute,
  isEditable,
}: {
  element: ElementInterface;
  attribute: AttributeInterface;
  isEditable: boolean;
}): React.ReactElement {
  const { t } = useTranslation();
  const api: RpgManagerInterface = useApi();
  const app: App = useApp();

  const [editing, setEditing] = React.useState<boolean>(false);
  const [description, setDescription] = React.useState<string>(
    attribute.value ?? "",
  );

  function reset(): void {
    setDescription(attribute.value ?? "");
    setEditing(false);
  }

  const updateDescription = (newValue: string) => {
    if (newValue === undefined) {
      setEditing(false);
      return;
    }

    const codeblockService = new RpgManagerCodeblockService(
      app,
      api,
      element.file,
    );

    codeblockService.updateCodeblockData("description", newValue).then(() => {
      setEditing(false);
    });
  };

  let content;

  if (editing) {
    content = (
      <div className="grid grid-cols-1">
        <div>
          <MarkdownEditorComponent
            initialValue={attribute.value}
            campaign={
              element.type === ElementType.Campaign ? element : element.campaign
            }
            onChange={setDescription}
            className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md"
          />
        </div>
        <div className="flex justify-end mt-3">
          <button className="rpgm-secondary" onClick={reset}>
            {t("buttons.cancel")}
          </button>
          <button
            className="rpgm-primary"
            onClick={() => updateDescription(description)}
          >
            {t("buttons.save")}
          </button>
        </div>
      </div>
    );
  } else if (isEditable) {
    content = (
      <div
        onClick={() => setEditing(!editing)}
        className="p-3 border border-[--background-modifier-border] hover:border-[--background-modifier-border-hover] rounded-md cursor-text"
      >
        <MarkdownComponent value={attribute.value} />
      </div>
    );
  } else {
    content = (
      <div className="">
        <MarkdownComponent value={attribute.value} />
      </div>
    );
  }

  return (
    <>
      <h2 className="!text-2xl !font-bold border-b border-b-[--background-modifier-border]">
        {t("attributes.description")}
      </h2>
      <div>{content}</div>
    </>
  );
}
