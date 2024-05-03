import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { AttributeType } from "src/data/enums/AttributeType";
import { SceneType, isSceneActive } from "src/data/enums/SceneType";
import { StoryCircleStage } from "src/data/enums/StoryCircleStage";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import { SceneAnalyserService } from "src/services/sceneAnalyserService/SceneAnalyserService";
import MarkdownEditorComponent from "../editors/MarkdownEditorComponent";
import MarkdownComponent from "../markdowns/MarkdownComponent";

export default function ChildSceneComponent({
  element,
  isInPopover,
}: {
  element: ElementInterface;
  isInPopover: boolean;
}): React.ReactElement {
  const { t } = useTranslation();
  const api: RpgManagerInterface = useApi();
  const app: App = useApp();

  const [showTooltip, setShowTooltip] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  function saveAttribute(
    attributeName: string,
    value: string | boolean,
  ): Promise<void> {
    if (attributeName === "name") {
      const lastIndexOfName = element.path.lastIndexOf(element.name);
      const newPath =
        element.path.substring(0, lastIndexOfName) + value + ".md";
      return app.vault.rename(element.file, newPath);
    }

    const codeblockService = new RpgManagerCodeblockService(
      app,
      api,
      element.file,
    );
    return codeblockService.updateCodeblockData(attributeName, value);
  }

  let duration: number | undefined = undefined;

  if (showTooltip) {
    const sceneAnalyser: SceneAnalyserService = new SceneAnalyserService(api);
    duration = sceneAnalyser.getExpectedDuration(
      element.campaign,
      element.attribute(AttributeType.SceneType)?.value,
    );
  }

  function secondsToMMSS(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }

  return (
    <div className="flex items-center w-full hover:bg-[--background-primary-alt] border-b border-b-[--background-modifier-border] text-sm group">
      <div className="flex">
        {!isInPopover && (
          <div className="col-span-1 max-w-[12px] w-[12px] mr-1 pt-1 items-center invisible group-hover:visible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className=""
            >
              <path
                d="M8.5 7C9.60457 7 10.5 6.10457 10.5 5C10.5 3.89543 9.60457 3 8.5 3C7.39543 3 6.5 3.89543 6.5 5C6.5 6.10457 7.39543 7 8.5 7Z"
                fill="#666666"
              />
              <path
                d="M15.5 7C16.6046 7 17.5 6.10457 17.5 5C17.5 3.89543 16.6046 3 15.5 3C14.3954 3 13.5 3.89543 13.5 5C13.5 6.10457 14.3954 7 15.5 7Z"
                fill="#666666"
              />
              <path
                d="M10.5 12C10.5 13.1046 9.60457 14 8.5 14C7.39543 14 6.5 13.1046 6.5 12C6.5 10.8954 7.39543 10 8.5 10C9.60457 10 10.5 10.8954 10.5 12Z"
                fill="#666666"
              />
              <path
                d="M15.5 14C16.6046 14 17.5 13.1046 17.5 12C17.5 10.8954 16.6046 10 15.5 10C14.3954 10 13.5 10.8954 13.5 12C13.5 13.1046 14.3954 14 15.5 14Z"
                fill="#666666"
              />
              <path
                d="M10.5 19C10.5 20.1046 9.60457 21 8.5 21C7.39543 21 6.5 20.1046 6.5 19C6.5 17.8954 7.39543 17 8.5 17C9.60457 17 10.5 17.8954 10.5 19Z"
                fill="#666666"
              />
              <path
                d="M15.5 21C16.6046 21 17.5 20.1046 17.5 19C17.5 17.8954 16.6046 17 15.5 17C14.3954 17 13.5 17.8954 13.5 19C13.5 20.1046 14.3954 21 15.5 21Z"
                fill="#666666"
              />
            </svg>
          </div>
        )}
        <div className="col-span-1 max-w-[20px] w-[20px] align-middle items-center">
          <a
            href={element.file.name}
            className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
          >
            {element.positionInParent}
          </a>
        </div>
      </div>
      {isInPopover ? (
        <div className="flex w-full items-center">
          <div>
            <a
              href={element.file.name}
              className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
            >
              {element.name}
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 w-full pt-1 pb-1 items-start">
          <div className="col-span-2 pr-1">
            <input
              type="text"
              onBlur={(e) => {
                saveAttribute(AttributeType.Name, e.target.value);
              }}
              className="w-full !border !border-transparent group-hover:!border-[--background-modifier-border] h-5 focus:!border-[--background-modifier-border] focus:!shadow-none"
              defaultValue={element.name}
            />
          </div>
          <div className="pr-1">
            <select
              defaultValue={
                element.attribute(AttributeType.StoryCircleStage)?.value
              }
              onChange={(e) =>
                saveAttribute(AttributeType.StoryCircleStage, e.target.value)
              }
              className="selectBorder w-full 
								!border !border-transparent group-hover:!border-[--background-modifier-border] focus:!border-[--background-modifier-border]
								h-7 pl-1 
								focus:!shadow-none !shadow-none
								bg-transparent group-hover:bg-[--background-modifier-form-field]
								"
            >
              <option value=""></option>
              {Object.entries(StoryCircleStage)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, index]) => (
                  <option key={key} value={index}>
                    {key}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-span-5 pr-1">
            {isEditing ? (
              <MarkdownEditorComponent
                initialValue={
                  element.attribute(AttributeType.Description)?.value ?? ""
                }
                campaign={element.campaign}
                className="!p-1 m-0 border rounded-md border-transparent group-hover:!border-solid group-hover:!border-[--background-modifier-border] bg-transparent group-hover:bg-[--background-modifier-form-field]"
                onBlur={(value: string) => {
                  saveAttribute(AttributeType.Description, value);
                }}
                forceFocus={true}
              />
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                <MarkdownComponent
                  className="min-h-[30px] w-full border rounded-md border-transparent group-hover:!border-solid group-hover:!border-[--background-modifier-border] bg-transparent group-hover:bg-[--background-modifier-form-field]"
                  value={
                    element.attribute(AttributeType.Description)?.value ?? ""
                  }
                />
              </div>
            )}
          </div>
          <div className="col-span-2 pr-1">
            <select
              defaultValue={element.attribute(AttributeType.SceneType)?.value}
              onChange={(e) =>
                saveAttribute(AttributeType.SceneType, e.target.value)
              }
              className="selectBorder w-full 
								!border !border-transparent group-hover:!border-[--background-modifier-border] focus:!border-[--background-modifier-border]
								h-7 pl-1 
								focus:!shadow-none !shadow-none
								bg-transparent group-hover:bg-[--background-modifier-form-field]
								"
            >
              <option value=""></option>
              {Object.entries(SceneType)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, index]) => {
                  const isActive: boolean = isSceneActive(
                    SceneType[key as keyof typeof SceneType],
                  );
                  return (
                    <option key={key} value={index}>
                      {key + " " + (isActive ? t("attributes.active") : "")}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex justify-center">
            <div>
              <input
                type="checkbox"
                className=""
                defaultChecked={
                  element.attribute(AttributeType.ExternalActions)?.value ===
                  true
                }
                onChange={(e) =>
                  saveAttribute(AttributeType.ExternalActions, e.target.checked)
                }
              />
            </div>
          </div>
          <div
            className="relative flex justify-center opacity-0 group-hover:opacity-100 cursor-help !text-[--text-muted] hover:!text-[text-normal]"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <span className=" ">?</span>
            {showTooltip && (
              <div
                className="absolute z-10 w-64 p-2 mt-2 text-xs bg-[--background-secondary] rounded shadow-lg"
                style={{
                  top: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {t("analyser.expectedduration")}: {secondsToMMSS(duration)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
