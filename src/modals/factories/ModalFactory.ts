import {ComponentType} from "../../components/enums/ComponentType";
import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {ModalInterface} from "../interfaces/ModalInterface";
import {ModalPartInterface} from "../interfaces/ModalPartInterface";
import {CampaignSetting} from "../../components/components/campaign/enums/CampaignSetting";
import {CampaignModalPart} from "../../components/components/campaign/modals/CampaignModalPart";
import {AdventureModalPart} from "../../components/components/adventure/modals/AdventureModalPart";
import {ActModalPart} from "../../components/components/act/modals/ActModalPart";
import {SceneModalPart} from "../../components/components/scene/modals/SceneModalPart";
import {CharacterModalPart} from "../../components/components/character/modals/CharacterModalPart";
import {ClueModalPart} from "../../components/components/clue/modals/ClueModalPart";
import {EventModalPart} from "../../components/components/event/modals/EventModalPart";
import {FactionModalPart} from "../../components/components/faction/modals/FactionModalPart";
import {LocationModalPart} from "../../components/components/location/modals/LocationModalPart";
import {NonPlayerCharacterModalPart} from "../../components/components/character/modals/NonPlayerCharacterModalPart";
import {MusicModalPart} from "../../components/components/music/modals/MusicModalPart";
import {App} from "obsidian";
import {ModalFactoryInterface} from "./interfaces/ModalFactoryInterface";
import {SessionModalPart} from "../../components/components/session/modals/SessionModalPart";
import {SubplotModalPart} from "../../components/components/subplot/modals/SubplotModalPart";

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
