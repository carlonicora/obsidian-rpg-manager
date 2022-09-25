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
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {SorterComparisonElementInterface} from "../interfaces/SorterComparisonElementInterface";
import {EventInterface} from "../interfaces/data/EventInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SubplotTableComponent} from "../components/SubplotTableComponent";

export abstract class AbstractModel extends AbstractRpgManager implements ModelInterface {
	protected componentFactory: ComponentFactory;
	protected response:ResponseDataInterface;
	protected componentMap: Map<RecordType, any> = new Map<RecordType, any>();
	protected recordSortingMap: Map<RecordType, Array<SorterComparisonElementInterface>> = new Map<RecordType, Array<SorterComparisonElementInterface>>();
	protected relationshipSortingMap: Map<RecordType, Array<SorterComparisonElementInterface>> = new Map<RecordType, Array<SorterComparisonElementInterface>>();

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
		this.componentMap.set(RecordType.NonPlayerCharacter, CharacterTableComponent);
		this.componentMap.set(RecordType.Music, MusicTableComponent);
		this.componentMap.set(RecordType.Adventure, AdventureTableComponent);
		this.componentMap.set(RecordType.Session, SessionTableComponent);
		this.componentMap.set(RecordType.Act, ActTableComponent);
		this.componentMap.set(RecordType.Scene, SceneTableComponent);
		this.componentMap.set(RecordType.Subplot, SubplotTableComponent);

		this.recordSortingMap = new Map();
		this.recordSortingMap.set(RecordType.Event, [new SorterComparisonElement((data: EventInterface) => data.date)]);
		this.recordSortingMap.set(RecordType.Campaign, [new SorterComparisonElement((data: CampaignInterface) => data.id.campaignId)]);
		this.recordSortingMap.set(RecordType.Session, [
			new SorterComparisonElement((data: SessionInterface) => data.id.campaignId),
			new SorterComparisonElement((data: SessionInterface) => data.id.adventureId),
		]);
		this.recordSortingMap.set(RecordType.Adventure, [
			new SorterComparisonElement((data: AdventureInterface) => data.id.campaignId),
			new SorterComparisonElement((data: AdventureInterface) => data.id.adventureId),
		]);
		this.recordSortingMap.set(RecordType.Act, [
			new SorterComparisonElement((data: ActInterface) => data.id.campaignId),
			new SorterComparisonElement((data: ActInterface) => data.id.adventureId),
			new SorterComparisonElement((data: ActInterface) => data.id.actId),
		]);
		this.recordSortingMap.set(RecordType.Scene, [
			new SorterComparisonElement((data: SceneInterface) => data.id.campaignId),
			new SorterComparisonElement((data: SceneInterface) => data.id.adventureId),
			new SorterComparisonElement((data: SceneInterface) => data.id.actId),
			new SorterComparisonElement((data: SceneInterface) => data.id.sceneId),
		]);


		this.relationshipSortingMap = new Map();
		this.relationshipSortingMap.set(RecordType.Event, [new SorterComparisonElement((data: RelationshipInterface) => (<EventInterface>data.component).date)]);
		this.relationshipSortingMap.set(RecordType.Campaign, [new SorterComparisonElement((data: RelationshipInterface) => (<CampaignInterface>data.component).id.campaignId)]);
		this.relationshipSortingMap.set(RecordType.Session, [
			new SorterComparisonElement((data: RelationshipInterface) => (<SessionInterface>data.component).id.campaignId),
			new SorterComparisonElement((data: RelationshipInterface) => (<SessionInterface>data.component).id.adventureId),
		]);
		this.relationshipSortingMap.set(RecordType.Adventure, [
			new SorterComparisonElement((data: RelationshipInterface) => (<AdventureInterface>data.component).id.campaignId),
			new SorterComparisonElement((data: RelationshipInterface) => (<AdventureInterface>data.component).id.adventureId),
		]);
		this.relationshipSortingMap.set(RecordType.Act, [
			new SorterComparisonElement((data: RelationshipInterface) => (<ActInterface>data.component).id.campaignId),
			new SorterComparisonElement((data: RelationshipInterface) => (<ActInterface>data.component).id.adventureId),
			new SorterComparisonElement((data: RelationshipInterface) => (<ActInterface>data.component).id.actId),
		]);
		this.relationshipSortingMap.set(RecordType.Scene, [
			new SorterComparisonElement((data: RelationshipInterface) => (<SceneInterface>data.component).id.campaignId),
			new SorterComparisonElement((data: RelationshipInterface) => (<SceneInterface>data.component).id.adventureId),
			new SorterComparisonElement((data: RelationshipInterface) => (<SceneInterface>data.component).id.actId),
			new SorterComparisonElement((data: RelationshipInterface) => (<SceneInterface>data.component).id.sceneId),
		]);
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

			if (title === undefined && type === RecordType.Character) title='Player Characters';
			if (title === undefined && type === RecordType.NonPlayerCharacter) title='Non Player Characters';

			if (data === undefined) data = this.currentElement.getRelationships(type, requiredRelationshipType);

			let isArray = false;
			Object.entries(data).forEach(([index, value]: [string, any]) => {
				if (!isNaN(+index)){
					isArray = true;
				}
			});

			if (isArray) {
				let sorter: Array<any>|undefined = undefined;
				if ((<Array<any>>data)[0]?.component !== undefined) {
					sorter = this.relationshipSortingMap.get(type);
					if (sorter === undefined) sorter = [new SorterComparisonElement((data: RelationshipInterface) => (<RecordInterface>data.component).name)];
				} else {
					sorter = this.recordSortingMap.get(type);
					if (sorter === undefined) sorter = [new SorterComparisonElement((data: RecordInterface) => data.name)];
				}

				if (sorter !== undefined) data = (<Array<any>>data).sort(this.factories.sorter.create<any>(sorter))
			}


			if (component !== undefined) {
				await this.response.addComponent(
					component,
					this.currentElement,
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
