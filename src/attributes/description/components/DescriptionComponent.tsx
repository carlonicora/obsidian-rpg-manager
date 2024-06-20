import MarkdownEditorComponent from "@/components/editors/MarkdownEditorComponent";
import ContainerComponent from "@/components/groups/ContainerComponent";
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

export default function DescriptionComponent({
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
      <>
        <MarkdownEditorComponent
          initialValue={attribute.value}
          campaign={
            element.type === ElementType.Campaign ? element : element.campaign
          }
          onChange={setDescription}
          onBlur={() => updateDescription(description)}
          className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md"
        />
        <div className="flex flex-row justify-end mt-3">
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
      </>
    );
  } else if (isEditable) {
    content = (
      <div
        onClick={() => setEditing(!editing)}
        className="cursor-text min-h-10"
      >
        <MarkdownComponent value={attribute.value} />
      </div>
    );
  } else {
    content = <MarkdownComponent value={attribute.value} />;
  }

  return (
    <ContainerComponent title={t("attributes.description")}>
      {content}
    </ContainerComponent>
  );
}
