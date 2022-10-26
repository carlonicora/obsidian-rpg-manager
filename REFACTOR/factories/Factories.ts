import {App} from "obsidian";
import {SubModelFactory} from "../models/factories/SubModelFactory";
import {ContentFactory} from "../responses/factories/ContentFactory";
import {FileCreationService} from "../../src/services/fileCreationService/FileCreationService";
import {ModalFactory} from "./ModalFactory";
import {ModelFactory} from "../models/factories/ModelFactory";
import {PronounService} from "../../src/services/pronounService/PronounService";
import {TemplateFactory} from "./TemplateFactory";
import {ViewFactory} from "../views/factories/ViewFactory";
import {FetcherFactory} from "../services/fetchers/factories/FetcherFactory";
import {SubModelFactoryInterface} from "../models/factories/interfaces/SubModelFactoryInterface";
import {ContentFactoryInterface} from "../responses/factories/interfaces/ContentFactoryInterface";
import {FileCreationServiceInterface} from "../../src/services/fileCreationService/interfaces/FileCreationServiceInterface";
import {ModalFactoryInterface} from "../../src/core/interfaces/ModalFactoryInterface";
import {ModelFactoryInterface} from "../models/factories/interfaces/ModelFactoryInterface";
import {PronounServiceInterface} from "../../src/services/pronounService/interfaces/PronounServiceInterface";
import {TemplateFactoryInterface} from "../../src/core/interfaces/TemplateFactoryInterface";
import {ViewFactoryInterface} from "../views/factories/interfaces/ViewFactoryInterface";
import {FetcherFactoryInterface} from "../services/fetchers/factories/interfaces/FetcherFactoryInterface";
import {FactoriesInterface} from "../../src/core/interfaces/FactoriesInterface";
import {IdServiceInterface} from "../../src/services/idService/interfaces/IdServiceInterface";
import {IdService} from "../../src/services/idService/IdService";
import {BreadcrumbFactoryInterface} from "../../src/services/breadcrumbService/interfaces/BreadcrumbFactoryInterface";
import {BreadcrumbFactory} from "../../src/services/breadcrumbService/factories/BreadcrumbFactory";
import {SorterFactoryInterface} from "../../src/database/factories/interfaces/SorterFactoryInterface";
import {SorterFactory} from "../../src/database/factories/SorterFactory";
import {RunningTimeServiceInterface} from "../../src/services/runningTimeService/interfaces/RunningTimeServiceInterface";
import {RunningTimeService} from "../../src/services/runningTimeService/RunningTimeService";
import {DatabaseFactoryInterface} from "../../src/database/factories/interfaces/DatabaseFactoryInterface";
import {DatabaseFactory} from "../../src/database/factories/DatabaseFactory";
import {ComponentFactoryInterface} from "../../src/core/interfaces/ComponentFactoryInterface";
import {ComponentFactory} from "./ComponentFactory";
import {ComponentTypeFactoryInterface} from "../../src/core/interfaces/ComponentTypeFactoryInterface";
import {ComponentTypeFactory} from "./ComponentTypeFactory";
import {RelationshipTypeFactoryInterface} from "../../services/relationshipsService/factories/interfaces/RelationshipTypeFactoryInterface";
import {RelationshipTypeFactory} from "../../services/relationshipsService/factories/RelationshipTypeFactory";
import {SceneTypeFactoryInterface} from "../../src/components/scene/factory/interfaces/SceneTypeFactoryInterface";
import {SceneTypeFactory} from "../../src/components/scene/factory/SceneTypeFactory";
import {StoryCircleStageFactoryInterface} from "../../src/services/plotsServices/factories/interfaces/StoryCircleStageFactoryInterface";
import {StoryCircleStageFactory} from "../../src/services/plotsServices/factories/StoryCircleStageFactory";
import {AbtStageFactoryInterface} from "../../src/services/plotsServices/factories/interfaces/AbtStageFactoryInterface";
import {AbtStageFactory} from "../../src/services/plotsServices/factories/AbtStageFactory";
import {RelationshipFactoryInterface} from "../../services/relationshipsService/factories/interfaces/RelationshipFactoryInterface";
import {RelationshipFactory} from "../../services/relationshipsService/factories/RelationshipFactory";
import {FileManipulatorFactoryInterface} from "../services/manipulators/factories/interfaces/FileManipulatorFactoryInterface";
import {FileManipulatorFactory} from "../services/manipulators/factories/FileManipulatorFactory";
import {LogFactoryInterface} from "../services/loggers/interfaces/LogFactoryInterface";
import {LogFactory} from "../services/loggers/factories/LogFactory";
import {LogWriterType} from "../services/loggers/enums/LogWriterType";
import {AnalyserFactoryInterface} from "../services/analyser/factories/interfaces/AnalyserFactoryInterface";
import {AnalyserFactory} from "../services/analyser/factories/AnalyserFactory";
import {ImageFactoryInterface} from "../../services/galleryService/interfaces/ImageFactoryInterface";
import {ImageFactory} from "../../services/galleryService/factories/ImageFactory";
import {GalleryViewFactoryInterface} from "../../src/services/galleryService/interfaces/GalleryViewFactoryInterface";
import {GalleryViewFactory} from "../../src/services/galleryService/factories/GalleryViewFactory";
import {EditableContentFactoryInterface} from "../services/contentEditor/interfaces/EditableContentFactoryInterface";
import {EditableContentFactory} from "../services/contentEditor/factories/EditableContentFactory";
import {
	EditableContentTypeFactoryInterface
} from "../services/contentEditor/interfaces/EditableContentTypeFactoryInterface";
import {EditableContentTypeFactory} from "../services/contentEditor/factories/EditableContentTypeFactory";
import {
	EditableContentValueFactoryInterface
} from "../services/contentEditor/interfaces/EditableContentValueFactoryInterface";
import {EditableContentValueFactory} from "../services/contentEditor/factories/EditableContentValueFactory";

export class Factories implements FactoriesInterface{
	public subModels: SubModelFactoryInterface;
	public contents: ContentFactoryInterface;
	public component: ComponentFactoryInterface;
	public files: FileCreationServiceInterface;
	public modals: ModalFactoryInterface;
	public models: ModelFactoryInterface;
	public pronouns: PronounServiceInterface;
	public templates: TemplateFactoryInterface;
	public views: ViewFactoryInterface;
	public fetchers: FetcherFactoryInterface;
	public database: DatabaseFactoryInterface;
	public id: IdServiceInterface;
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
		this.files = new FileCreationService(this._app);
		this.modals = new ModalFactory(this._app);
		this.models = new ModelFactory(this._app);
		this.pronouns = new PronounService(this._app);
		this.templates = new TemplateFactory(this._app);
		this.views = new ViewFactory(this._app);
		this.fetchers = new FetcherFactory(this._app);
		this.database = new DatabaseFactory(this._app);
		this.id = new IdService(this._app);
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
