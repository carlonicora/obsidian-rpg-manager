import {App} from "obsidian";
import {ComponentFactory} from "./factories/ComponentFactory";
import {ContentFactory} from "./factories/ContentFactory";
import {DataFactory} from "./factories/DataFactory";
import {ErrorFactory} from "./factories/ErrorFactory";
import {FileFactory} from "./factories/FileFactory";
import {ModalFactory} from "./factories/ModalFactory";
import {ModelFactory} from "./factories/ModelFactory";
import {PronounFactory} from "./factories/PronounFactory";
import {TemplateFactory} from "./factories/TemplateFactory";
import {ViewFactory} from "./factories/ViewFactory";
import {FetcherFactory} from "./factories/FetcherFactory";

export class RpgFactories {
	public components: ComponentFactory;
	public contents: ContentFactory;
	public data: DataFactory;
	public errors: ErrorFactory;
	public files: FileFactory;
	public modals: ModalFactory;
	public models: ModelFactory;
	public pronouns: PronounFactory;
	public templates: TemplateFactory;
	public views: ViewFactory;
	public fetchers: FetcherFactory;

	constructor(
		private app: App,
	) {
		this.components = new ComponentFactory(this.app);
		this.contents = new ContentFactory(this.app);
		this.data = new DataFactory(this.app);
		this.errors = new ErrorFactory(this.app);
		this.files = new FileFactory(this.app);
		this.modals = new ModalFactory(this.app);
		this.models = new ModelFactory(this.app);
		this.pronouns = new PronounFactory(this.app);
		this.templates = new TemplateFactory(this.app);
		this.views = new ViewFactory(this.app);
		this.fetchers = new FetcherFactory(this.app);
	}
}
