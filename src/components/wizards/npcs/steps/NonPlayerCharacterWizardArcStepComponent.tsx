import * as React from "react";
import { useTranslation } from "react-i18next";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { ArcType } from "src/data/enums/ArcType";
import { useWizard } from "src/hooks/useWizard";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";

export default function NonPlayerCharacterWizardArcStepComponent({
  name,
  campaignPath,
  chatGpt,
  setOverlay,
}: {
  name: string;
  campaignPath?: string;
  chatGpt?: ChatGptNonPlayerCharacterModel;
  setOverlay: (show: boolean) => void;
}): React.ReactElement {
  const { t } = useTranslation();

  const wizardData = useWizard();
  const [arcType, setArcType] = React.useState<ArcType>(wizardData.arc);

  const setArc = (arc: ArcType) => {
    setArcType(arc);
    wizardData.arc = arc;
  };

  const arcs = [
    {
      type: ArcType.Positive,
      name: t("arc.arc", { context: ArcType.Positive }),
      description: t("arc.description", { context: ArcType.Positive }),
      selected: arcType === ArcType.Positive,
    },
    {
      type: ArcType.Disillusionment,
      name: t("arc.arc", { context: ArcType.Disillusionment }),
      description: t("arc.description", { context: ArcType.Disillusionment }),
      selected: arcType === ArcType.Disillusionment,
    },
    {
      type: ArcType.Fall,
      name: t("arc.arc", { context: ArcType.Fall }),
      description: t("arc.description", { context: ArcType.Fall }),
      selected: arcType === ArcType.Fall,
    },
    {
      type: ArcType.Corruption,
      name: t("arc.arc", { context: ArcType.Corruption }),
      description: t("arc.description", { context: ArcType.Corruption }),
      selected: arcType === ArcType.Corruption,
    },
    {
      type: ArcType.Flat,
      name: t("arc.arc", { context: ArcType.Flat }),
      description: t("arc.description", { context: ArcType.Flat }),
      selected: arcType === ArcType.Flat,
    },
  ];

  return (
    <>
      <h3 className="!text-xl !font-extralight">{t("attributes.arc")}</h3>
      <div className="!mt-3 !mb-3">
        <MarkdownComponent
          value={t("wizards.npc.description", { context: "arc", name: name })}
        />
      </div>
      <div className="">
        {arcs.map((arc, index) => {
          return (
            <div
              key={index}
              className="flex items-center rounded-md border border-[--background-modifier-border] m-4 p-4 hover:bg-[--background-primary-alt] bg-transparent cursor-pointer"
              onClick={() => setArc(arc.type)}
            >
              <div className="flext min-w[50px] w-[50px] items-center justify-center">
                {arc.selected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                )}
              </div>
              <div>
                <h4>{arc.name}</h4>
                <small>
                  <MarkdownComponent value={arc.description} />
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
