import {ComponentType} from "../enums/ComponentType";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ModalInterface} from "../interfaces/ModalInterface";
import {ModalPartInterface} from "../interfaces/ModalPartInterface";
import {CampaignSetting} from "../enums/CampaignSetting";
import {CampaignModalPart} from "../modals/creationParts/CampaignModalPart";
import {AdventureModalPart} from "../modals/creationParts/AdventureModalPart";
import {ActModalPart} from "../modals/creationParts/ActModalPart";
import {SceneModalPart} from "../modals/creationParts/SceneModalPart";
import {CharacterModalPart} from "../modals/creationParts/CharacterModalPart";
import {ClueModalPart} from "../modals/creationParts/ClueModalPart";
import {EventModalPart} from "../modals/creationParts/EventModalPart";
import {FactionModalPart} from "../modals/creationParts/FactionModalPart";
import {LocationModalPart} from "../modals/creationParts/LocationModalPart";
import {NonPlayerCharacterModalPart} from "../modals/creationParts/NonPlayerCharacterModalPart";
import {MusicModalPart} from "../modals/creationParts/MusicModalPart";
import {App} from "obsidian";
import {ModalFactoryInterface} from "../interfaces/factories/ModalFactoryInterface";
import {SessionModalPart} from "../modals/creationParts/SessionModalPart";
import {SubplotModalPart} from "../modals/creationParts/SubplotModalPart";

export class ModalFactory extends AbstractFactory implements ModalFactoryInterface{
	private modalTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);
		this.modalTypeMap = new Map();
		this.modalTypeMap.set('AgnosticCampaign', CampaignModalPart);
		this.modalTypeMap.set('AgnosticAdventure', AdventureModalPart);
		this.modalTypeMap.set('AgnosticAct', ActModalPart);
		this.modalTypeMap.set('AgnosticScene', SceneModalPart);
		this.modalTypeMap.set('AgnosticCharacter', CharacterModalPart);
		this.modalTypeMap.set('AgnosticClue', ClueModalPart);
		this.modalTypeMap.set('AgnosticEvent', EventModalPart);
		this.modalTypeMap.set('AgnosticFaction', FactionModalPart);
		this.modalTypeMap.set('AgnosticLocation', LocationModalPart);
		this.modalTypeMap.set('AgnosticNonPlayerCharacter', NonPlayerCharacterModalPart);
		this.modalTypeMap.set('AgnosticMusic', MusicModalPart);
		this.modalTypeMap.set('AgnosticSession', SessionModalPart);
		this.modalTypeMap.set('AgnosticSubplot', SubplotModalPart);

	}
	public create(
		settings: CampaignSetting,
		type: ComponentType,
		modal: ModalInterface,
	): ModalPartInterface {
		let modalKey:string = CampaignSetting[settings] + ComponentType[type];
		if (!this.modalTypeMap.has(modalKey)) modalKey = CampaignSetting[CampaignSetting.Agnostic] + ComponentType[type];
		if (!this.modalTypeMap.has(modalKey)) throw new Error('Type of modal ' + CampaignSetting[settings] + ComponentType[type] + ' cannot be found');

		return new (this.modalTypeMap.get(modalKey))(this.app, modal);
	}
}
