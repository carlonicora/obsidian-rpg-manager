import {ComponentType} from "../../databases/enums/ComponentType";
import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {ModalInterface} from "../interfaces/ModalInterface";
import {ModalPartInterface} from "../interfaces/ModalPartInterface";
import {CampaignSetting} from "../../databases/enums/CampaignSetting";
import {CampaignModalPart} from "../creationParts/CampaignModalPart";
import {AdventureModalPart} from "../creationParts/AdventureModalPart";
import {ActModalPart} from "../creationParts/ActModalPart";
import {SceneModalPart} from "../creationParts/SceneModalPart";
import {CharacterModalPart} from "../creationParts/CharacterModalPart";
import {ClueModalPart} from "../creationParts/ClueModalPart";
import {EventModalPart} from "../creationParts/EventModalPart";
import {FactionModalPart} from "../creationParts/FactionModalPart";
import {LocationModalPart} from "../creationParts/LocationModalPart";
import {NonPlayerCharacterModalPart} from "../creationParts/NonPlayerCharacterModalPart";
import {MusicModalPart} from "../creationParts/MusicModalPart";
import {App} from "obsidian";
import {ModalFactoryInterface} from "./interfaces/ModalFactoryInterface";
import {SessionModalPart} from "../creationParts/SessionModalPart";
import {SubplotModalPart} from "../creationParts/SubplotModalPart";

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
		this.modalTypeMap.set('AgnosticSceneTypeDescription', SubplotModalPart);

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
