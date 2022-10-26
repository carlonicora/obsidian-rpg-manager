import {RpgManagerApiInterface} from "./interfaces/RpgManagerApiInterface";
import {App} from "obsidian";
import {ServiceManagerInterface} from "./servicesManager/interfaces/ServiceManagerInterface";
import {ServicesManager} from "./servicesManager/ServicesManager";
import {RpgManagerInterface} from "../core/interfaces/RpgManagerInterface";
import {FantasyCalendarService} from "../services/fantasyCalendarService/FantasyCalendarService";
import {ViewsManagerInterface} from "./viewsManager/interfaces/ViewsManagerInterface";
import {ViewsManager} from "./viewsManager/ViewsManager";
import {ComponentsManagerInterface} from "./componentsManager/interfaces/ComponentsManagerInterface";
import {ComponentsManager} from "./componentsManager/ComponentsManager";
import {DatabaseInterface} from "../database/interfaces/DatabaseInterface";
import {ModelsManagerInterface} from "./modelsManager/interfaces/ModelsManagerInterface";
import {ModelsManager} from "./modelsManager/ModelsManager";
import {ActComponent} from "../components/act/ActComponent";
import {AdventureComponent} from "../components/adventure/AdventureComponent";
import {CampaignComponent} from "../components/campaign/CampaignComponent";
import {CharacterComponent} from "../components/character/CharacterComponent";
import {NonPlayerCharacterComponent} from "../components/character/NonPlayerCharacterComponent";
import {ClueComponent} from "../components/clue/ClueComponent";
import {EventComponent} from "../components/event/EventComponent";
import {FactionComponent} from "../components/faction/FactionComponent";
import {LocationComponent} from "../components/location/LocationComponent";
import {MusicComponent} from "../components/music/MusicComponent";
import {SceneComponent} from "../components/scene/SceneComponent";
import {SessionComponent} from "../components/session/SessionComponent";
import {SubplotComponent} from "../components/subplot/SubplotComponent";
import {RelationshipService} from "../services/relationshipsService/RelationshipService";
import {BreadcrumbService} from "../services/breadcrumbService/BreadcrumbService";
import {ControllerManagerInterface} from "./controllerManager/interfaces/ControllerManagerInterface";
import {ControllerManager} from "./controllerManager/ControllerManager";
import {RunningTimeService} from "../services/runningTimeService/RunningTimeService";
import {TagService} from "../services/tagService/TagService";
import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {PronounService} from "../services/pronounService/PronounService";
import {ServiceInterface} from "./servicesManager/interfaces/ServiceInterface";
import {ServiceClassInterface} from "./servicesManager/interfaces/ServiceClassInterface";
import {YamlService} from "../services/yamlService/YamlService";
import {SearchService} from "../services/searchService/SearchService";
import {DateService} from "../services/dateService/DateService";
import {CodeblockService} from "../services/codeblockService/CodeblockService";
import {ComponentOptionsService} from "../services/componentOptionsService/ComponentOptionsService";
import {FileCreationService} from "../services/fileCreationService/FileCreationService";
import {FileManipulatorService} from "../services/fileManipulatorService/FileManipulatorService";
import {GalleryService} from "../services/galleryService/GalleryService";
import {IdService} from "../services/idService/IdService";
import {SorterService} from "../services/sorterService/SorterService";
import {
	AllComponentManipulatorService
} from "../services/allComponentManipulatorService/AllComponentManipulatorService";

export class RpgManagerApi implements RpgManagerApiInterface {
	private _controllers: ControllerManagerInterface;
	private _components: ComponentsManagerInterface;
	private _database: DatabaseInterface;
	private _models: ModelsManagerInterface;
	private _services: ServiceManagerInterface;
	private _views: ViewsManagerInterface;

	constructor(
		public app: App,
		private _plugin: RpgManagerInterface,
	) {
		this._controllers = new ControllerManager(this);
		this._components = new ComponentsManager(this);
		this._models = new ModelsManager(this);
		this._services = new ServicesManager(this);
		this._views = new ViewsManager(this);
	}

	public get controllers(): ControllerManagerInterface {
		return this._controllers;
	}

	public get components(): ComponentsManagerInterface {
		return this._components;
	}

	public get database(): DatabaseInterface {
		return this._database;
	}

	public set database(database: DatabaseInterface) {
		this._database = database;
	}

	public get models(): ModelsManagerInterface {
		return this._models;
	}

	public get plugin(): RpgManagerInterface {
		return this._plugin;
	}

	public get settings(): RpgManagerSettingsInterface {
		return this._plugin.settings;
	}

	public get views(): ViewsManagerInterface {
		return this._views;
	}
	
	public bootstrap(
	): void {
		this._addComponents();
		this._addServices();
	}

	service<T extends ServiceInterface>(
		service: ServiceClassInterface<T>,
	): T {
		const response = this._services.get(service);

		//TODO change the empty error
		if (response === undefined)
			throw new Error('');

		return response;
	}
	
	private _addComponents(
	): void {
		this._components.register(ActComponent);
		this._components.register(AdventureComponent);
		this._components.register(CampaignComponent);
		this._components.register(CharacterComponent);
		this._components.register(NonPlayerCharacterComponent);
		this._components.register(ClueComponent);
		this._components.register(EventComponent);
		this._components.register(FactionComponent);
		this._components.register(LocationComponent);
		this._components.register(MusicComponent);
		this._components.register(SceneComponent);
		this._components.register(SessionComponent);
		this._components.register(SubplotComponent);
	}

	private _addServices(
	): void {
		this._services.register(AllComponentManipulatorService);
		this._services.register(BreadcrumbService);
		this._services.register(CodeblockService);
		this._services.register(ComponentOptionsService);
		this._services.register(FileCreationService);
		this._services.register(FileManipulatorService);
		this._services.register(GalleryService);
		this._services.register(IdService);
		this._services.register(PronounService);
		this._services.register(RelationshipService);
		this._services.register(RunningTimeService);
		this._services.register(SearchService);
		this._services.register(SorterService);
		this._services.register(TagService);
		this._services.register(YamlService);

		if (this.app.plugins.enabledPlugins.has("fantasy-calendar"))
			this._services.register(FantasyCalendarService);

		this._services.register(DateService);
	}
}
