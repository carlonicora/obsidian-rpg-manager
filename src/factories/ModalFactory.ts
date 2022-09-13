import {DataType} from "../enums/DataType";
import {CampaignModal} from "../modals/components/CampaignModal";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ModalInterface} from "../interfaces/ModalInterface";
import {ModalComponentInterface} from "../interfaces/ModalComponentInterface";
import {AdventureModal} from "../modals/components/AdventureModal";
import {SessionModal} from "../modals/components/SessionModal";
import {SceneModal} from "../modals/components/SceneModal";
import {CharacterModal} from "../modals/components/CharacterModal";
import {ClueModal} from "../modals/components/ClueModal";
import {EventModal} from "../modals/components/EventModal";
import {FactionModal} from "../modals/components/FactionModal";
import {LocationModal} from "../modals/components/LocationModal";
import {NonPlayerCharacterModal} from "../modals/components/NonPlayerCharacterModal";
import {CampaignSetting} from "../enums/CampaignSetting";
import {NoteModal} from "../modals/components/NoteModal";
import {TimelineModal} from "../modals/components/TimelineModal";

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
