import {App} from "obsidian";
import {SubModelFactory} from "../models/factories/SubModelFactory";
import {ContentFactory} from "../responses/factories/ContentFactory";
import {FileFactory} from "../templates/factories/FileFactory";
import {ModalFactory} from "../modals/factories/ModalFactory";
import {ModelFactory} from "../models/factories/ModelFactory";
import {PronounFactory} from "../databases/factories/PronounFactory";
import {TemplateFactory} from "../templates/factories/TemplateFactory";
import {ViewFactory} from "../views/factories/ViewFactory";
import {FetcherFactory} from "../fetchers/factories/FetcherFactory";
import {SubModelFactoryInterface} from "../models/factories/interfaces/SubModelFactoryInterface";
import {ContentFactoryInterface} from "../responses/factories/interfaces/ContentFactoryInterface";
import {FileFactoryInterface} from "../templates/factories/interfaces/FileFactoryInterface";
import {ModalFactoryInterface} from "../modals/factories/interfaces/ModalFactoryInterface";
import {ModelFactoryInterface} from "../models/factories/interfaces/ModelFactoryInterface";
import {PronounFactoryInterface} from "../databases/factories/interfaces/PronounFactoryInterface";
import {TemplateFactoryInterface} from "../templates/factories/interfaces/TemplateFactoryInterface";
import {ViewFactoryInterface} from "../views/factories/interfaces/ViewFactoryInterface";
import {FetcherFactoryInterface} from "../fetchers/factories/interfaces/FetcherFactoryInterface";
import {FactoriesInterface} from "./interfaces/FactoriesInterface";
import {IdFactoryInterface} from "../databases/factories/interfaces/IdFactoryInterface";
import {IdFactory} from "../databases/factories/IdFactory";
import {BreadcrumbFactoryInterface} from "../views/factories/interfaces/BreadcrumbFactoryInterface";
import {BreadcrumbFactory} from "../views/factories/BreadcrumbFactory";
import {SorterFactoryInterface} from "../databases/factories/interfaces/SorterFactoryInterface";
import {SorterFactory} from "../databases/factories/SorterFactory";
import {RunningTimeManagerInterface} from "../timers/interfaces/RunningTimeManagerInterface";
import {RunningTimeManager} from "../timers/RunningTimeManager";
import {DatabaseFactoryInterface} from "../databases/factories/interfaces/DatabaseFactoryInterface";
import {DatabaseFactory} from "../databases/factories/DatabaseFactory";
import {ComponentFactoryInterface} from "../databases/factories/interfaces/ComponentFactoryInterface";
import {ComponentFactory} from "../databases/factories/ComponentFactory";
import {ComponentTypeFactoryInterface} from "../databases/factories/interfaces/ComponentTypeFactoryInterface";
import {ComponentTypeFactory} from "../databases/factories/ComponentTypeFactory";
import {RelationshipTypeFactoryInterface} from "../relationships/factories/interfaces/RelationshipTypeFactoryInterface";
import {RelationshipTypeFactory} from "../relationships/factories/RelationshipTypeFactory";
import {SceneTypeFactoryInterface} from "../databases/factories/interfaces/SceneTypeFactoryInterface";
import {SceneTypeFactory} from "../databases/factories/SceneTypeFactory";
import {StoryCircleStageFactoryInterface} from "../plots/factories/interfaces/StoryCircleStageFactoryInterface";
import {StoryCircleStageFactory} from "../plots/factories/StoryCircleStageFactory";
import {AbtStageFactoryInterface} from "../plots/factories/interfaces/AbtStageFactoryInterface";
import {AbtStageFactory} from "../plots/factories/AbtStageFactory";
import {RelationshipFactoryInterface} from "../relationships/factories/interfaces/RelationshipFactoryInterface";
import {RelationshipFactory} from "../relationships/factories/RelationshipFactory";

export class Factories implements FactoriesInterface{
	public subModels: SubModelFactoryInterface;
	public contents: ContentFactoryInterface;
	public component: ComponentFactoryInterface;
	public files: FileFactoryInterface;
	public modals: ModalFactoryInterface;
	public models: ModelFactoryInterface;
	public pronouns: PronounFactoryInterface;
	public templates: TemplateFactoryInterface;
	public views: ViewFactoryInterface;
	public fetchers: FetcherFactoryInterface;
	public database: DatabaseFactoryInterface;
	public id: IdFactoryInterface;
	public breadcrumb: BreadcrumbFactoryInterface;
	public sorter: SorterFactoryInterface;
	public runningTimeManager: RunningTimeManagerInterface;
	public componentType: ComponentTypeFactoryInterface;
	public relationshipType: RelationshipTypeFactoryInterface;
	public sceneType: SceneTypeFactoryInterface;
	public storyCircleStage: StoryCircleStageFactoryInterface;
	public abtStage: AbtStageFactoryInterface;
	public relationship: RelationshipFactoryInterface;

	constructor(
		private app: App,
	) {
		this.subModels = new SubModelFactory(this.app);
		this.contents = new ContentFactory(this.app);
		this.component = new ComponentFactory(this.app);
		this.files = new FileFactory(this.app);
		this.modals = new ModalFactory(this.app);
		this.models = new ModelFactory(this.app);
		this.pronouns = new PronounFactory(this.app);
		this.templates = new TemplateFactory(this.app);
		this.views = new ViewFactory(this.app);
		this.fetchers = new FetcherFactory(this.app);
		this.database = new DatabaseFactory(this.app);
		this.id = new IdFactory(this.app);
		this.breadcrumb = new BreadcrumbFactory(this.app);
		this.sorter = new SorterFactory(this.app);
		this.componentType = new ComponentTypeFactory(this.app);
		this.relationshipType = new RelationshipTypeFactory(this.app);
		this.sceneType = new SceneTypeFactory(this.app);
		this.storyCircleStage = new StoryCircleStageFactory(this.app);
		this.abtStage = new AbtStageFactory(this.app);
		this.relationship = new RelationshipFactory(this.app);

		this.runningTimeManager = new RunningTimeManager(this.app);
	}
}
