import MarkdownEditorComponent from "@/components/editors/MarkdownEditorComponent";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import * as React from "react";
import { useTranslation } from "react-i18next";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { useWizard } from "src/hooks/useWizard";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";

export default function NonPlayerCharacterWizardDescriptionStepComponent({
  name,
  campaign,
  chatGpt,
  setOverlay,
}: {
  name: string;
  campaign?: ElementInterface;
  chatGpt?: ChatGptNonPlayerCharacterModel;
  setOverlay: (show: boolean) => void;
}): React.ReactElement {
  const { t } = useTranslation();
  const wizardData = useWizard();

  const updateDescription = (value: string) => {
    wizardData.description = value;
  };

  return (
    <>
      <h3 className="!text-xl !font-extralight">
        {t("attributes.description")}
      </h3>
      <div className="!mt-3 !mb-3">
        <MarkdownComponent
          value={t("wizards.npc.description", {
            context: "description",
            name: name,
          })}
        />
      </div>
      <div className="">
        <MarkdownEditorComponent
          initialValue={wizardData.description}
          campaign={campaign}
          onChange={updateDescription}
          className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] rounded-md"
        />
      </div>
    </>
  );
}
