import { RpgManagerInterface } from "@/RpgManagerInterface";
import { ModalCreationController } from "@/controllers/ModalCreationController";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { App, TFile } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";

export default function NewElementComponent({
  element,
  file,
}: {
  element: ElementInterface | undefined;
  file: TFile | undefined;
}): React.ReactElement {
  const { t } = useTranslation();
  const api: RpgManagerInterface = useApi();
  const app: App = useApp();

  return (
    <div className="rounded-md border border-[--background-modifier-border] bg-[--background-primary] p-3 col-span-1 text-xs mb-3">
      {file && !element && (
        <div className="mb-3">
          <h3 className="!mb-1 !text-xl !font-extralight mt-0">
            {t("create.in_title")}
          </h3>
          {Object.values(ElementType)
            .filter((v) => isNaN(Number(v)))
            .map((type, index) => (
              <div
                className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-md"
                key={index}
                onClick={() =>
                  new ModalCreationController(app, api, type, true).open()
                }
              >
                {t("elements." + type, { count: 1 })}
              </div>
            ))}
        </div>
      )}
      <h3 className="!mb-1 !text-xl !font-extralight mt-0">
        {t("create.title")}
      </h3>
      {Object.values(ElementType)
        .filter((v) => isNaN(Number(v)))
        .map((type, index) => (
          <div
            className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] list-disc list-inside pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-md"
            key={index}
            onClick={() => new ModalCreationController(app, api, type).open()}
          >
            {t("elements." + type, { count: 1 })}
          </div>
        ))}
    </div>
  );
}
