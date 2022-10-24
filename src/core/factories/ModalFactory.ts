import {ComponentType} from "../enums/ComponentType";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ModalInterface} from "../interfaces/ModalInterface";
import {ModalPartInterface} from "../interfaces/ModalPartInterface";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {CampaignModalPart} from "../../components/campaign/modals/CampaignModalPart";
import {AdventureModalPart} from "../../components/adventure/modals/AdventureModalPart";
import {ActModalPart} from "../../components/act/modals/ActModalPart";
import {SceneModalPart} from "../../components/scene/modals/SceneModalPart";
import {CharacterModalPart} from "../../components/character/modals/CharacterModalPart";
import {ClueModalPart} from "../../components/clue/modals/ClueModalPart";
import {EventModalPart} from "../../components/event/modals/EventModalPart";
import {FactionModalPart} from "../../components/faction/modals/FactionModalPart";
import {LocationModalPart} from "../../components/location/modals/LocationModalPart";
import {NonPlayerCharacterModalPart} from "../../components/character/modals/NonPlayerCharacterModalPart";
import {MusicModalPart} from "../../components/music/modals/MusicModalPart";
import {App} from "obsidian";
import {ModalFactoryInterface} from "../interfaces/ModalFactoryInterface";
import {SessionModalPart} from "../../components/session/modals/SessionModalPart";
import {SubplotModalPart} from "../../components/subplot/modals/SubplotModalPart";

export class ModalFactory extends AbstractFactory implements ModalFactoryInterface{
	private _modalTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);
		this._modalTypeMap = new Map();
		this._modalTypeMap.set('AgnosticCampaign', CampaignModalPart);
		this._modalTypeMap.set('AgnosticAdventure', AdventureModalPart);
		this._modalTypeMap.set('AgnosticAct', ActModalPart);
		this._modalTypeMap.set('AgnosticScene', SceneModalPart);
		this._modalTypeMap.set('AgnosticCharacter', CharacterModalPart);
		this._modalTypeMap.set('AgnosticClue', ClueModalPart);
		this._modalTypeMap.set('AgnosticEvent', EventModalPart);
		this._modalTypeMap.set('AgnosticFaction', FactionModalPart);
		this._modalTypeMap.set('AgnosticLocation', LocationModalPart);
		this._modalTypeMap.set('AgnosticNonPlayerCharacter', NonPlayerCharacterModalPart);
		this._modalTypeMap.set('AgnosticMusic', MusicModalPart);
		this._modalTypeMap.set('AgnosticSession', SessionModalPart);
		this._modalTypeMap.set('AgnosticSubplot', SubplotModalPart);
		this._modalTypeMap.set('AgnosticSceneTypeDescription', SubplotModalPart);

	}
	public create(
		settings: CampaignSetting,
		type: ComponentType,
		modal: ModalInterface,
	): ModalPartInterface {
		let modalKey:string = CampaignSetting[settings] + ComponentType[type];
		if (!this._modalTypeMap.has(modalKey)) modalKey = CampaignSetting[CampaignSetting.Agnostic] + ComponentType[type];
		if (!this._modalTypeMap.has(modalKey)) throw new Error('Type of modal ' + CampaignSetting[settings] + ComponentType[type] + ' cannot be found');

		return new (this._modalTypeMap.get(modalKey))(this.app, modal);
	}
}
