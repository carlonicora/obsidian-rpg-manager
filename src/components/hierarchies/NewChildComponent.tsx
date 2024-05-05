import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { FileCreationService } from "src/services/FileCreationService";

export default function NewChildComponent({
  parent,
  type,
  handleFileAdded,
}: {
  parent: ElementInterface;
  type: ElementType;
  handleFileAdded: () => void;
}): React.ReactElement {
  const { t } = useTranslation();
  const api: RpgManagerInterface = useApi();
  const app: App = useApp();

  const [fileName, setFileName] = React.useState<string>("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      handleCreateNewChild();
    }
  }

  async function handleCreateNewChild(): Promise<void> {
    if (fileName === "") return;

    const children: ElementInterface[] = api.get({
      campaign: parent.campaign,
      type: type,
      parent: parent,
    }) as ElementInterface[];

    const positionInParent: number =
      children.length === 0
        ? 1
        : ((Math.max(
            ...children.map(
              (element: ElementInterface) => element.positionInParent,
            ),
          ) + 1) as number);

    const fileCreator = new FileCreationService(
      app,
      api,
      type,
      fileName,
      parent.type === ElementType.Campaign
        ? parent.system
        : parent.campaign.system,
      parent.type === ElementType.Campaign ? parent : parent.campaign,
      parent,
      positionInParent,
    );

    fileCreator.create(false).then(() => {
      handleFileAdded();
    });
  }

  return (
    <div className="flex flex-row w-full justify-between border-b border-b-[--background-modifier-border] pb-1 mb-1 pt-1">
      <div className="w-full">
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          type="text"
          onChange={(e) => setFileName(e.target.value)}
          className="w-full !border !border-[--background-modifier-border] h-5 focus:!border-[--background-modifier-border] focus:!shadow-none"
          defaultValue={fileName}
          onBlur={handleCreateNewChild}
        />
      </div>

      <button
        className="rpgm-secondary pl-3 pr-3 mr-3 text-sm"
        onClick={handleFileAdded}
      >
        {t("buttons.cancel")}
      </button>
      <button
        className="rpgm-primary pl-3 pr-3 text-sm"
        onClick={handleCreateNewChild}
      >
        {t("create.add", { context: type })}
      </button>
    </div>
  );
}
