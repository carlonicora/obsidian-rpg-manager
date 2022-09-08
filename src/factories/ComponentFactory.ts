import {SessionTableComponent} from "../settings/Agnostic/components/SessionTableComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ComponentInterface} from "../interfaces/ComponentInterface";
import {AdventureTableComponent} from "../settings/Agnostic/components/AdventureTableComponent";
import {CharacterTableComponent} from "../settings/Agnostic/components/CharacterTableComponent";
import {LocationTableComponent} from "../settings/Agnostic/components/LocationTableComponent";
import {EventTableComponent} from "../settings/Agnostic/components/EventTableComponent";
import {ClueTableComponent} from "../settings/Agnostic/components/ClueTableComponent";
import {FactionTableComponent} from "../settings/Agnostic/components/FactionTableComponent";
import {SceneTableComponent} from "../settings/Agnostic/components/SceneTableComponent";
import {BannerComponent} from "../settings/Agnostic/components/BannerComponent";
import {CharacterSynopsisComponent} from "../settings/Agnostic/components/CharacterSynopsisComponent";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ImageComponent} from "../settings/Agnostic/components/ImageComponent";
import {HeaderComponent} from "../settings/Agnostic/components/HeaderComponent";
import {AbtPlotComponent} from "../settings/Agnostic/components/AbtPlotComponent";
import {StoryCirclePlotComponent} from "../settings/Agnostic/components/StoryCirclePlotComponent";
import {CampaignSetting} from "../enums/CampaignSetting";

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
};
type ComponentsMapType = typeof ComponentsMap;
type ComponentKeys = keyof ComponentsMapType;
type SingleComponentKey<K> = [K] extends (K extends ComponentKeys ? [K] : never) ? K : never;

export class ComponentFactory extends AbstractFactory {
	public create<K extends ComponentKeys>(
		settings: CampaignSetting,
		type: string,
		data: RpgDataInterface[]|RpgDataInterface,
		title: string|null = null,
		additionalInformation: any|null = null,
	): ResponseElementInterface|null {
		let componentKey: SingleComponentKey<K> = CampaignSetting[settings] + type as SingleComponentKey<K>;
		if (ComponentsMap[componentKey] == null && settings !== CampaignSetting.Agnostic){
			componentKey = CampaignSetting[CampaignSetting.Agnostic] + type as SingleComponentKey<K>;
		}
		const component: ComponentInterface = new ComponentsMap[componentKey](this.app);
		return component.generateData(data, title, additionalInformation);
	}
}
