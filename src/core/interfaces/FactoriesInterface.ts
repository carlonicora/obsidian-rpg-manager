import {SubModelFactoryInterface} from "../../REFACTOR/models/factories/interfaces/SubModelFactoryInterface";
import {ContentFactoryInterface} from "../../responses/factories/interfaces/ContentFactoryInterface";
import {FileFactoryInterface} from "./FileFactoryInterface";
import {ModalFactoryInterface} from "./ModalFactoryInterface";
import {ModelFactoryInterface} from "../../REFACTOR/models/factories/interfaces/ModelFactoryInterface";
import {PronounFactoryInterface} from "../../components/character/factories/interfaces/PronounFactoryInterface";
import {TemplateFactoryInterface} from "./TemplateFactoryInterface";
import {ViewFactoryInterface} from "../../REFACTOR/views/factories/interfaces/ViewFactoryInterface";
import {FetcherFactoryInterface} from "../../services/fetchers/factories/interfaces/FetcherFactoryInterface";
import {IdFactoryInterface} from "../../services/id/factories/interfaces/IdFactoryInterface";
import {BreadcrumbFactoryInterface} from "../../REFACTOR/views/factories/interfaces/BreadcrumbFactoryInterface";
import {SorterFactoryInterface} from "../../database/factories/interfaces/SorterFactoryInterface";
import {RunningTimeManagerInterface} from "../../services/timers/interfaces/RunningTimeManagerInterface";
import {DatabaseFactoryInterface} from "../../database/factories/interfaces/DatabaseFactoryInterface";
import {ComponentFactoryInterface} from "./ComponentFactoryInterface";
import {ComponentTypeFactoryInterface} from "./ComponentTypeFactoryInterface";
import {RelationshipTypeFactoryInterface} from "../../services/relationships/factories/interfaces/RelationshipTypeFactoryInterface";
import {SceneTypeFactoryInterface} from "../../components/scene/factory/interfaces/SceneTypeFactoryInterface";
import {StoryCircleStageFactoryInterface} from "../../services/plots/factories/interfaces/StoryCircleStageFactoryInterface";
import {AbtStageFactoryInterface} from "../../services/plots/factories/interfaces/AbtStageFactoryInterface";
import {RelationshipFactoryInterface} from "../../services/relationships/factories/interfaces/RelationshipFactoryInterface";
import {FileManipulatorFactoryInterface} from "../../services/manipulators/factories/interfaces/FileManipulatorFactoryInterface";
import {LogFactoryInterface} from "../../services/loggers/interfaces/LogFactoryInterface";
import {AnalyserFactoryInterface} from "../../services/analyser/factories/interfaces/AnalyserFactoryInterface";
import {ImageFactoryInterface} from "../../services/galleries/interfaces/ImageFactoryInterface";
import {GalleryViewFactoryInterface} from "../../services/galleries/interfaces/GalleryViewFactoryInterface";
import {EditableContentFactoryInterface} from "../../services/contentEditor/interfaces/EditableContentFactoryInterface";
import {
	EditableContentTypeFactoryInterface
} from "../../services/contentEditor/interfaces/EditableContentTypeFactoryInterface";
import {
	EditableContentValueFactoryInterface
} from "../../services/contentEditor/interfaces/EditableContentValueFactoryInterface";

export interface FactoriesInterface {
	subModels: SubModelFactoryInterface;
	contents: ContentFactoryInterface;
	component: ComponentFactoryInterface;
	files: FileFactoryInterface;
	modals: ModalFactoryInterface;
	models: ModelFactoryInterface;
	pronouns: PronounFactoryInterface;
	templates: TemplateFactoryInterface;
	views: ViewFactoryInterface;
	fetchers: FetcherFactoryInterface;
	database: DatabaseFactoryInterface;
	id: IdFactoryInterface;
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

	runningTimeManager: RunningTimeManagerInterface;
}
