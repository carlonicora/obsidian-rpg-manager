import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import MarkdownComponent from "../../../components/markdowns/MarkdownComponent";
import CustomComponent from "./CustomComponent";
import CustomListComponent from "./CustomListComponent";

export default function CustomsComponent({
  element,
}: {
  element: ElementInterface;
}): React.ReactElement {
  const { t } = useTranslation();
  const app: App = useApp();

  const [attribute, setAttribute] = React.useState<
    AttributeInterface | undefined
  >(undefined);
  const [newAttribute, setNewAttribute] = React.useState<boolean>(false);

  const handleSetAttribute = (newAttribute: AttributeInterface) => {
    setAttribute(newAttribute);
    setNewAttribute(false);
  };

  const handleSetNewAttribute = () => {
    setAttribute(undefined);
    setNewAttribute(true);
  };

  const reset = () => {
    setTimeout(() => {
      setAttribute(undefined);
      setNewAttribute(false);

      app.workspace.trigger("rpgmanager:refresh-option-view");
    }, 500);
  };

  let content: React.ReactElement | undefined = undefined;

  if (attribute) {
    content = (
      <CustomComponent
        key={attribute.id}
        attribute={attribute}
        onSaveAttribute={reset}
      />
    );
  }

  if (newAttribute) {
    content = <CustomComponent onSaveAttribute={reset} />;
  }

  return (
    <>
      <h2 className="!text-2xl !font-extralight border-b border-b-[--background-modifier-border]">
        {t("attributes.custom")}
      </h2>
      <div className="grid grid-cols-5 border-b border-b-[--background-modifier-border]">
        <div className="col-span-1 border-r border-r-[--background-modifier-border]">
          <CustomListComponent
            element={element}
            setAttribute={handleSetAttribute}
            setNewAttribute={handleSetNewAttribute}
          />
        </div>
        <div className="p-3 col-span-4">
          {attribute || newAttribute ? (
            <>{content}</>
          ) : (
            <div>
              <h3 className="!p-0 !text-xl !font-extralight">
                {t("customattributes.your")}
              </h3>
              <div>
                <MarkdownComponent value={t("customattributes.describe")} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
