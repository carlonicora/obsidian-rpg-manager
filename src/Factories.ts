import {App} from "obsidian";
import {ComponentFactory} from "./factories/ComponentFactory";
import {ContentFactory} from "./factories/ContentFactory";
import {DataFactory} from "./factories/DataFactory";
import {FileFactory} from "./factories/FileFactory";
import {ModalFactory} from "./factories/ModalFactory";
import {ModelFactory} from "./factories/ModelFactory";
import {PronounFactory} from "./factories/PronounFactory";
import {TemplateFactory} from "./factories/TemplateFactory";
import {ViewFactory} from "./factories/ViewFactory";
import {FetcherFactory} from "./factories/FetcherFactory";
import {RelationshipFactory} from "./factories/RelationshipFactory";
import {DatabaseFactory} from "./factories/DatabaseFactory";
import {ComponentFactoryInterface} from "./interfaces/factories/ComponentFactoryInterface";
import {ContentFactoryInterface} from "./interfaces/factories/ContentFactoryInterface";
import {DataFactoryInterface} from "./interfaces/factories/DataFactoryInterface";
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

export class Factories implements FactoriesInterface{
	public components: ComponentFactoryInterface;
	public contents: ContentFactoryInterface;
	public data: DataFactoryInterface;
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

	constructor(
		private app: App,
	) {
		this.components = new ComponentFactory(this.app);
		this.contents = new ContentFactory(this.app);
		this.data = new DataFactory(this.app);
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
	}
}
