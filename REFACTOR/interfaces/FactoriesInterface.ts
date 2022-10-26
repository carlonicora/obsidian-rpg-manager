import {SubModelFactoryInterface} from "../models/factories/interfaces/SubModelFactoryInterface";
import {ContentFactoryInterface} from "../responses/factories/interfaces/ContentFactoryInterface";
import {FileCreationServiceInterface} from "../../src/services/fileCreationService/interfaces/FileCreationServiceInterface";
import {ModalFactoryInterface} from "../../src/core/interfaces/ModalFactoryInterface";
import {ModelFactoryInterface} from "../models/factories/interfaces/ModelFactoryInterface";
import {PronounServiceInterface} from "../../src/services/pronounService/interfaces/PronounServiceInterface";
import {TemplateFactoryInterface} from "../../src/core/interfaces/TemplateFactoryInterface";
import {ViewFactoryInterface} from "../views/factories/interfaces/ViewFactoryInterface";
import {FetcherFactoryInterface} from "../services/fetchers/factories/interfaces/FetcherFactoryInterface";
import {IdServiceInterface} from "../../src/services/idService/interfaces/IdServiceInterface";
import {BreadcrumbFactoryInterface} from "../../src/services/breadcrumbService/interfaces/BreadcrumbFactoryInterface";
import {SorterFactoryInterface} from "../../src/database/factories/interfaces/SorterFactoryInterface";
import {RunningTimeServiceInterface} from "../../src/services/runningTimeService/interfaces/RunningTimeServiceInterface";
import {DatabaseFactoryInterface} from "../../src/database/factories/interfaces/DatabaseFactoryInterface";
import {ComponentFactoryInterface} from "./ComponentFactoryInterface";
import {ComponentTypeFactoryInterface} from "../../src/core/interfaces/ComponentTypeFactoryInterface";
import {RelationshipTypeFactoryInterface} from "../../services/relationshipsService/factories/interfaces/RelationshipTypeFactoryInterface";
import {SceneTypeFactoryInterface} from "../../src/components/scene/factory/interfaces/SceneTypeFactoryInterface";
import {StoryCircleStageFactoryInterface} from "../../src/services/plotsServices/factories/interfaces/StoryCircleStageFactoryInterface";
import {AbtStageFactoryInterface} from "../../src/services/plotsServices/factories/interfaces/AbtStageFactoryInterface";
import {RelationshipFactoryInterface} from "../../services/relationshipsService/factories/interfaces/RelationshipFactoryInterface";
import {FileManipulatorFactoryInterface} from "../services/manipulators/factories/interfaces/FileManipulatorFactoryInterface";
import {LogFactoryInterface} from "../services/loggers/interfaces/LogFactoryInterface";
import {AnalyserFactoryInterface} from "../services/analyser/factories/interfaces/AnalyserFactoryInterface";
import {ImageFactoryInterface} from "../../services/galleryService/interfaces/ImageFactoryInterface";
import {GalleryViewFactoryInterface} from "../../src/services/galleryService/interfaces/GalleryViewFactoryInterface";
import {EditableContentFactoryInterface} from "../services/contentEditor/interfaces/EditableContentFactoryInterface";
import {
	EditableContentTypeFactoryInterface
} from "../services/contentEditor/interfaces/EditableContentTypeFactoryInterface";
import {
	EditableContentValueFactoryInterface
} from "../services/contentEditor/interfaces/EditableContentValueFactoryInterface";

export interface FactoriesInterface {
	subModels: SubModelFactoryInterface;
	contents: ContentFactoryInterface;
	component: ComponentFactoryInterface;
	files: FileCreationServiceInterface;
	modals: ModalFactoryInterface;
	models: ModelFactoryInterface;
	pronouns: PronounServiceInterface;
	templates: TemplateFactoryInterface;
	views: ViewFactoryInterface;
	fetchers: FetcherFactoryInterface;
	database: DatabaseFactoryInterface;
	id: IdServiceInterface;
	breadcrumb: BreadcrumbFactoryInterface;
	sorter: SorterFactoryInterface;
	componentType: ComponentTypeFactoryInterface;
	relationshipType: RelationshipTypeFactoryInterface;
	sceneType: SceneTypeFactoryInterface;
	storyCircleStage: StoryCircleStageFactoryInterface;
	abtStage: AbtStageFactoryInterface;
	relationship: RelationshipFactoryInterface;
	logger: LogFactoryInterface;
	fileManipulator: FileManipulatorFactoryInterface;
	analyser: AnalyserFactoryInterface;
	image: ImageFactoryInterface;
	imageView: GalleryViewFactoryInterface;
	editableContent: EditableContentFactoryInterface;
	editableContentField: EditableContentTypeFactoryInterface;
	editableContentValue: EditableContentValueFactoryInterface;

	runningTimeManager: RunningTimeServiceInterface;
}
