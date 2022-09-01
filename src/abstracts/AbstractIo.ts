import {IoInterface} from "../interfaces/IoInterface";
import {DataObject} from "obsidian-dataview";
import {
	AdventureData,
	AdventureList,
	CharacterData,
	CharacterList,
	ClueData,
	SceneData,
	SceneList,
	SessionData,
	SessionList,
	SynopsisData
} from "../settings/Agnostic/data";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {DataType} from "../enums/DataType";
import {ImageData} from "../data/ImageData";
import {ArrayFunc} from "obsidian-dataview/lib/api/data-array";
import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {AdventureListInterface} from "../interfaces/data/AdventureListInterface";
import {AdventureDataInterface} from "../interfaces/data/AdventureDataInterface";
import {SessionDataInterface} from "../interfaces/data/SessionDataInterface";
import {SessionListInterface} from "../interfaces/data/SessionListInterface";
import {SceneListInterface} from "../interfaces/data/SceneListInterface";
import {CharacterListInterface} from "../interfaces/data/CharacterListInterface";
import {ClueDataInterface} from "../interfaces/data/ClueDataInterface";
import {SceneDataInterface} from "../interfaces/data/SceneDataInterface";
import {GenericDataListInterface} from "../interfaces/data/GenericDataListInterface";
import {App} from "obsidian";
import {RpgFunctions} from "../RpgFunctions";
import {DataFactory, SingleDataKey} from "../factories/DataFactory";
import {SingleModelKey} from "../factories/ModelFactory";
import {DataListFactory, SingleDataListKey} from "../factories/DataListFactory";

export abstract class AbstractIo implements IoInterface {
	protected outlinks: DataObject[];

	protected variableSingular: string;
	protected variablePlural: string;
	protected variableParentSingular: string;
	protected variableParentPlural: string;

	protected id: string|null = null;

	constructor(
		protected app: App,
		protected campaign: CampaignDataInterface,
		protected dv: DataviewInlineApi,
		protected current: Record<string, any>,
	) {
		this.outlinks = [];
		this.readOutlinks();

		if (this.current?.tags != null) {
			this.current.tags.forEach((tag: string) => {
				if (tag.startsWith(RpgFunctions.settings.campaignTag)) {
					RpgFunctions.getTagId(this.current.tags, DataType.Campaign);
				} else if (tag.startsWith(RpgFunctions.settings.adventureTag)) {
					RpgFunctions.getTagId(this.current.tags, DataType.Adventure);
				} else if (tag.startsWith(RpgFunctions.settings.sessionTag)) {
					RpgFunctions.getTagId(this.current.tags, DataType.Session);
				} else if (tag.startsWith(RpgFunctions.settings.sceneTag)) {
					RpgFunctions.getTagId(this.current.tags, DataType.Scene);
				}
			});
		}
	}

	protected readOutlinks(
	) : void
	{
		if (this.current != undefined){
			this.current.file.outlinks.forEach((file: Record<string,any>) => {
				const page = this.dv.page(file.path);
				if (page != undefined) {
					this.outlinks.push(page);
				}
			});
		}
	}

	protected isAlreadyPresent(
		list: GenericDataListInterface,
		element: DataObject,
	): boolean
	{
		let response = false;

		list.elements.forEach((existingElement) => {
			if (element.file.path === existingElement.path){
				response = true;
				return true;
			}
		});

		return response;
	}

	protected hasMainTag(
		page: Record<string, any>,
		type: DataType
	): boolean
	{
		if (page.tags == undefined){
			return false;
		}

		switch (type){
			case DataType.Character:
				return page.tags.indexOf(RpgFunctions.settings.npcTag) !== -1 || page.tags.indexOf(RpgFunctions.settings.pcTag) !== -1;
				break;
			case DataType.Clue:
				return page.tags.indexOf(RpgFunctions.settings.clueTag) !== -1;
				break;
			case DataType.Location:
				return page.tags.indexOf(RpgFunctions.settings.locationTag) !== -1;
				break;
			case DataType.Faction:
				return page.tags.indexOf(RpgFunctions.settings.factionTag) !== -1;
				break;
			case DataType.Event:
				return page.tags.indexOf(RpgFunctions.settings.eventTag) !== -1;
				break;
			default:
				return false;
				break;
		}
	}

	protected getCorrectTag(
		type: DataType
	): string
	{
		let response = '';

		switch (type){
			case DataType.Character:
				response = '(#' + RpgFunctions.settings.npcTag + '/' + this.campaign.id + ' or #' + RpgFunctions.settings.pcTag + '/' + this.campaign.id + ')';
				break;
			case DataType.Clue:
				response = '#' + RpgFunctions.settings.clueTag + '/' + this.campaign.id;
				break;
			case DataType.Location:
				response = '#' + RpgFunctions.settings.locationTag + '/' + this.campaign.id;
				break;
			case DataType.Faction:
				response = '#' + RpgFunctions.settings.factionTag + '/' + this.campaign.id;
				break;
			case DataType.Event:
				response = '#' + RpgFunctions.settings.eventTag + '/' + this.campaign.id;
				break;
		}

		return response;
	}

	public getAdventureList(
	): AdventureListInterface
	{
		const response = new AdventureList(this.campaign);

		const query = '#' + RpgFunctions.settings.adventureTag + '/' + this.campaign.id;

		this.dv.pages(query)
			.sort(adventure =>
				-RpgFunctions.getTagId(adventure.tags, DataType.Adventure)
			)
			.forEach((adventure) => {
				response.add(
					new AdventureData(
						adventure,
						this.campaign,
					)
				)
			});

		return response;
	}

	public getAdventure(
		adventureId: number,
	): AdventureDataInterface|null
	{
		let response: AdventureDataInterface|null = null;

		const query = '#' + RpgFunctions.settings.adventureTag + '/' + this.campaign.id + '/' + adventureId

		const adventures = this.dv.pages(query);

		if (adventures !== null && adventures.length === 1){
			response = new AdventureData(
				adventures[0],
				this.campaign,
			)
		}

		return response;
	}

	public getSession(
		adventureId: number|null,
		sessionId: number,
	): SessionDataInterface|null
	{
		let response: SessionDataInterface|null = null;

		let sessions;
		if (adventureId != null) {
			const query = '#' + RpgFunctions.settings.sessionTag + '/' + this.campaign.id + '/' + adventureId + '/' + sessionId
			sessions = this.dv.pages(query);
		} else {
			const query = '#' + RpgFunctions.settings.sessionTag + '/' + this.campaign.id
			sessions = this.dv.pages(query)
				.where(session =>
					RpgFunctions.getTagId(session.tags, DataType.Session) === sessionId
				);
		}

		if (sessions !== null && sessions.length === 1){
			response = new SessionData(
				sessions[0],
				this.campaign,
			)
		}

		return response;
	}

	public getSessionList(
		adventureId: number|null = null,
	): SessionListInterface
	{
		const response = new SessionList(this.campaign);

		const query = '#' + RpgFunctions.settings.sessionTag + '/' + this.campaign.id + (adventureId !== null ? '/' + adventureId : '')

		this.dv.pages(query)
			.sort(session =>
			- RpgFunctions.getTagId(session.tags, DataType.Session)
		).forEach((session) => {
			response.add(
				new SessionData(
					session,
					this.campaign
				)
			)
		});

		return response;
	}
	public getSceneList(
		adventureId: number,
		sessionId: number
	): SceneListInterface
	{
		const response = new SceneList(this.campaign);

		const query = '#' + RpgFunctions.settings.sceneTag + '/' + this.campaign.id + '/' + adventureId + '/' + sessionId;

		this.dv.pages(query)
			.sort(scene =>
				RpgFunctions.getTagId(scene.tags, DataType.Scene)
			)
			.forEach((scene) => {
				response.add(
					new SceneData(
						scene,
						this.campaign,
					)
				)
			});

		return response;
	}

	public getCharacterList(
	): CharacterListInterface
	{
		const response = new CharacterList(this.campaign);

		const query = '(#' + RpgFunctions.settings.npcTag + '/' + this.campaign.id + ' or #' + RpgFunctions.settings.pcTag + '/' + this.campaign.id + ')';

		this.dv.pages(query)
			.sort(character =>
				character.file.name
			)
			.forEach((character) => {
				response.add(
					new CharacterData(
						character,
						this.campaign
					)
				)
			});

		return response;
	}

	public getClue(
	): ClueDataInterface
	{
		return new ClueData(
			this.current,
			this.campaign,
		)
	}

	public getImage(
		width = 75,
		height = 75,
	): ImageData
	{
		return new ImageData(
			this.current,
			width,
			height,
		)
	}

	public getSynopsis(
		title: string|null = null,
	): SynopsisData
	{
		return new SynopsisData(
			this.current,
			title
		)
	}

	public getScene(
		adventureId: number,
		sessionId: number,
		sceneId: number,
	): SceneDataInterface|null
	{
		let response: SceneDataInterface|null = null;

		if (adventureId === null || sessionId === null || sceneId === null) {
			response = new SceneData(
				this.current,
				this.campaign,
			)
		} else {
			const query = '#' + RpgFunctions.settings.sceneTag + '/' + this.campaign.id + '/' + adventureId + '/' + sessionId + '/' + sceneId;

			const scenes = this.dv.pages(query);

			if (scenes !== null && scenes.length === 1){
				response = new SceneData(
					scenes[0],
					this.campaign,
				)
			}

		}

		return response;
	}

	public getRelationshipList(
		type: DataType,
		parentType: DataType|null = null,
		sorting: ArrayFunc<any, any>|null = null,
	): GenericDataListInterface
	{
		const dataListName:SingleDataListKey<any> = this.campaign.settings + DataType[type];
		const response = DataListFactory.create(dataListName, this.campaign);

		this.variableSingular = DataType[type].toLowerCase();
		this.variablePlural = this.variableSingular + 's';

		const defaultSorting = function (page: Record<string, any>) {
			return page.file.name
		};

		let comparison: ArrayFunc<any, boolean>;

		if (parentType === null) {
			comparison = function (page: Record<string, any>): boolean {
				return page.file.folder !== this.templateFolder &&
					this.current.relationships != undefined &&
					this.current.relationships[this.variablePlural] != undefined &&
					this.current.relationships[this.variablePlural][page.file.name] !== undefined;
			}.bind(this);
		} else {
			this.variableParentSingular = DataType[parentType].toLowerCase();
			this.variableParentPlural = this.variableParentSingular + 's';

			comparison = function (page: Record<string, any>): boolean {
				return page.file.folder !== this.templateFolder &&
					page.relationships != undefined &&
					page.relationships[this.variableParentPlural] != undefined &&
					page.relationships[this.variableParentPlural][this.current.file.name] !== undefined;
			}.bind(this);
		}

		const query = this.getCorrectTag(type);

		this.dv.pages(query)
			.where(
				comparison
			)
			.sort(
				(sorting !== null ? sorting : defaultSorting)
			)
			.forEach((page) => {
				const dataName:SingleDataKey<any> = this.campaign.settings + DataType[type];
				response.add(
					DataFactory.create(
						dataName,
						this.campaign,
						this.current,
						(
							parentType === null ?
								this.current.relationships[this.variablePlural][page.file.name] :
								page.relationships[DataType[parentType].toLowerCase() + 's'][this.current.file.name]
						),
					)
				)
			});

		this.outlinks.forEach((page) => {
			if (
				this.hasMainTag(page, type) &&
				!this.isAlreadyPresent(response, page)
			) {
				const dataName:SingleDataKey<any> = this.campaign.settings + DataType[type];

				response.add(
					DataFactory.create(
						dataName,
						this.campaign,
						this.current,
						'_in main description_',
					)
				)
			}
		});

		return response;
	}
}
