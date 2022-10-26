import {App} from "obsidian";
import {SubModelFactory} from "../../REFACTOR/models/factories/SubModelFactory";
import {ContentFactory} from "../../responses/factories/ContentFactory";
import {FileFactory} from "./FileFactory";
import {ModalFactory} from "./ModalFactory";
import {ModelFactory} from "../../REFACTOR/models/factories/ModelFactory";
import {PronounFactory} from "../../components/character/factories/PronounFactory";
import {TemplateFactory} from "./TemplateFactory";
import {ViewFactory} from "../../REFACTOR/views/factories/ViewFactory";
import {FetcherFactory} from "../../services/fetchers/factories/FetcherFactory";
import {SubModelFactoryInterface} from "../../REFACTOR/models/factories/interfaces/SubModelFactoryInterface";
import {ContentFactoryInterface} from "../../responses/factories/interfaces/ContentFactoryInterface";
import {FileFactoryInterface} from "../interfaces/FileFactoryInterface";
import {ModalFactoryInterface} from "../interfaces/ModalFactoryInterface";
import {ModelFactoryInterface} from "../../REFACTOR/models/factories/interfaces/ModelFactoryInterface";
import {PronounFactoryInterface} from "../../components/character/factories/interfaces/PronounFactoryInterface";
import {TemplateFactoryInterface} from "../interfaces/TemplateFactoryInterface";
import {ViewFactoryInterface} from "../../REFACTOR/views/factories/interfaces/ViewFactoryInterface";
import {FetcherFactoryInterface} from "../../services/fetchers/factories/interfaces/FetcherFactoryInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {IdFactoryInterface} from "../../services/id/factories/interfaces/IdFactoryInterface";
import {IdFactory} from "../../services/id/factories/IdFactory";
import {BreadcrumbFactoryInterface} from "../../services/breadcrumb/interfaces/BreadcrumbFactoryInterface";
import {BreadcrumbFactory} from "../../services/breadcrumb/factories/BreadcrumbFactory";
import {SorterFactoryInterface} from "../../database/factories/interfaces/SorterFactoryInterface";
import {SorterFactory} from "../../database/factories/SorterFactory";
import {RunningTimeServiceInterface} from "../../services/runningTimeService/interfaces/RunningTimeServiceInterface";
import {RunningTimeService} from "../../services/runningTimeService/RunningTimeService";
import {DatabaseFactoryInterface} from "../../database/factories/interfaces/DatabaseFactoryInterface";
import {DatabaseFactory} from "../../database/factories/DatabaseFactory";
import {ComponentFactoryInterface} from "../interfaces/ComponentFactoryInterface";
import {ComponentFactory} from "./ComponentFactory";
import {ComponentTypeFactoryInterface} from "../interfaces/ComponentTypeFactoryInterface";
import {ComponentTypeFactory} from "./ComponentTypeFactory";
import {RelationshipTypeFactoryInterface} from "../../services/relationshipsService/factories/interfaces/RelationshipTypeFactoryInterface";
import {RelationshipTypeFactory} from "../../services/relationshipsService/factories/RelationshipTypeFactory";
import {SceneTypeFactoryInterface} from "../../components/scene/factory/interfaces/SceneTypeFactoryInterface";
import {SceneTypeFactory} from "../../components/scene/factory/SceneTypeFactory";
import {StoryCircleStageFactoryInterface} from "../../services/plots/factories/interfaces/StoryCircleStageFactoryInterface";
import {StoryCircleStageFactory} from "../../services/plots/factories/StoryCircleStageFactory";
import {AbtStageFactoryInterface} from "../../services/plots/factories/interfaces/AbtStageFactoryInterface";
import {AbtStageFactory} from "../../services/plots/factories/AbtStageFactory";
import {RelationshipFactoryInterface} from "../../services/relationshipsService/factories/interfaces/RelationshipFactoryInterface";
import {RelationshipFactory} from "../../services/relationshipsService/factories/RelationshipFactory";
import {FileManipulatorFactoryInterface} from "../../services/manipulators/factories/interfaces/FileManipulatorFactoryInterface";
import {FileManipulatorFactory} from "../../services/manipulators/factories/FileManipulatorFactory";
import {LogFactoryInterface} from "../../services/loggers/interfaces/LogFactoryInterface";
import {LogFactory} from "../../services/loggers/factories/LogFactory";
import {LogWriterType} from "../../services/loggers/enums/LogWriterType";
import {AnalyserFactoryInterface} from "../../services/analyser/factories/interfaces/AnalyserFactoryInterface";
import {AnalyserFactory} from "../../services/analyser/factories/AnalyserFactory";
import {ImageFactoryInterface} from "../../services/galleryService/interfaces/ImageFactoryInterface";
import {ImageFactory} from "../../services/galleryService/factories/ImageFactory";
import {GalleryViewFactoryInterface} from "../../services/galleryService/interfaces/GalleryViewFactoryInterface";
import {GalleryViewFactory} from "../../services/galleryService/factories/GalleryViewFactory";
import {EditableContentFactoryInterface} from "../../services/contentEditor/interfaces/EditableContentFactoryInterface";
import {EditableContentFactory} from "../../services/contentEditor/factories/EditableContentFactory";
import {
	EditableContentTypeFactoryInterface
} from "../../services/contentEditor/interfaces/EditableContentTypeFactoryInterface";
import {EditableContentTypeFactory} from "../../services/contentEditor/factories/EditableContentTypeFactory";
import {
	EditableContentValueFactoryInterface
} from "../../services/contentEditor/interfaces/EditableContentValueFactoryInterface";
import {EditableContentValueFactory} from "../../services/contentEditor/factories/EditableContentValueFactory";

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
	public runningTimeManager: RunningTimeServiceInterface;
	public componentType: ComponentTypeFactoryInterface;
	public relationshipType: RelationshipTypeFactoryInterface;
	public sceneType: SceneTypeFactoryInterface;
	public storyCircleStage: StoryCircleStageFactoryInterface;
	public abtStage: AbtStageFactoryInterface;
	public relationship: RelationshipFactoryInterface;
	public logger: LogFactoryInterface;
	public fileManipulator: FileManipulatorFactoryInterface;
	public analyser: AnalyserFactoryInterface;
	public image: ImageFactoryInterface;
	public imageView: GalleryViewFactoryInterface;
	public editableContent: EditableContentFactoryInterface;
	public editableContentField: EditableContentTypeFactoryInterface;
	public editableContentValue: EditableContentValueFactoryInterface;

	constructor(
		private _app: App,
	) {
		this.subModels = new SubModelFactory(this._app);
		this.contents = new ContentFactory(this._app);
		this.component = new ComponentFactory(this._app);
		this.files = new FileFactory(this._app);
		this.modals = new ModalFactory(this._app);
		this.models = new ModelFactory(this._app);
		this.pronouns = new PronounFactory(this._app);
		this.templates = new TemplateFactory(this._app);
		this.views = new ViewFactory(this._app);
		this.fetchers = new FetcherFactory(this._app);
		this.database = new DatabaseFactory(this._app);
		this.id = new IdFactory(this._app);
		this.breadcrumb = new BreadcrumbFactory(this._app);
		this.sorter = new SorterFactory(this._app);
		this.componentType = new ComponentTypeFactory(this._app);
		this.relationshipType = new RelationshipTypeFactory(this._app);
		this.sceneType = new SceneTypeFactory(this._app);
		this.storyCircleStage = new StoryCircleStageFactory(this._app);
		this.abtStage = new AbtStageFactory(this._app);
		this.relationship = new RelationshipFactory(this._app);
		this.logger = new LogFactory(this._app, LogWriterType.Console);
		this.fileManipulator = new FileManipulatorFactory(this._app);
		this.analyser = new AnalyserFactory(this._app);
		this.image = new ImageFactory(this._app);
		this.imageView = new GalleryViewFactory(this._app);
		this.editableContent = new EditableContentFactory(this._app);
		this.editableContentField = new EditableContentTypeFactory(this._app);
		this.editableContentValue = new EditableContentValueFactory(this._app);

		this.runningTimeManager = new RunningTimeService(this._app);
	}
}
