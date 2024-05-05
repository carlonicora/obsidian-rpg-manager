import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import Flatpickr from "react-flatpickr";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { AttributeType } from "src/data/enums/AttributeType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";

export default function ChildSessionComponent({
  element,
  isInPopover,
}: {
  element: ElementInterface;
  isInPopover: boolean;
}): React.ReactElement {
  const api: RpgManagerInterface = useApi();
  const date: AttributeInterface = element.attribute(AttributeType.SessionDate);
  const app: App = useApp();

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

  return (
    <div className="flex flex-row w-full justify-between hover:bg-[--background-primary-alt] border-b border-b-[--background-modifier-border] text-sm group">
      {!isInPopover && (
        <div className="max-w-[12px] w-[12px] mr-1 pt-1 items-center invisible group-hover:visible">
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
      <div className="max-w-[20px] w-[20px] items-center">
        <a
          href={element.file.name}
          className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
        >
          {element.positionInParent}
        </a>
      </div>
      {isInPopover ? (
        <div className="w-full">
          <a
            href={element.file.name}
            className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
          >
            {element.name}
          </a>
        </div>
      ) : (
        <div className="w-full">
          <input
            type="text"
            onBlur={(e) => {
              saveAttribute(AttributeType.Name, e.target.value);
            }}
            className="w-full !border !border-transparent group-hover:!border-[--background-modifier-border] h-5 focus:!border-[--background-modifier-border] focus:!shadow-none"
            defaultValue={element.name}
          />
        </div>
      )}

      <div className="w-20 max-w-20">
        <Flatpickr
          value={date.value}
          className="w-full !border !border-transparent group-hover:!border-[--background-modifier-border] h-5 focus:!border-[--background-modifier-border] focus:!shadow-none"
          options={{
            dateFormat: "Y-m-d",
            altInput: true,
            altFormat: "D, M j, Y",
          }}
          onChange={(selectedDates: Date[], currentDate: string) => {
            saveAttribute(AttributeType.SessionDate, currentDate);
          }}
        />
      </div>
    </div>
  );
}
