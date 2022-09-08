import {DataType} from "../enums/DataType";
import {CampaignModal} from "../settings/Agnostic/modals/CampaignModal";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ModalInterface} from "../interfaces/ModalInterface";
import {ModalComponentInterface} from "../interfaces/ModalComponentInterface";
import {AdventureModal} from "../settings/Agnostic/modals/AdventureModal";
import {SessionModal} from "../settings/Agnostic/modals/SessionModal";
import {SceneModal} from "../settings/Agnostic/modals/SceneModal";
import {CharacterModal} from "../settings/Agnostic/modals/CharacterModal";
import {ClueModal} from "../settings/Agnostic/modals/ClueModal";
import {EventModal} from "../settings/Agnostic/modals/EventModal";
import {FactionModal} from "../settings/Agnostic/modals/FactionModal";
import {LocationModal} from "../settings/Agnostic/modals/LocationModal";
import {NonPlayerCharacterModal} from "../settings/Agnostic/modals/NonPlayerCharacterModal";

const ModalsMap = {
	AgnosticCampaign: CampaignModal,
	AgnosticAdventure: AdventureModal,
	AgnosticSession: SessionModal,
	AgnosticScene: SceneModal,
	AgnosticCharacter: CharacterModal,
	AgnosticClue: ClueModal,
	AgnosticEvent: EventModal,
	AgnosticFaction: FactionModal,
	AgnosticLocation: LocationModal,
	AgnosticNonPlayerCharacter: NonPlayerCharacterModal,

	RawCampaign: CampaignModal,
	RawAdventure: AdventureModal,
	RawSession: SessionModal,
	RawScene: SceneModal,
	RawCharacter: CharacterModal,
	RawClue: ClueModal,
	RawEvent: EventModal,
	RawFaction: FactionModal,
	RawLocation: LocationModal,
	RawNonPlayerCharacter: NonPlayerCharacterModal,

	VampireCampaign: CampaignModal,
	VampireAdventure: AdventureModal,
	VampireSession: SessionModal,
	VampireScene: SceneModal,
	VampireCharacter: CharacterModal,
	VampireClue: ClueModal,
	VampireEvent: EventModal,
	VampireFaction: FactionModal,
	VampireLocation: LocationModal,
	VampireNonPlayerCharacter: NonPlayerCharacterModal,
};
type ModalsMapType = typeof ModalsMap;
type ModalKeys = keyof ModalsMapType;
export type SingleModalKey<K> = [K] extends (K extends ModalKeys ? [K] : never) ? K : never;

export class ModalFactory extends AbstractFactory {
	public create<K extends ModalKeys>(
		k: SingleModalKey<K>,
		type: DataType,
		modal: ModalInterface,
	): ModalComponentInterface {
		return new ModalsMap[k](this.app, modal);
	}
}
