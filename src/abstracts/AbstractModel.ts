import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {App} from "obsidian";
import {SubModelFactory} from "../factories/SubModelFactory";
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
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";
import {EventV2Interface} from "../_dbV2/components/interfaces/EventV2Interface";
import {CampaignV2Interface} from "../_dbV2/components/interfaces/CampaignV2Interface";
import {SessionV2Interface} from "../_dbV2/components/interfaces/SessionV2Interface";
import {AdventureV2Interface} from "../_dbV2/components/interfaces/AdventureV2Interface";
import {ActV2Interface} from "../_dbV2/components/interfaces/ActV2Interface";
import {SceneV2Interface} from "../_dbV2/components/interfaces/SceneV2Interface";
import {RelationshipV2Interface} from "../_dbV2/relationships/interfaces/RelationshipV2Interface";
import {RelationshipV2Type} from "../_dbV2/relationships/enums/RelationshipV2Type";

export abstract class AbstractModel extends AbstractRpgManager implements ModelInterface {
	protected subModelFactory: SubModelFactory;
	protected response:ResponseDataInterface;
	protected subModelsMap: Map<ComponentType, any> = new Map<ComponentType, any>();
	protected componentSortingMap: Map<ComponentType, Array<SorterComparisonElementInterface>> = new Map<ComponentType, Array<SorterComparisonElementInterface>>();
	protected relationshipSortingMap: Map<ComponentType, Array<SorterComparisonElementInterface>> = new Map<ComponentType, Array<SorterComparisonElementInterface>>();

	constructor(
		app: App,
		protected currentElement: ComponentV2Interface,
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
		this.componentSortingMap.set(ComponentType.Event, [new SorterComparisonElement((component: EventV2Interface) => component.date)]);
		this.componentSortingMap.set(ComponentType.Campaign, [new SorterComparisonElement((component: CampaignV2Interface) => component.id.campaignId)]);
		this.componentSortingMap.set(ComponentType.Session, [
			new SorterComparisonElement((component: SessionV2Interface) => component.id.campaignId),
			new SorterComparisonElement((component: SessionV2Interface) => component.id.adventureId),
		]);
		this.componentSortingMap.set(ComponentType.Adventure, [
			new SorterComparisonElement((component: AdventureV2Interface) => component.id.campaignId),
			new SorterComparisonElement((component: AdventureV2Interface) => component.id.adventureId),
		]);
		this.componentSortingMap.set(ComponentType.Act, [
			new SorterComparisonElement((component: ActV2Interface) => component.id.campaignId),
			new SorterComparisonElement((component: ActV2Interface) => component.id.adventureId),
			new SorterComparisonElement((component: ActV2Interface) => component.id.actId),
		]);
		this.componentSortingMap.set(ComponentType.Scene, [
			new SorterComparisonElement((component: SceneV2Interface) => component.id.campaignId),
			new SorterComparisonElement((component: SceneV2Interface) => component.id.adventureId),
			new SorterComparisonElement((component: SceneV2Interface) => component.id.actId),
			new SorterComparisonElement((component: SceneV2Interface) => component.id.sceneId),
		]);


		this.relationshipSortingMap = new Map();
		this.relationshipSortingMap.set(ComponentType.Event, [new SorterComparisonElement((component: RelationshipV2Interface) => (<EventV2Interface>component.component).date)]);
		this.relationshipSortingMap.set(ComponentType.Campaign, [new SorterComparisonElement((component: RelationshipV2Interface) => (<CampaignV2Interface>component.component).id.campaignId)]);
		this.relationshipSortingMap.set(ComponentType.Session, [
			new SorterComparisonElement((component: RelationshipV2Interface) => (<SessionV2Interface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipV2Interface) => (<SessionV2Interface>component.component).id.adventureId),
		]);
		this.relationshipSortingMap.set(ComponentType.Adventure, [
			new SorterComparisonElement((component: RelationshipV2Interface) => (<AdventureV2Interface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipV2Interface) => (<AdventureV2Interface>component.component).id.adventureId),
		]);
		this.relationshipSortingMap.set(ComponentType.Act, [
			new SorterComparisonElement((component: RelationshipV2Interface) => (<ActV2Interface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipV2Interface) => (<ActV2Interface>component.component).id.adventureId),
			new SorterComparisonElement((component: RelationshipV2Interface) => (<ActV2Interface>component.component).id.actId),
		]);
		this.relationshipSortingMap.set(ComponentType.Scene, [
			new SorterComparisonElement((component: RelationshipV2Interface) => (<SceneV2Interface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipV2Interface) => (<SceneV2Interface>component.component).id.adventureId),
			new SorterComparisonElement((component: RelationshipV2Interface) => (<SceneV2Interface>component.component).id.actId),
			new SorterComparisonElement((component: RelationshipV2Interface) => (<SceneV2Interface>component.component).id.sceneId),
		]);
	}

	abstract generateData(
	): Promise<ResponseDataInterface>;

	protected async addList(
		type: ComponentType,
		data: ComponentV2Interface[],
		sortByLatestUsage = false,
	): Promise<void> {
		if (sortByLatestUsage){
			data
		}
		return await this.add(type, undefined, data, undefined, sortByLatestUsage);
	}

	protected async addRelationships(
		type: ComponentType,
		requiredRelationshipV2Type: RelationshipV2Type|undefined = RelationshipV2Type.Biunivocal,
		title: string|undefined=undefined,
	): Promise<void> {
		return await this.add(type, requiredRelationshipV2Type, undefined, title, false);
	}

	private async add(
		type: ComponentType,
		requiredRelationshipV2Type: RelationshipV2Type|undefined = RelationshipV2Type.Biunivocal,
		component: ComponentV2Interface[]|ComponentV2Interface|RelationshipV2Interface[]|undefined=undefined,
		title: string|undefined=undefined,
		sortByLatestUsage: boolean,
	): Promise<void>{
		if (!this.isExcluded(type)){
			const subModel = this.subModelsMap.get(type);
			if (component === undefined) component = this.currentElement.relationships.filter((relationships: RelationshipV2Interface) =>
				relationships.component !== undefined &&
				(requiredRelationshipV2Type & relationships.component.id.type) === relationships.component.id.type
			);

			if (ArrayHelper.isArray(component)) {
				let sorter: Array<any> | undefined = undefined;

				if ((<Array<any>>component)[0]?.component !== undefined) {
					if (sortByLatestUsage){
						sorter = [
							new SorterComparisonElement((relationship: RelationshipV2Interface) => (<ComponentV2Interface>relationship.component).file.stat.mtime, SorterType.Descending)
						];
					} else {
						sorter = this.relationshipSortingMap.get(type);
						if (sorter === undefined) sorter = [new SorterComparisonElement((relationship: RelationshipV2Interface) => (<ComponentV2Interface>relationship.component).file.basename)];
					}
				} else {
					if (sortByLatestUsage){
						sorter = [
							new SorterComparisonElement((component: ComponentV2Interface) => component.file.stat.mtime, SorterType.Descending)
						];
					} else {
						sorter = this.componentSortingMap.get(type);
						if (sorter === undefined) sorter = [new SorterComparisonElement((component: ComponentV2Interface) => component.file.basename)];
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
