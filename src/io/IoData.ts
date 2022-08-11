import {SessionData, SessionList, SessionListInterface} from "../data/SessionData";
import {CampaignDataInterface} from "../data/CampaignData";
import {RpgFunctions} from "../functions/RpgFunctions";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {AdventureData, AdventureList, AdventureListInterface} from "../data/AdventureData";
import {CharacterData, CharacterList, CharacterListInterface} from "../data/CharacterData";
import {ClueData, ClueDataInterface} from "../data/ClueData";
import {ImageData} from "../data/ImageData";
import {SynopsisData} from "../data/SynopsisData";
import {GenericDataListInterface} from "../interfaces/DataInterfaces";
import {DataObject} from "obsidian-dataview";
import {DataFactory} from "../factories/DataFactory";
import * as Datas from '../data';
import {ArrayFunc} from "obsidian-dataview/lib/api/data-array";
import {SceneData, SceneList, SceneListInterface} from "../data";

export enum DataType {
	Character,
	Location,
	Event,
	Clue,
	Faction,
}

export class IoData {
	private outlinks: DataObject[];

	private variableSingular: string;
	private variablePlural: string;
	private variableParentSingular: string;
	private variableParentPlural: string;

	constructor(
		private functions: RpgFunctions,
		private campaign: CampaignDataInterface|null,
		private dv: DataviewInlineApi,
		private current: Record<string, any>,
	) {
		this.outlinks = [];
		this.readOutlinks();
	}

	private readOutlinks(
	) : void
	{
		const current = this.dv.current();

		if (current != undefined){
			current.file.outlinks.forEach((file: Record<string,any>) => {
				const page = this.dv.page(file.path);
				if (page != undefined) {
					this.outlinks.push(page);
				}
			});
		}
	}

	private isAlreadyPresent(
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

	private hasMainTag(
		page: Record<string, any>,
		type: DataType
	): boolean
	{
		if (page.tags == undefined){
			return false;
		}

		switch (type){
			case DataType.Character:
				return page.tags.indexOf('character/npc') !== -1 || page.tags.indexOf('character/npc') !== -1;
				break;
			default:
				return page.tags.indexOf(DataType[type].toLowerCase()) !== -1;
				break;
		}
	}

	public getAdventureList(
	): AdventureListInterface
	{
		const response = new AdventureList(this.campaign);

		this.dv.pages("#adventure")
			.where(adventure =>
				adventure.file.folder !== "Templates" &&
				adventure.ids !== null &&
				adventure.ids.adventure !== null
			)
			.sort(adventure =>
				-adventure.ids.adventure
			)
			.forEach((adventure) => {
			response.add(
				new AdventureData(
					this.functions,
					adventure,
				)
			)
		});

		return response;
	}

	public getSessionList(
		adventureId: number|null = null,
	): SessionListInterface
	{
		const response = new SessionList(this.campaign);

		this.dv.pages("#session")
			.where(session =>
				session.file.folder !== "Templates" &&
				session.ids !== null &&
				session.ids.session !== null &&
				(adventureId != null ? session.ids.adventure === adventureId : true)
			).sort(session =>
				-session.ids.session
			).forEach((session) => {
				response.add(
					new SessionData(
						this.functions,
						session,
					)
				)
			});

		return response;
	}
	public getSceneList(
	): SceneListInterface
	{
		const response = new SceneList(this.campaign);

		this.dv.pages("#scene")
			.where(page =>
				page.file.folder !== "Templates" &&
				page.ids !== undefined &&
				page.ids.session != undefined &&
				page.ids.scene != undefined &&
				page.ids.session === this.current.ids.session
			)
			.sort(page => page.ids.scene)
			.forEach((scene) => {
				response.add(
					new SceneData(
						this.functions,
						scene,
					)
				)
			});

		return response;
	}

	public getCharacterList(
	): CharacterListInterface
	{
		const response = new CharacterList(this.campaign);

		this.dv.pages("#character")
			.where(character =>
				character.file.folder !== "Templates"
			)
			.sort(character =>
				character.file.name
			)
			.forEach((character) => {
				response.add(
					new CharacterData(
						this.functions,
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
			this.functions,
			this.current,
		)
	}

	public getImage(
		width = 75,
		height = 75,
	): ImageData
	{
		return new ImageData(
			this.functions,
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
			this.functions,
			this.current,
			title
		)
	}

	public getRelationshipList(
		type: DataType,
		parentType: DataType|null = null,
		sorting: ArrayFunc<any, any>|null = null,
	): GenericDataListInterface
	{
		//@ts-ignore
		const response = new Datas[DataType[type] + 'List'](this.campaign);

		this.variableSingular = DataType[type].toLowerCase();
		this.variablePlural = this.variableSingular + 's';

		const defaultSorting = function(page: Record<string, any>) {
			return page.file.name
		};

		let comparison: ArrayFunc<any, boolean>;

		if (parentType === null){
			comparison = function (page: Record<string, any>): boolean {
				return page.file.folder !== "Templates" &&
					this.current.relationships != undefined &&
					this.current.relationships[this.variablePlural] != undefined &&
					this.current.relationships[this.variablePlural][page.file.name] !== undefined;
			}.bind(this);
		} else {
			this.variableParentSingular = DataType[parentType].toLowerCase();
			this.variableParentPlural = this.variableParentSingular + 's';

			comparison = function (page: Record<string, any>): boolean {
				return page.file.folder !== "Templates" &&
					page.relationships != undefined &&
					page.relationships[this.variableParentPlural] != undefined &&
					page.relationships[this.variableParentPlural][this.current.file.name] !== undefined;
			}.bind(this);
		}

		this.dv.pages("#" + this.variableSingular)
			.where(
				comparison
			)
			.sort(
				(sorting !== null ? sorting : defaultSorting)
			)
			.forEach((page) => {
				response.add(
					DataFactory.create(
						type,
						this.functions,
						this.campaign,
						this.current,
						page,
						(parentType === null ?
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
			){
				response.add(
					DataFactory.create(
						type,
						this.functions,
						this.campaign,
						this.current,
						page,
						'_in main description_',
					)
				)
			}
		});

		return response;
	}
}
