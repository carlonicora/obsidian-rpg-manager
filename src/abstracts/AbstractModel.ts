import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {App} from "obsidian";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";
import {SubModelFactory} from "../factories/SubModelFactory";
import {ResponseData} from "../responses/ResponseData";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {ComponentType} from "../enums/ComponentType";
import {RelationshipType} from "../enums/RelationshipType";
import {LocationTableSubModel} from "../models/subModels/tables/LocationTableSubModel";
import {FactionTableSubModel} from "../models/subModels/tables/FactionTableSubModel";
import {ClueTableSubModel} from "../models/subModels/tables/ClueTableSubModel";
import {EventTableSubModel} from "../models/subModels/tables/EventTableSubModel";
import {MusicTableSubModel} from "../models/subModels/tables/MusicTableSubModel";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {CharacterTableSubModel} from "../models/subModels/tables/CharacterTableSubModel";
import {AdventureTableSubModel} from "../models/subModels/tables/AdventureTableSubModel";
import {ActTableSubModel} from "../models/subModels/tables/ActTableSubModel";
import {SceneTableSubModel} from "../models/subModels/tables/SceneTableSubModel";
import {SessionTableSubModel} from "../models/subModels/tables/SessionTableSubModel";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {SorterComparisonElementInterface} from "../interfaces/SorterComparisonElementInterface";
import {EventInterface} from "../interfaces/components/EventInterface";
import {AdventureInterface} from "../interfaces/components/AdventureInterface";
import {CampaignInterface} from "../interfaces/components/CampaignInterface";
import {ActInterface} from "../interfaces/components/ActInterface";
import {SceneInterface} from "../interfaces/components/SceneInterface";
import {SessionInterface} from "../interfaces/components/SessionInterface";
import {SubplotTableSubModel} from "../models/subModels/tables/SubplotTableSubModel";
import {NonPlayerCharacterTableSubModel} from "../models/subModels/tables/NonPlayerCharacterTableSubModel";
import {ArrayHelper} from "../helpers/ArrayHelper";
import {SorterType} from "../enums/SorterType";

export abstract class AbstractModel extends AbstractRpgManager implements ModelInterface {
	protected subModelFactory: SubModelFactory;
	protected response:ResponseDataInterface;
	protected subModelsMap: Map<ComponentType, any> = new Map<ComponentType, any>();
	protected recordSortingMap: Map<ComponentType, Array<SorterComparisonElementInterface>> = new Map<ComponentType, Array<SorterComparisonElementInterface>>();
	protected relationshipSortingMap: Map<ComponentType, Array<SorterComparisonElementInterface>> = new Map<ComponentType, Array<SorterComparisonElementInterface>>();

	constructor(
		app: App,
		protected currentElement: ComponentInterface,
		protected source: string,
		protected sourcePath: string,
		protected sourceMeta: any,
	) {
		super(app);
		this.response = new ResponseData(this.app);

		this.subModelsMap.set(ComponentType.Location, LocationTableSubModel);
		this.subModelsMap.set(ComponentType.Faction, FactionTableSubModel);
		this.subModelsMap.set(ComponentType.Clue, ClueTableSubModel);
		this.subModelsMap.set(ComponentType.Event, EventTableSubModel);
		this.subModelsMap.set(ComponentType.Character, CharacterTableSubModel);
		this.subModelsMap.set(ComponentType.NonPlayerCharacter, NonPlayerCharacterTableSubModel);
		this.subModelsMap.set(ComponentType.Music, MusicTableSubModel);
		this.subModelsMap.set(ComponentType.Adventure, AdventureTableSubModel);
		this.subModelsMap.set(ComponentType.Session, SessionTableSubModel);
		this.subModelsMap.set(ComponentType.Act, ActTableSubModel);
		this.subModelsMap.set(ComponentType.Scene, SceneTableSubModel);
		this.subModelsMap.set(ComponentType.Subplot, SubplotTableSubModel);

		this.recordSortingMap = new Map();
		this.recordSortingMap.set(ComponentType.Event, [new SorterComparisonElement((data: EventInterface) => data.date)]);
		this.recordSortingMap.set(ComponentType.Campaign, [new SorterComparisonElement((data: CampaignInterface) => data.id.campaignId)]);
		this.recordSortingMap.set(ComponentType.Session, [
			new SorterComparisonElement((data: SessionInterface) => data.id.campaignId),
			new SorterComparisonElement((data: SessionInterface) => data.id.adventureId),
		]);
		this.recordSortingMap.set(ComponentType.Adventure, [
			new SorterComparisonElement((data: AdventureInterface) => data.id.campaignId),
			new SorterComparisonElement((data: AdventureInterface) => data.id.adventureId),
		]);
		this.recordSortingMap.set(ComponentType.Act, [
			new SorterComparisonElement((data: ActInterface) => data.id.campaignId),
			new SorterComparisonElement((data: ActInterface) => data.id.adventureId),
			new SorterComparisonElement((data: ActInterface) => data.id.actId),
		]);
		this.recordSortingMap.set(ComponentType.Scene, [
			new SorterComparisonElement((data: SceneInterface) => data.id.campaignId),
			new SorterComparisonElement((data: SceneInterface) => data.id.adventureId),
			new SorterComparisonElement((data: SceneInterface) => data.id.actId),
			new SorterComparisonElement((data: SceneInterface) => data.id.sceneId),
		]);


		this.relationshipSortingMap = new Map();
		this.relationshipSortingMap.set(ComponentType.Event, [new SorterComparisonElement((data: RelationshipInterface) => (<EventInterface>data.component).date)]);
		this.relationshipSortingMap.set(ComponentType.Campaign, [new SorterComparisonElement((data: RelationshipInterface) => (<CampaignInterface>data.component).id.campaignId)]);
		this.relationshipSortingMap.set(ComponentType.Session, [
			new SorterComparisonElement((data: RelationshipInterface) => (<SessionInterface>data.component).id.campaignId),
			new SorterComparisonElement((data: RelationshipInterface) => (<SessionInterface>data.component).id.adventureId),
		]);
		this.relationshipSortingMap.set(ComponentType.Adventure, [
			new SorterComparisonElement((data: RelationshipInterface) => (<AdventureInterface>data.component).id.campaignId),
			new SorterComparisonElement((data: RelationshipInterface) => (<AdventureInterface>data.component).id.adventureId),
		]);
		this.relationshipSortingMap.set(ComponentType.Act, [
			new SorterComparisonElement((data: RelationshipInterface) => (<ActInterface>data.component).id.campaignId),
			new SorterComparisonElement((data: RelationshipInterface) => (<ActInterface>data.component).id.adventureId),
			new SorterComparisonElement((data: RelationshipInterface) => (<ActInterface>data.component).id.actId),
		]);
		this.relationshipSortingMap.set(ComponentType.Scene, [
			new SorterComparisonElement((data: RelationshipInterface) => (<SceneInterface>data.component).id.campaignId),
			new SorterComparisonElement((data: RelationshipInterface) => (<SceneInterface>data.component).id.adventureId),
			new SorterComparisonElement((data: RelationshipInterface) => (<SceneInterface>data.component).id.actId),
			new SorterComparisonElement((data: RelationshipInterface) => (<SceneInterface>data.component).id.sceneId),
		]);
	}

	abstract generateData(
	): Promise<ResponseDataInterface>;

	protected async addList(
		type: ComponentType,
		data: ComponentInterface[],
		sortByLatestUsage = false,
	): Promise<void> {
		if (sortByLatestUsage){
			data
		}
		return await this.add(type, undefined, data, undefined, sortByLatestUsage);
	}

	protected async addRelationships(
		type: ComponentType,
		requiredRelationshipType: RelationshipType = RelationshipType.Direct | RelationshipType.DirectInFrontmatter,
		title: string|undefined=undefined,
	): Promise<void> {
		return await this.add(type, requiredRelationshipType, undefined, title, false);
	}

	private async add(
		type: ComponentType,
		requiredRelationshipType: RelationshipType|undefined = RelationshipType.Direct | RelationshipType.DirectInFrontmatter,
		data: ComponentInterface[]|ComponentInterface|RelationshipInterface[]|undefined=undefined,
		title: string|undefined=undefined,
		sortByLatestUsage: boolean,
	): Promise<void>{
		if (!this.isExcluded(type)){
			const subModel = this.subModelsMap.get(type);
			if (data === undefined) data = this.currentElement.getRelationships(type, requiredRelationshipType);

			if (ArrayHelper.isArray(data)) {
				let sorter: Array<any> | undefined = undefined;

				if ((<Array<any>>data)[0]?.component !== undefined) {
					if (sortByLatestUsage){
						sorter = [
							new SorterComparisonElement((data: RelationshipInterface) => (<ComponentInterface>data.component).file.stat.mtime, SorterType.Descending)
						];
					} else {
						sorter = this.relationshipSortingMap.get(type);
						if (sorter === undefined) sorter = [new SorterComparisonElement((data: RelationshipInterface) => (<ComponentInterface>data.component).name)];
					}
				} else {
					if (sortByLatestUsage){
						sorter = [
							new SorterComparisonElement((data: ComponentInterface) => data.file.stat.mtime, SorterType.Descending)
						];
					} else {
						sorter = this.recordSortingMap.get(type);
						if (sorter === undefined) sorter = [new SorterComparisonElement((data: ComponentInterface) => data.name)];
					}
				}

				if (sorter !== undefined) data = (<Array<any>>data).sort(this.factories.sorter.create<any>(sorter))
			}


			if (subModel !== undefined) {
				await this.response.addSubModel(
					subModel,
					this.currentElement,
					data,
					title,
				);
			}
		}
	}

	protected isExcluded(
		type: ComponentType,
	): boolean {
		if (this.sourceMeta != null && this.sourceMeta.exclude !== undefined && typeof this.sourceMeta.exclude === 'object'){
			for (let index=0; index<this.sourceMeta.exclude.length; index++){
				const excludedType:ComponentType|undefined = ComponentType[this.sourceMeta.exclude[index] as keyof typeof ComponentType];

				if (excludedType !== undefined && excludedType === type) return true;
			}
		}

		return false;
	}
}
