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

	RawSessionTable: SessionTableComponent,
	RawAdventureTable: AdventureTableComponent,
	RawCharacterTable: CharacterTableComponent,
	RawLocationTable: LocationTableComponent,
	RawEventTable: EventTableComponent,
	RawClueTable: ClueTableComponent,
	RawFactionTable: FactionTableComponent,
	RawSceneTable: SceneTableComponent,
	RawBanner: BannerComponent,
	RawCharacterSynopsis: CharacterSynopsisComponent,
	RawImage: ImageComponent,
	RawHeader: HeaderComponent,
	RawAbtPlot: AbtPlotComponent,
	RawStoryCirclePlot: StoryCirclePlotComponent,

	VampireSessionTable: SessionTableComponent,
	VampireAdventureTable: AdventureTableComponent,
	VampireCharacterTable: CharacterTableComponent,
	VampireLocationTable: LocationTableComponent,
	VampireEventTable: EventTableComponent,
	VampireClueTable: ClueTableComponent,
	VampireFactionTable: FactionTableComponent,
	VampireSceneTable: SceneTableComponent,
	VampireBanner: BannerComponent,
	VampireCharacterSynopsis: CharacterSynopsisComponent,
	VampireImage: ImageComponent,
	VampireHeader: HeaderComponent,
	VampireAbtPlot: AbtPlotComponent,
	VampireStoryCirclePlot: StoryCirclePlotComponent,
};
type ComponentsMapType = typeof ComponentsMap;
type ComponentKeys = keyof ComponentsMapType;
export type SingleComponentKey<K> = [K] extends (K extends ComponentKeys ? [K] : never) ? K : never;

export class ComponentFactory extends AbstractFactory {
	public create<K extends ComponentKeys>(
		k: SingleComponentKey<K>,
		data: RpgDataInterface[]|RpgDataInterface,
		title: string|null = null,
		additionalInformation: any|null = null,
	): ResponseElementInterface|null {
		const component: ComponentInterface = new ComponentsMap[k](this.app);
		return component.generateData(data, title, additionalInformation);
	}
}
