import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {App} from "obsidian";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {ComponentFactory} from "../factories/ComponentFactory";
import {ResponseData} from "../data/responses/ResponseData";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {RecordType} from "../enums/RecordType";
import {RelationshipType} from "../enums/RelationshipType";
import {LocationTableComponent} from "../components/LocationTableComponent";
import {FactionTableComponent} from "../components/FactionTableComponent";
import {ClueTableComponent} from "../components/ClueTableComponent";
import {EventTableComponent} from "../components/EventTableComponent";
import {MusicTableComponent} from "../components/MusicTableComponent";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {AdventureTableComponent} from "../components/AdventureTableComponent";
import {ActTableComponent} from "../components/ActTableComponent";
import {SceneTableComponent} from "../components/SceneTableComponent";
import {SessionTableComponent} from "../components/SessionTableComponent";

export abstract class AbstractModel extends AbstractRpgManager implements ModelInterface {
	protected componentFactory: ComponentFactory;
	protected response:ResponseDataInterface;
	protected componentMap: Map<RecordType, any> = new Map<RecordType, any>();

	constructor(
		app: App,
		protected currentElement: RecordInterface,
		protected source: string,
		protected sourcePath: string,
		protected sourceMeta: any,
	) {
		super(app);
		this.response = new ResponseData(this.app);

		this.componentMap.set(RecordType.Location, LocationTableComponent);
		this.componentMap.set(RecordType.Faction, FactionTableComponent);
		this.componentMap.set(RecordType.Clue, ClueTableComponent);
		this.componentMap.set(RecordType.Event, EventTableComponent);
		this.componentMap.set(RecordType.Character, CharacterTableComponent);
		this.componentMap.set(RecordType.Music, MusicTableComponent);
		this.componentMap.set(RecordType.Adventure, AdventureTableComponent);
		this.componentMap.set(RecordType.Session, SessionTableComponent);
		this.componentMap.set(RecordType.Act, ActTableComponent);
		this.componentMap.set(RecordType.Scene, SceneTableComponent);
	}

	abstract generateData(
	): Promise<ResponseDataInterface>;

	protected async addList(
		type: RecordType,
		data: RecordInterface[],
		title: string|undefined=undefined,
	): Promise<void> {
		return await this.add(type, undefined, data, title);
	}

	protected async addRelationships(
		type: RecordType,
		requiredRelationshipType: RelationshipType = RelationshipType.Direct | RelationshipType.DirectInFrontmatter,
		title: string|undefined=undefined,
	): Promise<void> {
		return await this.add(type, requiredRelationshipType, undefined, title);
	}

	private async add(
		type: RecordType,
		requiredRelationshipType: RelationshipType|undefined = RelationshipType.Direct | RelationshipType.DirectInFrontmatter,
		data: RecordInterface[]|RecordInterface|RelationshipInterface[]|undefined=undefined,
		title: string|undefined=undefined,
	): Promise<void>{
		if (!this.isExcluded(type)){
			const component = this.componentMap.get(type);

			if (type === RecordType.Character) type = RecordType.Character|RecordType.NonPlayerCharacter;
			if (data === undefined) data = this.currentElement.getRelationships(type, requiredRelationshipType);

			if (component !== undefined) {
				await this.response.addComponent(
					component,
					data,
					title,
				);
			}
		}
	}

	protected isExcluded(
		type: RecordType,
	): boolean {
		if (this.sourceMeta != null && this.sourceMeta.exclude !== undefined && typeof this.sourceMeta.exclude === 'object'){
			for (let index=0; index<this.sourceMeta.exclude.length; index++){
				const excludedType:RecordType|undefined = RecordType[this.sourceMeta.exclude[index] as keyof typeof RecordType];

				if (excludedType !== undefined && excludedType === type) return true;
			}
		}

		return false;
	}
}
