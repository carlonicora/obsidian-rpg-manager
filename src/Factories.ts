import {App} from "obsidian";
import {SubModelFactory} from "./factories/SubModelFactory";
import {ContentFactory} from "./factories/ContentFactory";
import {ComponentFactory} from "./factories/ComponentFactory";
import {FileFactory} from "./factories/FileFactory";
import {ModalFactory} from "./factories/ModalFactory";
import {ModelFactory} from "./factories/ModelFactory";
import {PronounFactory} from "./factories/PronounFactory";
import {TemplateFactory} from "./factories/TemplateFactory";
import {ViewFactory} from "./factories/ViewFactory";
import {FetcherFactory} from "./factories/FetcherFactory";
import {RelationshipFactory} from "./factories/RelationshipFactory";
import {DatabaseFactory} from "./factories/DatabaseFactory";
import {SubModelFactoryInterface} from "./interfaces/factories/SubModelFactoryInterface";
import {ContentFactoryInterface} from "./interfaces/factories/ContentFactoryInterface";
import {ComponentFactoryInterface} from "./interfaces/factories/ComponentFactoryInterface";
import {FileFactoryInterface} from "./interfaces/factories/FileFactoryInterface";
import {ModalFactoryInterface} from "./interfaces/factories/ModalFactoryInterface";
import {ModelFactoryInterface} from "./interfaces/factories/ModelFactoryInterface";
import {PronounFactoryInterface} from "./interfaces/factories/PronounFactoryInterface";
import {TemplateFactoryInterface} from "./interfaces/factories/TemplateFactoryInterface";
import {ViewFactoryInterface} from "./interfaces/factories/ViewFactoryInterface";
import {FetcherFactoryInterface} from "./interfaces/factories/FetcherFactoryInterface";
import {FactoriesInterface} from "./interfaces/FactoriesInterface";
import {RelationshipFactoryInterface} from "./interfaces/factories/RelationshipFactoryInterface";
import {DatabaseFactoryInterface} from "./interfaces/factories/DatabaseFactoryInterface";
import {IdFactoryInterface} from "./interfaces/factories/IdFactoryInterface";
import {IdFactory} from "./factories/IdFactory";
import {BreadcrumbFactoryInterface} from "./interfaces/factories/BreadcrumbFactoryInterface";
import {BreadcrumbFactory} from "./factories/BreadcrumbFactory";
import {FrontmatterFactoryInterface} from "./interfaces/factories/FrontmatterFactoryInterface";
import {FrontmatterFactory} from "./factories/FrontmatterFactory";
import {SorterFactoryInterface} from "./interfaces/factories/SorterFactoryInterface";
import {SorterFactory} from "./factories/SorterFactory";
import {CodeBlockEditorFactoryInterface} from "./interfaces/factories/CodeBlockEditorFactoryInterface";
import {CodeBlockEditorFactory} from "./factories/CodeBlockEditorFactory";
import {RunningTimeManagerInterface} from "./interfaces/dataManipulation/RunningTimeManagerInterface";
import {RunningTimeManager} from "./dataManipulation/RunningTimeManager";

export class Factories implements FactoriesInterface{
	public subModels: SubModelFactoryInterface;
	public contents: ContentFactoryInterface;
	public data: ComponentFactoryInterface;
	public files: FileFactoryInterface;
	public modals: ModalFactoryInterface;
	public models: ModelFactoryInterface;
	public pronouns: PronounFactoryInterface;
	public templates: TemplateFactoryInterface;
	public views: ViewFactoryInterface;
	public fetchers: FetcherFactoryInterface;
	public relationships: RelationshipFactoryInterface;
	public database: DatabaseFactoryInterface;
	public id: IdFactoryInterface;
	public breadcrumb: BreadcrumbFactoryInterface;
	public frontmatter: FrontmatterFactoryInterface;
	public sorter: SorterFactoryInterface;
	public codeblock: CodeBlockEditorFactoryInterface;
	public runningTimeManager: RunningTimeManagerInterface;

	constructor(
		private app: App,
	) {
		this.subModels = new SubModelFactory(this.app);
		this.contents = new ContentFactory(this.app);
		this.data = new ComponentFactory(this.app);
		this.files = new FileFactory(this.app);
		this.modals = new ModalFactory(this.app);
		this.models = new ModelFactory(this.app);
		this.pronouns = new PronounFactory(this.app);
		this.templates = new TemplateFactory(this.app);
		this.views = new ViewFactory(this.app);
		this.fetchers = new FetcherFactory(this.app);
		this.relationships = new RelationshipFactory(this.app);
		this.database = new DatabaseFactory(this.app);
		this.id = new IdFactory(this.app);
		this.breadcrumb = new BreadcrumbFactory(this.app);
		this.frontmatter = new FrontmatterFactory(this.app);
		this.sorter = new SorterFactory(this.app);
		this.codeblock = new CodeBlockEditorFactory(this.app);
		this.runningTimeManager = new RunningTimeManager(this.app);
	}
}
