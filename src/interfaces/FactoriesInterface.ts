import {SubModelFactoryInterface} from "./factories/SubModelFactoryInterface";
import {ContentFactoryInterface} from "./factories/ContentFactoryInterface";
import {ComponentFactoryInterface} from "./factories/ComponentFactoryInterface";
import {FileFactoryInterface} from "./factories/FileFactoryInterface";
import {ModalFactoryInterface} from "./factories/ModalFactoryInterface";
import {ModelFactoryInterface} from "./factories/ModelFactoryInterface";
import {PronounFactoryInterface} from "./factories/PronounFactoryInterface";
import {TemplateFactoryInterface} from "./factories/TemplateFactoryInterface";
import {ViewFactoryInterface} from "./factories/ViewFactoryInterface";
import {FetcherFactoryInterface} from "./factories/FetcherFactoryInterface";
import {RelationshipFactoryInterface} from "./factories/RelationshipFactoryInterface";
import {DatabaseFactoryInterface} from "./factories/DatabaseFactoryInterface";
import {IdFactoryInterface} from "./factories/IdFactoryInterface";
import {BreadcrumbFactoryInterface} from "./factories/BreadcrumbFactoryInterface";
import {FrontmatterFactoryInterface} from "./factories/FrontmatterFactoryInterface";
import {SorterFactoryInterface} from "./factories/SorterFactoryInterface";
import {CodeBlockEditorFactoryInterface} from "./factories/CodeBlockEditorFactoryInterface";
import {RunningTimeManagerInterface} from "./dataManipulation/RunningTimeManagerInterface";
import {MetadataReaderInterface} from "./dataManipulation/MetadataReaderInterface";
import {DatabaseV2FactoryInterface} from "../_dbV2/factories/interfaces/DatabaseV2FactoryInterface";
import {ComponentV2FactoryInterface} from "../_dbV2/factories/interfaces/ComponentV2FactoryInterface";

export interface FactoriesInterface {
	subModels: SubModelFactoryInterface;
	contents: ContentFactoryInterface;
	data: ComponentFactoryInterface;
	files: FileFactoryInterface;
	modals: ModalFactoryInterface;
	models: ModelFactoryInterface;
	pronouns: PronounFactoryInterface;
	templates: TemplateFactoryInterface;
	views: ViewFactoryInterface;
	fetchers: FetcherFactoryInterface;
	relationships: RelationshipFactoryInterface;
	database: DatabaseFactoryInterface;
	id: IdFactoryInterface;
	breadcrumb: BreadcrumbFactoryInterface;
	frontmatter: FrontmatterFactoryInterface;
	sorter: SorterFactoryInterface;
	codeblock: CodeBlockEditorFactoryInterface;
	runningTimeManager: RunningTimeManagerInterface;
	metadataReader: MetadataReaderInterface;

	componentV2: ComponentV2FactoryInterface;
	databaseV2: DatabaseV2FactoryInterface;
}
