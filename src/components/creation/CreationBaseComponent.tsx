import { HelperService } from "@/services/HelperService";
import { TFile } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementType } from "src/data/enums/ElementType";
import { SystemType } from "src/data/enums/SystemType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "../../hooks/useApi";
import AdventureSelectionComponent from "./AdventureSelectionComponent";
import CampaignSelectionComponent from "./CampaignSelectionComponent";
import CreationTypeSelectionComponent from "./CreationTypeSelectionComponent";
import SessionSelectionComponent from "./SessionSelectionComponent";
import TemplateSelectionComponent from "./TemplateSelectionComponent";

export default function CreationBaseComponent({
  initialType,
  currentNote,
  setId,
  hasWizard,
  closeModal,
}: {
  initialType?: ElementType;
  currentNote?: TFile;
  setId: (
    launchWizard: boolean,
    type: ElementType,
    name: string,
    system: SystemType,
    passedCampaign?: ElementInterface,
    passedParent?: ElementInterface,
    positionInParent?: number,
    template?: string,
  ) => Promise<void>;
  hasWizard: boolean;
  closeModal: () => void;
}): React.ReactElement {
  const { t } = useTranslation();
  const api: RpgManagerInterface = useApi();

  const [global, setGlobal] = React.useState<boolean>(false);
  const [type, setType] = React.useState<ElementType | undefined>(initialType);
  const [campaign, setCampaign] = React.useState<
    ElementInterface | undefined
  >();
  const [parent, setParent] = React.useState<ElementInterface | undefined>(
    undefined,
  );
  const [positionInParent, setPositionInParent] = React.useState<
    number | undefined
  >(undefined);
  const [name, setName] = React.useState<string | undefined>(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [system, setSystem] = React.useState<SystemType | undefined>(undefined);
  const [template, setTemplate] = React.useState<string | undefined>(undefined);

  let campaigns: ElementInterface[] = [];
  let adventures: ElementInterface[] = [];
  let adventure: ElementInterface | undefined = undefined;
  let sessions: ElementInterface[] = [];
  let session: ElementInterface | undefined = undefined;

  if (currentNote !== undefined && name === undefined) {
    setName(currentNote.basename);
  }

  if (type !== undefined) {
    if (type !== ElementType.Campaign) {
      campaigns = api.get({ type: ElementType.Campaign }) as ElementInterface[];
      if (campaigns.length === 0 && !global)
        return <div>{t("errors.must", { context: "campaign" })}</div>;

      if (campaigns.length === 1 && !campaign) {
        setCampaign(campaigns[0]);
        setSystem(campaigns[0].system);
      }

      if (type === ElementType.Adventure || type === ElementType.Session) {
        if (parent === undefined && campaign !== undefined) setParent(campaign);

        if (positionInParent === undefined && campaign !== undefined) {
          setPositionInParent(
            HelperService.getPositionInParent(
              api.get({ campaign: campaign, type: type }) as ElementInterface[],
            ),
          );
        }
      }

      if (type === ElementType.Scene) {
        sessions = api.get({
          campaign: campaign,
          type: ElementType.Session,
          parent: campaign,
        }) as ElementInterface[];
        if (sessions.length === 0)
          return <div>{t("errors.must", { context: "session" })}</div>;

        if (sessions.length === 1) {
          session = sessions[0];
        } else if (parent !== undefined) {
          session = parent;
        }

        if (session !== undefined) {
          if (parent === undefined) setParent(session);

          if (positionInParent === undefined && session !== undefined) {
            setPositionInParent(
              HelperService.getPositionInParent(
                api.get({
                  campaign: campaign,
                  type: ElementType.Session,
                  parent: session,
                }) as ElementInterface[],
              ),
            );
          }
        }
      }

      if (type === ElementType.Chapter) {
        adventures = api.get({
          campaign: campaign,
          type: ElementType.Adventure,
          parent: campaign,
        }) as ElementInterface[];
        if (adventures.length === 0)
          return <div>{t("errors.must", { context: "adventure" })}</div>;

        if (adventures.length === 1) {
          adventure = adventures[0];
        } else if (parent !== undefined) {
          adventure = parent;
        }

        if (adventure !== undefined) {
          if (parent === undefined) setParent(adventure);

          if (positionInParent === undefined) {
            setPositionInParent(
              HelperService.getPositionInParent(
                api.get({
                  campaign: campaign,
                  type: type,
                  parent: adventure,
                }) as ElementInterface[],
              ),
            );
          }
        }
      }
    }
  }

  const createElement = async (launchWizard: boolean) => {
    let e = "";
    if (type !== ElementType.Campaign && campaign === undefined && !global)
      e += "You must select a campaign";
    if (name === undefined || name === "") e += "You must enter a name";
    if (
      (type === ElementType.Adventure || type === ElementType.Session) &&
      parent === undefined
    )
      e += "You must select a campaign";
    if (type === ElementType.Scene && parent === undefined)
      e += "You must select a session";
    if (type === ElementType.Chapter && parent === undefined)
      e += "You must select an adventure";

    if (e !== "") {
      setError(e);
      return;
    }

    setId(
      launchWizard,
      type,
      name,
      system,
      global ? undefined : campaign,
      parent,
      positionInParent,
      template,
    );
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (type !== undefined) {
      inputRef.current?.focus();
    }
  }, [type]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      createElement(hasWizard);
    }
  }

  return (
    <>
      <h2 className="!text-2xl !font-extralight border-b border-b-[--background-modifier-border]">
        {t("create.new", { context: type })}
      </h2>
      <div className="grid grid-cols-5 border-b border-b-[--background-modifier-border]">
        <div className="col-span-1 border-r border-r-[--background-modifier-border]">
          <ul className="!p-0 !m-0 !mt-3">
            <li className="text-[--text-normal]">
              {t("elements.element", { count: 1 })}
            </li>
          </ul>
        </div>
        <div className="p-3 col-span-4">
          {error && <div>{error}</div>}
          {type === undefined ? (
            <CreationTypeSelectionComponent setType={setType} />
          ) : (
            <TemplateSelectionComponent setTemplate={setTemplate} />
          )}

          {type !== undefined && type !== ElementType.Campaign && (
            <CampaignSelectionComponent
              campaigns={campaigns}
              setCampaign={setCampaign}
              setAsGlobal={
                ![
                  ElementType.Campaign,
                  ElementType.Adventure,
                  ElementType.Chapter,
                  ElementType.Session,
                  ElementType.Scene,
                ].contains(type)
                  ? setGlobal
                  : undefined
              }
              setSystem={setSystem}
            />
          )}
          {type !== undefined && type === ElementType.Scene && (
            <SessionSelectionComponent
              sessions={sessions}
              setSession={setParent}
            />
          )}
          {type !== undefined && type === ElementType.Chapter && (
            <AdventureSelectionComponent
              adventures={adventures}
              setAdventure={setParent}
            />
          )}
          {type !== undefined && (
            <div className="max-w-md">
              <div className="font-bold">{t("name")}</div>
              <input
                onKeyDown={handleKeyDown}
                ref={inputRef}
                type="text"
                defaultValue={name ?? ""}
                placeholder={t("name")}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
              {error && <div>{error}</div>}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end pt-5">
        <button className="rpgm-secondary pl-3 pr-3 mr-6" onClick={closeModal}>
          {t("buttons.cancel")}
        </button>
        {hasWizard && (
          <button
            className="rpgm-primary pl-3 pr-3 ml-3"
            onClick={() => createElement(true)}
          >
            {t("buttons.launchwizard")}
          </button>
        )}
        <button
          className="rpgm-primary pl-3 pr-3 ml-3 mr-5"
          onClick={() => createElement(false)}
        >
          {t("buttons.create")}
        </button>
      </div>
    </>
  );
}
