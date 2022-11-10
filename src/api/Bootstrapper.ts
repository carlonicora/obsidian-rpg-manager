import {RpgManagerApiInterface} from "./interfaces/RpgManagerApiInterface";
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
import {
	AllComponentManipulatorService
} from "../services/allComponentManipulatorService/AllComponentManipulatorService";
import {BreadcrumbService} from "../services/breadcrumbService/BreadcrumbService";
import {CodeblockService} from "../services/codeblockService/CodeblockService";
import {ComponentOptionsService} from "../services/componentOptionsService/ComponentOptionsService";
import {FileCreationService} from "../services/fileCreationService/FileCreationService";
import {FileManipulatorService} from "../services/fileManipulatorService/FileManipulatorService";
import {GalleryService} from "../services/galleryService/GalleryService";
import {IdService} from "../services/idService/IdService";
import {PronounService} from "../services/pronounService/PronounService";
import {RelationshipService} from "../services/relationshipsService/RelationshipService";
import {RunningTimeService} from "../services/runningTimeService/RunningTimeService";
import {SearchService} from "../services/searchService/SearchService";
import {SorterService} from "../services/sorterService/SorterService";
import {TagService} from "../services/tagService/TagService";
import {YamlService} from "../services/yamlService/YamlService";
import {FantasyCalendarService} from "../services/fantasyCalendarService/FantasyCalendarService";
import {DateService} from "../services/dateService/DateService";
import {YouTubeImageFetcher} from "../fetchers/youTubeFetcher/YouTubeImageFetcher";
import {ReleaseNoteFetcher} from "../fetchers/releaseNoteFetcher/ReleaseNoteFetcher";
import {PlotService} from "../services/plotsService/PlotService";
import {AnalyserService} from "../services/analyserService/AnalyserService";
import {DiceService} from "../services/diceService/DiceService";
import {LoggerService} from "../services/loggerService/LoggerService";
import {SceneBuilderService} from "../services/sceneBuilderService/SceneBuilderService";
import {ImageService} from "../services/imageService/ImageService";
import {ContentEditorService} from "../services/contentEditorService/ContentEditorService";
import {LinkSuggesterService} from "../services/linkSuggesterService/LinkSuggesterService";
import {PlotWizardService} from "../services/plotWizardService/PlotWizardService";

export class Bootstrapper {
	public static initialise(
		api: RpgManagerApiInterface,
	): void {
		this._addComponents(api);
		this._addServices(api);
		this._addFetchers(api);
	}

	private static _addComponents(
		api: RpgManagerApiInterface,
	): void {
		api.components.register(ActComponent);
		api.components.register(AdventureComponent);
		api.components.register(CampaignComponent);
		api.components.register(CharacterComponent);
		api.components.register(NonPlayerCharacterComponent);
		api.components.register(ClueComponent);
		api.components.register(EventComponent);
		api.components.register(FactionComponent);
		api.components.register(LocationComponent);
		api.components.register(MusicComponent);
		api.components.register(SceneComponent);
		api.components.register(SessionComponent);
		api.components.register(SubplotComponent);
	}

	private static _addServices(
		api: RpgManagerApiInterface,
	): void {
		api.services.register(PlotWizardService);
		api.services.register(AllComponentManipulatorService);
		api.services.register(AnalyserService);
		api.services.register(BreadcrumbService);
		api.services.register(CodeblockService);
		api.services.register(ComponentOptionsService);
		api.services.register(ContentEditorService);
		api.services.register(DiceService);
		api.services.register(FileCreationService);
		api.services.register(FileManipulatorService);
		api.services.register(GalleryService);
		api.services.register(IdService);
		api.services.register(ImageService);
		api.services.register(LinkSuggesterService);
		api.services.register(LoggerService);
		api.services.register(PlotService);
		api.services.register(PronounService);
		api.services.register(RelationshipService);
		api.services.register(RunningTimeService);
		api.services.register(SceneBuilderService);
		api.services.register(SearchService);
		api.services.register(SorterService);
		api.services.register(TagService);
		api.services.register(YamlService);

		if (api.app.plugins.enabledPlugins.has("fantasy-calendar"))
			api.services.register(FantasyCalendarService);

		api.services.register(DateService);
	}

	private static _addFetchers(
		api: RpgManagerApiInterface,
	): void {
		api.fetchers.register(ReleaseNoteFetcher);
		api.fetchers.register(YouTubeImageFetcher);
	}
}
