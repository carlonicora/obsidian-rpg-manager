import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {App} from "obsidian";
import {ResponseData} from "../responses/ResponseData";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {ComponentType} from "../enums/ComponentType";
import {LocationTableSubModel} from "../models/subModels/tables/LocationTableSubModel";
import {FactionTableSubModel} from "../models/subModels/tables/FactionTableSubModel";
import {ClueTableSubModel} from "../models/subModels/tables/ClueTableSubModel";
import {EventTableSubModel} from "../models/subModels/tables/EventTableSubModel";
import {MusicTableSubModel} from "../models/subModels/tables/MusicTableSubModel";
import {CharacterTableSubModel} from "../models/subModels/tables/CharacterTableSubModel";
import {AdventureTableSubModel} from "../models/subModels/tables/AdventureTableSubModel";
import {ActTableSubModel} from "../models/subModels/tables/ActTableSubModel";
import {SceneTableSubModel} from "../models/subModels/tables/SceneTableSubModel";
import {SessionTableSubModel} from "../models/subModels/tables/SessionTableSubModel";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {SorterComparisonElementInterface} from "../interfaces/SorterComparisonElementInterface";
import {SubplotTableSubModel} from "../models/subModels/tables/SubplotTableSubModel";
import {NonPlayerCharacterTableSubModel} from "../models/subModels/tables/NonPlayerCharacterTableSubModel";
import {ArrayHelper} from "../helpers/ArrayHelper";
import {SorterType} from "../enums/SorterType";
import {ComponentInterface} from "../database/interfaces/ComponentInterface";
import {EventInterface} from "../database/components/interfaces/EventInterface";
import {CampaignInterface} from "../database/components/interfaces/CampaignInterface";
import {SessionInterface} from "../database/components/interfaces/SessionInterface";
import {AdventureInterface} from "../database/components/interfaces/AdventureInterface";
import {ActInterface} from "../database/components/interfaces/ActInterface";
import {SceneInterface} from "../database/components/interfaces/SceneInterface";
import {RelationshipInterface} from "../database/relationships/interfaces/RelationshipInterface";
import {RelationshipType} from "../database/relationships/enums/RelationshipType";

export abstract class AbstractModel extends AbstractRpgManager implements ModelInterface {
	protected response:ResponseDataInterface;
	protected subModelsMap: Map<ComponentType, any> = new Map<ComponentType, any>();
	protected componentSortingMap: Map<ComponentType, Array<SorterComparisonElementInterface>> = new Map<ComponentType, Array<SorterComparisonElementInterface>>();
	protected relationshipSortingMap: Map<ComponentType, Array<SorterComparisonElementInterface>> = new Map<ComponentType, Array<SorterComparisonElementInterface>>();

	constructor(
		app: App,
		protected currentElement: ComponentInterface,
		protected source: string,
		protected sourcePath: string,
		protected sourceMeta: any,
	) {
		super(app);
		this.currentElement.file.stat.mtime = Date.now();

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

		this.componentSortingMap = new Map();
		this.componentSortingMap.set(ComponentType.Event, [new SorterComparisonElement((component: EventInterface) => component.date)]);
		this.componentSortingMap.set(ComponentType.Campaign, [new SorterComparisonElement((component: CampaignInterface) => component.id.campaignId)]);
		this.componentSortingMap.set(ComponentType.Session, [
			new SorterComparisonElement((component: SessionInterface) => component.id.campaignId),
			new SorterComparisonElement((component: SessionInterface) => component.id.adventureId),
		]);
		this.componentSortingMap.set(ComponentType.Adventure, [
			new SorterComparisonElement((component: AdventureInterface) => component.id.campaignId),
			new SorterComparisonElement((component: AdventureInterface) => component.id.adventureId),
		]);
		this.componentSortingMap.set(ComponentType.Act, [
			new SorterComparisonElement((component: ActInterface) => component.id.campaignId),
			new SorterComparisonElement((component: ActInterface) => component.id.adventureId),
			new SorterComparisonElement((component: ActInterface) => component.id.actId),
		]);
		this.componentSortingMap.set(ComponentType.Scene, [
			new SorterComparisonElement((component: SceneInterface) => component.id.campaignId),
			new SorterComparisonElement((component: SceneInterface) => component.id.adventureId),
			new SorterComparisonElement((component: SceneInterface) => component.id.actId),
			new SorterComparisonElement((component: SceneInterface) => component.id.sceneId),
		]);


		this.relationshipSortingMap = new Map();
		this.relationshipSortingMap.set(ComponentType.Event, [new SorterComparisonElement((component: RelationshipInterface) => (<EventInterface>component.component).date)]);
		this.relationshipSortingMap.set(ComponentType.Campaign, [new SorterComparisonElement((component: RelationshipInterface) => (<CampaignInterface>component.component).id.campaignId)]);
		this.relationshipSortingMap.set(ComponentType.Session, [
			new SorterComparisonElement((component: RelationshipInterface) => (<SessionInterface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipInterface) => (<SessionInterface>component.component).id.adventureId),
		]);
		this.relationshipSortingMap.set(ComponentType.Adventure, [
			new SorterComparisonElement((component: RelationshipInterface) => (<AdventureInterface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipInterface) => (<AdventureInterface>component.component).id.adventureId),
		]);
		this.relationshipSortingMap.set(ComponentType.Act, [
			new SorterComparisonElement((component: RelationshipInterface) => (<ActInterface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipInterface) => (<ActInterface>component.component).id.adventureId),
			new SorterComparisonElement((component: RelationshipInterface) => (<ActInterface>component.component).id.actId),
		]);
		this.relationshipSortingMap.set(ComponentType.Scene, [
			new SorterComparisonElement((component: RelationshipInterface) => (<SceneInterface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipInterface) => (<SceneInterface>component.component).id.adventureId),
			new SorterComparisonElement((component: RelationshipInterface) => (<SceneInterface>component.component).id.actId),
			new SorterComparisonElement((component: RelationshipInterface) => (<SceneInterface>component.component).id.sceneId),
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
		requiredRelationshipType: RelationshipType|undefined = RelationshipType.Biunivocal,
		title: string|undefined=undefined,
		sortByLatestUsage = false,
	): Promise<void> {
		return await this.add(type, requiredRelationshipType, undefined, title, sortByLatestUsage);
	}

	private async add(
		type: ComponentType,
		requiredRelationshipType: RelationshipType|undefined = undefined,
		component: ComponentInterface[]|ComponentInterface|RelationshipInterface[]|undefined=undefined,
		title: string|undefined=undefined,
		sortByLatestUsage: boolean,
	): Promise<void>{
		if (!this.isExcluded(type)){
			const subModel = this.subModelsMap.get(type);
			if (component === undefined) {
				component = this.currentElement.getRelationships().filter((relationship: RelationshipInterface) =>
					relationship.component !== undefined &&
					relationship.component.id.type === type &&
					(requiredRelationshipType === undefined || (requiredRelationshipType & relationship.type) === relationship.type)
				);
			}

			if (ArrayHelper.isArray(component)) {
				let sorter: Array<any> | undefined = undefined;

				if ((<Array<any>>component)[0]?.component !== undefined) {
					if (sortByLatestUsage){
						sorter = [
							new SorterComparisonElement((relationship: RelationshipInterface) => (<ComponentInterface>relationship.component).file.stat.mtime, SorterType.Descending)
						];
					} else {
						sorter = this.relationshipSortingMap.get(type);
						if (sorter === undefined) sorter = [new SorterComparisonElement((relationship: RelationshipInterface) => (<ComponentInterface>relationship.component).file.basename)];
					}
				} else {
					if (sortByLatestUsage){
						sorter = [
							new SorterComparisonElement((component: ComponentInterface) => component.file.stat.mtime, SorterType.Descending)
						];
					} else {
						sorter = this.componentSortingMap.get(type);
						if (sorter === undefined) sorter = [new SorterComparisonElement((component: ComponentInterface) => component.file.basename)];
					}
				}

				if (sorter !== undefined) component = (<Array<any>>component).sort(this.factories.sorter.create<any>(sorter))
			}


			if (subModel !== undefined) {
				await this.response.addSubModel(
					subModel,
					this.currentElement,
					component,
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
