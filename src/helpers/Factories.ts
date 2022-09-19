import {App} from "obsidian";
import {ComponentFactory} from "../factories/ComponentFactory";
import {ContentFactory} from "../factories/ContentFactory";
import {DataFactory} from "../factories/DataFactory";
import {FileFactory} from "../factories/FileFactory";
import {ModalFactory} from "../factories/ModalFactory";
import {ModelFactory} from "../factories/ModelFactory";
import {PronounFactory} from "../factories/PronounFactory";
import {TemplateFactory} from "../factories/TemplateFactory";
import {ViewFactory} from "../factories/ViewFactory";
import {FetcherFactory} from "../factories/FetcherFactory";
import {RelationshipFactory} from "../factories/RelationshipFactory";
import {DatabaseFactory} from "../factories/DatabaseFactory";
import {TagFactory} from "../factories/TagFactory";

export class Factories {
	public components: ComponentFactory;
	public contents: ContentFactory;
	public data: DataFactory;
	public files: FileFactory;
	public modals: ModalFactory;
	public models: ModelFactory;
	public pronouns: PronounFactory;
	public templates: TemplateFactory;
	public views: ViewFactory;
	public fetchers: FetcherFactory;
	public relationships: RelationshipFactory;
	public database: DatabaseFactory;
	public tags: TagFactory;

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
		this.tags = new TagFactory(this.app);
	}
}
