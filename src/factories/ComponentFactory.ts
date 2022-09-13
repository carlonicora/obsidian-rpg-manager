import {SessionTableComponent} from "../components/SessionTableComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ComponentInterface} from "../interfaces/ComponentInterface";
import {AdventureTableComponent} from "../components/AdventureTableComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";
import {EventTableComponent} from "../components/EventTableComponent";
import {ClueTableComponent} from "../components/ClueTableComponent";
import {FactionTableComponent} from "../components/FactionTableComponent";
import {SceneTableComponent} from "../components/SceneTableComponent";
import {BannerComponent} from "../components/BannerComponent";
import {CharacterSynopsisComponent} from "../components/CharacterSynopsisComponent";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ImageComponent} from "../components/ImageComponent";
import {HeaderComponent} from "../components/HeaderComponent";
import {AbtPlotComponent} from "../components/AbtPlotComponent";
import {StoryCirclePlotComponent} from "../components/StoryCirclePlotComponent";
import {CampaignSetting} from "../enums/CampaignSetting";
import {VampireCharacterTableComponent} from "../settings/Vampire/components/VampireCharacterTableComponent";
import {VampireHeaderComponent} from "../settings/Vampire/components/VampireHeaderComponent";
import {RawCharacterRecordSheetComponent} from "../settings/Raw/components/RawCharacterRecordSheetComponent";
import {MusicTableComponent} from "../components/MusicTableComponent";

const ComponentsMap = {
	AgnosticSessionTable: SessionTableComponent,
	AgnosticAdventureTable: AdventureTableComponent,
	AgnosticCharacterTable: CharacterTableComponent,
	AgnosticLocationTable: LocationTableComponent,
	AgnosticEventTable: EventTableComponent,
	AgnosticClueTable: ClueTableComponent,
	AgnosticFactionTable: FactionTableComponent,
	AgnosticSceneTable: SceneTableComponent,
	AgnosticBanner: BannerComponent,
	AgnosticCharacterSynopsis: CharacterSynopsisComponent,
	AgnosticImage: ImageComponent,
	AgnosticHeader: HeaderComponent,
	AgnosticAbtPlot: AbtPlotComponent,
	AgnosticStoryCirclePlot: StoryCirclePlotComponent,
	VampireCharacterTable: VampireCharacterTableComponent,
	VampireHeader: VampireHeaderComponent,
	RawCharacterRecordSheet: RawCharacterRecordSheetComponent,
	AgnosticMusicTable: MusicTableComponent,
};
type ComponentsMapType = typeof ComponentsMap;
type ComponentKeys = keyof ComponentsMapType;
type SingleComponentKey<K> = [K] extends (K extends ComponentKeys ? [K] : never) ? K : never;

export class ComponentFactory extends AbstractFactory {
	public async create<K extends ComponentKeys>(
		settings: CampaignSetting,
		type: string,
		data: RpgDataInterface[]|RpgDataInterface,
		title: string|null = null,
		additionalInformation: any|null = null,
	): Promise<ResponseElementInterface|null> {
		let componentKey: SingleComponentKey<K> = CampaignSetting[settings] + type as SingleComponentKey<K>;
		if (ComponentsMap[componentKey] == null && settings !== CampaignSetting.Agnostic){
			componentKey = CampaignSetting[CampaignSetting.Agnostic] + type as SingleComponentKey<K>;
		}
		const component: ComponentInterface = new ComponentsMap[componentKey](this.app);
		return component.generateData(data, title, additionalInformation);
	}
}
