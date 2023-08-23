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

export default function CreationBaseComponent({
	initialType,
	currentNote,
	setId,
	hasWizard,
}: {
	initialType?: ElementType;
	currentNote?: TFile;
	setId: (
		launchWizard: boolean,
		type: ElementType,
		name: string,
		system: SystemType,
		campaignPath: string,
		parentPath?: string,
		positionInParent?: number
	) => Promise<void>;
	hasWizard: boolean;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	const [type, setType] = React.useState<ElementType | undefined>(initialType);
	const [campaignPath, setCampaignPath] = React.useState<string | undefined>();
	const [parentPath, setParentPath] = React.useState<string | undefined>(undefined);
	const [positionInParent, setPositionInParent] = React.useState<number | undefined>(undefined);
	const [name, setName] = React.useState<string | undefined>(undefined);
	const [error, setError] = React.useState<string | undefined>(undefined);
	const [system, setSystem] = React.useState<SystemType | undefined>(undefined);

	let campaigns: ElementInterface[] = [];
	let campaign: ElementInterface | undefined = undefined;
	let adventures: ElementInterface[] = [];
	let adventure: ElementInterface | undefined = undefined;
	let sessions: ElementInterface[] = [];
	let session: ElementInterface | undefined = undefined;

	if (currentNote !== undefined && name === undefined) {
		setName(currentNote.basename);
	}

	function getPositionInParent(elements: ElementInterface[]): number {
		if (elements.length === 0) return 1;

		const highestPositionInParent = Math.max(...elements.map((element: ElementInterface) => element.positionInParent));
		return highestPositionInParent + 1;
	}

	if (type !== undefined) {
		if (type !== ElementType.Campaign) {
			campaigns = api.get(undefined, undefined, ElementType.Campaign) as ElementInterface[];
			if (campaigns.length === 0) return <div>{t("errors.must", { context: "campaign" })}</div>;

			if (campaigns.length === 1) {
				campaign = campaigns[0];

				if (!campaignPath) {
					setCampaignPath(campaign.path);
					setSystem(campaign.system);
				}
			}

			if (campaignPath !== undefined)
				campaign = campaigns.find((campaign: ElementInterface) => campaign.path === campaignPath);

			if (type === ElementType.Adventure || type === ElementType.Session) {
				if (parentPath === undefined && campaign !== undefined) setParentPath(campaign.path);

				if (positionInParent === undefined) {
					setPositionInParent(getPositionInParent(api.get(undefined, campaign, type) as ElementInterface[]));
				}
			}

			if (type === ElementType.Scene) {
				sessions = api.get(undefined, campaign, ElementType.Session, campaign) as ElementInterface[];
				if (sessions.length === 0) return <div>{t("errors.must", { context: "session" })}</div>;

				if (sessions.length === 1) {
					session = sessions[0];
				} else if (parentPath !== undefined) {
					session = sessions.find((session: ElementInterface) => session.path === parentPath);
				}

				if (session !== undefined) {
					if (parentPath === undefined) setParentPath(session.path);

					if (positionInParent === undefined) {
						setPositionInParent(
							getPositionInParent(api.get(undefined, campaign, ElementType.Session, session) as ElementInterface[])
						);
					}
				}
			}

			if (type === ElementType.Chapter) {
				adventures = api.get(undefined, campaign, ElementType.Adventure, campaign) as ElementInterface[];
				if (adventures.length === 0) return <div>{t("errors.must", { context: "adventure" })}</div>;

				if (adventures.length === 1) {
					adventure = adventures[0];
				} else if (parentPath !== undefined) {
					adventure = adventures.find((adventure: ElementInterface) => adventure.path === parentPath);
				}

				if (adventure !== undefined) {
					if (parentPath === undefined) setParentPath(adventure.path);

					if (positionInParent === undefined) {
						setPositionInParent(
							getPositionInParent(api.get(undefined, campaign, type, adventure) as ElementInterface[])
						);
					}
				}
			}
		}
	}

	const createElement = async (launchWizard: boolean) => {
		let e = "";
		if (type !== ElementType.Campaign && campaignPath === undefined) e += "You must select a campaign";
		if (name === undefined || name === "") e += "You must enter a name";
		if ((type === ElementType.Adventure || type === ElementType.Session) && parentPath === undefined)
			e += "You must select a campaign";
		if (type === ElementType.Scene && parentPath === undefined) e += "You must select a session";
		if (type === ElementType.Chapter && parentPath === undefined) e += "You must select an adventure";

		if (e !== "") {
			setError(e);
			return;
		}

		setId(launchWizard, type, name, system, campaignPath, parentPath, positionInParent);
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
			<h2 className="!m-0 !text-2xl !font-extralight border-b border-b-[--background-modifier-border]">
				{t("create.new", { context: type })}
			</h2>
			<div className="grid grid-cols-5 border-b border-b-[--background-modifier-border]">
				<div className="col-span-1 border-r border-r-[--background-modifier-border]">
					<ul className="!p-0 !m-0 !mt-3">
						<li className="text-[--text-normal]">{t("elements.element", { count: 1 })}</li>
					</ul>
				</div>
				<div className="p-3 col-span-4">
					{error && <div>{error}</div>}
					{type === undefined && <CreationTypeSelectionComponent setType={setType} />}
					{type !== undefined && type !== ElementType.Campaign && (
						<CampaignSelectionComponent campaigns={campaigns} setCampaign={setCampaignPath} setSystem={setSystem} />
					)}
					{type !== undefined && type === ElementType.Scene && (
						<SessionSelectionComponent sessions={sessions} setSessionPath={setParentPath} />
					)}
					{type !== undefined && type === ElementType.Chapter && (
						<AdventureSelectionComponent adventures={adventures} setAdventurePath={setParentPath} />
					)}
					{type !== undefined && (
						<div className="min-w-[200px] w-[200px]">
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
				<button className="rpgm-secondary pl-3 pr-3 mr-6" onClick={() => close()}>
					{t("buttons.cancel")}
				</button>
				{hasWizard && (
					<button className="rpgm-primary pl-3 pr-3 ml-3" onClick={() => createElement(true)}>
						{t("buttons.launchwizard")}
					</button>
				)}
				<button className="rpgm-primary pl-3 pr-3 ml-3 mr-5" onClick={() => createElement(false)}>
					{t("buttons.create")}
				</button>
			</div>
		</>
	);
}
