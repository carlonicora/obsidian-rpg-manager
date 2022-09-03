import {SessionTableComponent} from "../settings/Agnostic/components/SessionTableComponent";
import {GenericDataListInterface} from "../interfaces/data/GenericDataListInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ComponentInterface} from "../interfaces/ComponentInterface";
import {IoInterface} from "../interfaces/IoInterface";
import {AdventureTableComponent} from "../settings/Agnostic/components/AdventureTableComponent";
import {CharacterTableComponent} from "../settings/Agnostic/components/CharacterTableComponent";
import {LocationTableComponent} from "../settings/Agnostic/components/LocationTableComponent";
import {EventTableComponent} from "../settings/Agnostic/components/EventTableComponent";
import {ClueTableComponent} from "../settings/Agnostic/components/ClueTableComponent";
import {FactionTableComponent} from "../settings/Agnostic/components/FactionTableComponent";
import {SceneTableComponent} from "../settings/Agnostic/components/SceneTableComponent";
import {BannerComponent} from "../settings/Agnostic/components/BannerComponent";
import {GenericDataInterface} from "../interfaces/data/GenericDataInterface";
import {GenericImageDataInterface} from "../interfaces/data/GenericImageDataInterface";
import {CharacterSynopsisComponent} from "../settings/Agnostic/components/CharacterSynopsisComponent";

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
};
type ComponentsMapType = typeof ComponentsMap;
type ComponentKeys = keyof ComponentsMapType;
export type SingleComponentKey<K> = [K] extends (K extends ComponentKeys ? [K] : never) ? K : never;

export class ComponentFactory {
	static create<K extends ComponentKeys>(
		k: SingleComponentKey<K>,
		io: IoInterface,
		data: GenericDataListInterface|GenericDataInterface|GenericImageDataInterface,
		title: string|null = null,
	): ResponseElementInterface|null {
		const component: ComponentInterface = new ComponentsMap[k](io);
		return component.generateData(data, title);
	}
}
