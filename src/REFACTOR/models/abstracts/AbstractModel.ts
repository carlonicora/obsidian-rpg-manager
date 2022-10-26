import {ResponseDataInterface} from "../../../responses/interfaces/ResponseDataInterface";
import {OldModelInterface} from "../interfaces/OldModelInterface";
import {App} from "obsidian";
import {ResponseData} from "../../../responses/ResponseData";
import {AbstractRpgManager} from "../../../core/abstracts/AbstractRpgManager";
import {ComponentType} from "../../../core/enums/ComponentType";
import {LocationTableSubModel} from "../../../components/location/models/LocationTableSubModel";
import {FactionTableSubModel} from "../../../components/faction/models/FactionTableSubModel";
import {ClueTableSubModel} from "../../../components/clue/models/ClueTableSubModel";
import {EventTableSubModel} from "../../../components/event/models/EventTableSubModel";
import {MusicTableSubModel} from "../../../components/music/models/MusicTableSubModel";
import {CharacterTableSubModel} from "../../../components/character/models/CharacterTableSubModel";
import {AdventureTableSubModel} from "../../../components/adventure/models/AdventureTableSubModel";
import {ActTableSubModel} from "../../../components/act/models/ActTableSubModel";
import {SceneTableSubModel} from "../../../components/scene/models/SceneTableSubModel";
import {SessionTableSubModel} from "../../../components/session/models/SessionTableSubModel";
import {SorterComparisonElement} from "../../../database/SorterComparisonElement";
import {SorterComparisonElementInterface} from "../../../database/interfaces/SorterComparisonElementInterface";
import {SubplotTableSubModel} from "../../../components/subplot/models/SubplotTableSubModel";
import {NonPlayerCharacterTableSubModel} from "../../../components/character/models/NonPlayerCharacterTableSubModel";
import {SorterType} from "../../../database/enums/SorterType";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {EventInterface} from "../../../components/event/interfaces/EventInterface";
import {CampaignInterface} from "../../../components/campaign/interfaces/CampaignInterface";
import {SessionInterface} from "../../../components/session/interfaces/SessionInterface";
import {AdventureInterface} from "../../../components/adventure/interfaces/AdventureInterface";
import {ActInterface} from "../../../components/act/interfaces/ActInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {RelationshipType} from "../../../services/relationshipsService/enums/RelationshipType";

export abstract class AbstractModel extends AbstractRpgManager implements OldModelInterface {
	protected response:ResponseDataInterface;
	protected subModelsMap: Map<ComponentType, any> = new Map<ComponentType, any>();
	protected componentSortingMap: Map<ComponentType, SorterComparisonElementInterface[]> = new Map<ComponentType, SorterComparisonElementInterface[]>();
	protected relationshipSortingMap: Map<ComponentType, SorterComparisonElementInterface[]> = new Map<ComponentType, SorterComparisonElementInterface[]>();

	constructor(
		app: App,
		protected currentComponent: ModelInterface,
		protected source: string,
		protected sourcePath: string,
		protected sourceMeta: any,
	) {
		super(app);
		this.currentComponent.file.stat.mtime = Date.now();

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
		data: ModelInterface[],
		sortByLatestUsage = false,
	): Promise<void> {
		if (sortByLatestUsage){
			data
		}
		return await this._add(type, undefined, data, undefined, sortByLatestUsage);
	}

	protected async addRelationships(
		type: ComponentType,
		requiredRelationshipType: RelationshipType|undefined=undefined,
		title: string|undefined=undefined,
		sortByLatestUsage = false,
	): Promise<void> {
		return await this._add(type, requiredRelationshipType, undefined, title, sortByLatestUsage);
	}

	private async _add(
		type: ComponentType,
		requiredRelationshipType: RelationshipType|undefined,
		component: ModelInterface[]|ModelInterface|RelationshipInterface[]|undefined=undefined,
		title: string|undefined=undefined,
		sortByLatestUsage: boolean,
	): Promise<void>{
		if (requiredRelationshipType === undefined) requiredRelationshipType = RelationshipType.Reversed | RelationshipType.Bidirectional | RelationshipType.Unidirectional;
		if (requiredRelationshipType === RelationshipType.Unidirectional) requiredRelationshipType = RelationshipType.Unidirectional | RelationshipType.Bidirectional;

		const subModel = this.subModelsMap.get(type);
		if (component === undefined) {
			component = this.currentComponent.getRelationships().filter((relationship: RelationshipInterface) =>
				relationship.component !== undefined &&
				relationship.component.id.type === type &&
				(requiredRelationshipType === undefined || (requiredRelationshipType & relationship.type) === relationship.type)
			);
		}

		if (Array.isArray(component)) {
			let sorter: any[] | undefined = undefined;

			if ((<any[]>component)[0]?.component !== undefined) {
				if (sortByLatestUsage){
					sorter = [
						new SorterComparisonElement((relationship: RelationshipInterface) => (<ModelInterface>relationship.component).file.stat.mtime, SorterType.Descending)
					];
				} else {
					sorter = this.relationshipSortingMap.get(type);
					if (sorter === undefined) sorter = [new SorterComparisonElement((relationship: RelationshipInterface) => (<ModelInterface>relationship.component).file.basename)];
				}
			} else {
				if (sortByLatestUsage){
					sorter = [
						new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending)
					];
				} else {
					sorter = this.componentSortingMap.get(type);
					if (sorter === undefined) sorter = [new SorterComparisonElement((component: ModelInterface) => component.file.basename)];
				}
			}

			if (sorter !== undefined) component = (<any[]>component).sort(this.factories.sorter.create<any>(sorter))
		}


		if (subModel !== undefined) {
			await this.response.addSubModel(
				subModel,
				this.currentComponent,
				component,
				title,
			);
		}
	}
}
