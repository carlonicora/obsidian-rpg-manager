import {RecordType} from "../enums/RecordType";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ModalInterface} from "../interfaces/ModalInterface";
import {ModalComponentInterface} from "../interfaces/ModalComponentInterface";
import {CampaignSetting} from "../enums/CampaignSetting";
import {CampaignModal} from "../modals/components/CampaignModal";
import {AdventureModal} from "../modals/components/AdventureModal";
import {SessionModal} from "../modals/components/SessionModal";
import {SceneModal} from "../modals/components/SceneModal";
import {CharacterModal} from "../modals/components/CharacterModal";
import {ClueModal} from "../modals/components/ClueModal";
import {EventModal} from "../modals/components/EventModal";
import {FactionModal} from "../modals/components/FactionModal";
import {LocationModal} from "../modals/components/LocationModal";
import {NonPlayerCharacterModal} from "../modals/components/NonPlayerCharacterModal";
import {NoteModal} from "../modals/components/NoteModal";
import {TimelineModal} from "../modals/components/TimelineModal";
import {MusicModal} from "../modals/components/MusicModal";
import {App} from "obsidian";
import {ModalFactoryInterface} from "../interfaces/factories/ModalFactoryInterface";

export class ModalFactory extends AbstractFactory implements ModalFactoryInterface{
	private modalTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);
		this.modalTypeMap = new Map();
		this.modalTypeMap.set('AgnosticCampaign', CampaignModal);
		this.modalTypeMap.set('AgnosticAdventure', AdventureModal);
		this.modalTypeMap.set('AgnosticSession', SessionModal);
		this.modalTypeMap.set('AgnosticScene', SceneModal);
		this.modalTypeMap.set('AgnosticCharacter', CharacterModal);
		this.modalTypeMap.set('AgnosticClue', ClueModal);
		this.modalTypeMap.set('AgnosticEvent', EventModal);
		this.modalTypeMap.set('AgnosticFaction', FactionModal);
		this.modalTypeMap.set('AgnosticLocation', LocationModal);
		this.modalTypeMap.set('AgnosticNonPlayerCharacter', NonPlayerCharacterModal);
		this.modalTypeMap.set('AgnosticNote', NoteModal);
		this.modalTypeMap.set('AgnosticTimeline', TimelineModal);
		this.modalTypeMap.set('AgnosticMusic', MusicModal);

	}
	public create(
		settings: CampaignSetting,
		type: RecordType,
		modal: ModalInterface,
	): ModalComponentInterface {
		let modalKey:string = CampaignSetting[settings] + RecordType[type];
		if (!this.modalTypeMap.has(modalKey)) modalKey = CampaignSetting[CampaignSetting.Agnostic] + RecordType[type];
		if (!this.modalTypeMap.has(modalKey)) throw new Error('Type of modal ' + CampaignSetting[settings] + RecordType[type] + ' cannot be found');

		return new (this.modalTypeMap.get(modalKey))(this.app, modal);
	}
}
