import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import AttributeTitleComponent from "../../../components/attributes/AttributeTitleComponent";

export default function BooleanComponent({
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

  const codeblockService = new RpgManagerCodeblockService(
    app,
    api,
    element.file,
  );

  function removeAttribute(): void {
    codeblockService.updateCodeblockData(attribute.id, undefined);
  }

  const saveAttribute = (newValue: boolean) => {
    codeblockService.updateCodeblockData(attribute.id, newValue);
  };

  let content;

  if (isEditable) {
    content = (
      <div className="grid grid-cols-1 lg:grid-cols-2 group">
        <div>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="hidden"
                checked={attribute.value}
                onChange={(e) => saveAttribute(e.target.checked)}
              />
              <div
                className={`border b-[--background-modifier-border] bg-[--background-secondary] w-8 h-5 p-1 rounded-full transition-colors duration-300 ${
                  attribute.value ? "bg-[--interactive-accent]" : ""
                }`}
              ></div>
              <div
                className={`toggle-dot absolute top-0.5 left-0.5 w-4 h-4 bg-[--background-primary] rounded-full shadow-md transform-gpu transition-transform duration-300 ${
                  attribute.value ? "translate-x-3" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
        <div className="flex justify-end !ml-3">
          <button
            className="rpgm-danger opacity-0 group-hover:opacity-100"
            onClick={removeAttribute}
          >
            {t("buttons.delete")}
          </button>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-wrap p-3">
        <div className="flex items-center">
          <div className="relative">
            <div
              className={`border b-[--background-modifier-border] bg-[--background-secondary] w-8 h-5 p-1 rounded-full transition-colors duration-300 ${
                attribute.value ? "bg-[--interactive-accent]" : ""
              }`}
            ></div>
            <div
              className={`toggle-dot absolute top-0.5 left-0.5 w-4 h-4 bg-[--background-primary] rounded-full shadow-md transform-gpu transition-transform duration-300 ${
                attribute.value ? "translate-x-3" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4">
      <AttributeTitleComponent attribute={attribute} />
      <div className="col-span-3 pl-0 lg:pl-3">{content}</div>
    </div>
  );
}
