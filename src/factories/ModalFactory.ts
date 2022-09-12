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
import {CampaignSetting} from "../enums/CampaignSetting";
import {NoteModal} from "../settings/Agnostic/modals/NoteModal";
import {TimelineModal} from "../settings/Agnostic/modals/TimelineModal";

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
	AgnosticNote: NoteModal,
	AgnosticTimeline: TimelineModal,
};
type ModalsMapType = typeof ModalsMap;
type ModalKeys = keyof ModalsMapType;
type SingleModalKey<K> = [K] extends (K extends ModalKeys ? [K] : never) ? K : never;

export class ModalFactory extends AbstractFactory {
	public create<K extends ModalKeys>(
		settings: CampaignSetting,
		type: DataType,
		modal: ModalInterface,
	): ModalComponentInterface {
		let modalKey: SingleModalKey<K> = CampaignSetting[settings] + DataType[type] as SingleModalKey<K>;
		if (ModalsMap[modalKey] == null && settings !== CampaignSetting.Agnostic){
			modalKey = CampaignSetting[CampaignSetting.Agnostic] + DataType[type] as SingleModalKey<K>;
		}
		return new ModalsMap[modalKey](this.app, modal);
	}
}
