import { RpgManagerInterface } from "@/RpgManagerInterface";
import { ElementType } from "@/data/enums/ElementType";
import { AttributeInterface } from "@/data/interfaces/AttributeInterface";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { RpgManagerCodeblockService } from "@/services/RpgManagerCodeblockService";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import MarkdownEditorComponent from "../editors/MarkdownEditorComponent";
import MarkdownComponent from "../markdowns/MarkdownComponent";

export default function KishotenketsuComponent({
  element,
  attribute,
  isEditable,
}: {
  element: ElementInterface;
  attribute: AttributeInterface;
  isEditable: boolean;
}): React.ReactElement {
  const api: RpgManagerInterface = useApi();
  const app: App = useApp();

  const [edit, setEdit] = React.useState<boolean>(false);
  const [kishotenketsuValue, setKishotenketsuValue] = React.useState<{
    ki?: string;
    sho?: string;
    ten?: string;
    ketsu?: string;
  }>(attribute.value ?? {});

  const save = () => {
    const codeblockService = new RpgManagerCodeblockService(
      app,
      api,
      element.file,
    );

    attribute.value = kishotenketsuValue;

    codeblockService
      .updateCodeblockData(attribute.id, kishotenketsuValue)
      .then(() => {
        setEdit(false);
      });
  };

  const remove = () => {
    const codeblockService = new RpgManagerCodeblockService(
      app,
      api,
      element.file,
    );

    codeblockService.updateCodeblockData(attribute.id, undefined).then(() => {
      setEdit(false);
    });
  };

  const setValue = (subAttibute: string, newValue: string) => {
    setKishotenketsuValue({ ...kishotenketsuValue, [subAttibute]: newValue });
  };

  const reset = () => {
    setEdit(false);
  };

  if (edit)
    return (
      <Edit
        element={element}
        attribute={attribute}
        setValue={setValue}
        save={save}
        remove={remove}
        reset={reset}
      />
    );

  if (isEditable) return <View attribute={attribute} setEdit={setEdit} />;

  return <Browse attribute={attribute} />;
}

function Edit({
  element,
  attribute,
  setValue,
  save,
  remove,
  reset,
}: {
  element: ElementInterface;
  attribute: AttributeInterface;
  setValue: (subAttibute: string, newValue: string) => void;
  save: () => void;
  remove: () => void;
  reset: () => void;
}): React.ReactElement {
  const { t } = useTranslation();

  const campaign =
    element.type === ElementType.Campaign ? element : element.campaign;

  return (
    <div className="rounded-md border border-[--background-modifier-border] overflow-hidden bg-[--background-primary] mb-3 p-3">
      <h2 className="!text-2xl !font-bold border-b border-b-[--background-modifier-border]">
        {t("attributes.kishotenketsu")}
      </h2>
      <div className="gap-3 grid grid-cols-7">
        <EditableAttribute
          attribute={attribute}
          campaign={campaign}
          subAttribute="ki"
          setValue={setValue}
        />
        <EditableAttribute
          attribute={attribute}
          campaign={campaign}
          subAttribute="sho"
          setValue={setValue}
        />
        <EditableAttribute
          attribute={attribute}
          campaign={campaign}
          subAttribute="ten"
          setValue={setValue}
        />
        <EditableAttribute
          attribute={attribute}
          campaign={campaign}
          subAttribute="ketsu"
          setValue={setValue}
        />
      </div>

      <div className="flex justify-end mt-3">
        <button className="rpgm-danger" onClick={remove}>
          {t("buttons.delete")}
        </button>
        <button className="rpgm-secondary" onClick={reset}>
          {t("buttons.cancel")}
        </button>
        <button className="rpgm-primary" onClick={save}>
          {t("buttons.save")}
        </button>
      </div>
    </div>
  );
}

function View({
  attribute,
  setEdit,
}: {
  attribute: AttributeInterface;
  setEdit: (editable: boolean) => void;
}): React.ReactElement {
  return (
    <div
      onClick={() => {
        setEdit(true);
      }}
      className="cursor-pointer"
    >
      <Browse attribute={attribute} />
    </div>
  );
}

function Browse({
  attribute,
}: {
  attribute: AttributeInterface;
}): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div className="rounded-md border border-[--background-modifier-border] overflow-hidden bg-[--background-primary] mb-3 p-3">
      <h2 className="!text-2xl !font-bold border-b border-b-[--background-modifier-border]">
        {t("attributes.kishotenketsu")}
      </h2>
      <div className="gap-3 grid grid-cols-7">
        <EditableAttribute attribute={attribute} subAttribute="ki" />
        <EditableAttribute attribute={attribute} subAttribute="sho" />
        <EditableAttribute attribute={attribute} subAttribute="ten" />
        <EditableAttribute attribute={attribute} subAttribute="ketsu" />
      </div>
    </div>
  );
}

function EditableAttribute({
  attribute,
  subAttribute,
  setValue,
  campaign,
}: {
  attribute: AttributeInterface;
  subAttribute: string;
  setValue?: (subAttibute: string, newValue: string) => void;
  campaign?: ElementInterface;
}): React.ReactElement {
  const { t } = useTranslation();

  const [showHelp, setShowHelp] = React.useState<boolean>(false);

  const setSubAttributeValue = (newValue: string) => {
    setValue(subAttribute, newValue);
  };

  return (
    <>
      <div className="!font-bold col-span-1">
        <div>
          <MarkdownComponent value={t("kishotenketsu." + subAttribute)} />
        </div>
        {setValue && (
          <div
            className="text-xs cursor-pointer text-[--color-base-25] hover:text-[--text-accent-hover]"
            onClick={() => setShowHelp(!showHelp)}
          >
            <FontAwesomeIcon icon={faCircleQuestion} />
          </div>
        )}
      </div>
      <div className="col-span-6">
        {setValue ? (
          <MarkdownEditorComponent
            className="min-h-[2em] w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md"
            campaign={campaign}
            onChange={setSubAttributeValue}
            onBlur={() => setSubAttributeValue(attribute.value[subAttribute])}
            initialValue={attribute.value[subAttribute]}
          />
        ) : (
          <div className="min-h-[2em] w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md">
            <MarkdownComponent value={attribute.value[subAttribute]} />
          </div>
        )}
      </div>
      {showHelp && (
        <div className="col-span-full mb-3 p-3 rounded-md bg-[--background-primary-alt] text-sm">
          <MarkdownComponent
            value={t("kishotenketsu.description", { context: subAttribute })}
          />
        </div>
      )}
    </>
  );
}
