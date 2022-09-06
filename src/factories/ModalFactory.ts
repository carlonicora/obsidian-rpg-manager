import {DataType} from "../enums/DataType";
import {AdventureModal} from "../settings/Agnostic/modals/AdventureModal";
import {CampaignModal} from "../settings/Agnostic/modals/CampaignModal";
import {SceneModal} from "../settings/Agnostic/modals/SceneModal";
import {SessionModal} from "../settings/Agnostic/modals/SessionModal";
import {CharacterModal} from "../settings/Agnostic/modals/CharacterModal";
import {ClueModal} from "../settings/Agnostic/modals/ClueModal";
import {EventModal} from "../settings/Agnostic/modals/EventModal";
import {FactionModal} from "../settings/Agnostic/modals/FactionModal";
import {LocationModal} from "../settings/Agnostic/modals/LocationModal";
import {NonPlayerCharacterModal} from "../settings/Agnostic/modals/NonPlayerCharacterModal";
import {App} from "obsidian";

const ModalsMap = {
	Campaign: CampaignModal,
	Adventure: AdventureModal,
	Session: SessionModal,
	Scene: SceneModal,
	Character: CharacterModal,
	Clue: ClueModal,
	Event: EventModal,
	Faction: FactionModal,
	Location: LocationModal,
	NonPlayerCharacter: NonPlayerCharacterModal,
};
type ModalsMapType = typeof ModalsMap;
type ModalKeys = keyof ModalsMapType;
export type SingleModalKey<K> = [K] extends (K extends ModalKeys ? [K] : never) ? K : never;

export class ModalFactory {
	static open<K extends ModalKeys>(
		k: SingleModalKey<K>,
		app: App,
		type: DataType,
		create: boolean,
		name: string|null,
	): void {
		new ModalsMap[k](app, type, create, name).open();
	}
}
