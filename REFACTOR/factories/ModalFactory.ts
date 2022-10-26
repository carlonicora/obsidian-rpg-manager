import {ComponentType} from "../../src/core/enums/ComponentType";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ModalInterface} from "../../src/core/interfaces/ModalInterface";
import {ModalPartInterface} from "../../src/core/interfaces/ModalPartInterface";
import {CampaignSetting} from "../../src/components/campaign/enums/CampaignSetting";
import {CampaignModalPart} from "../../src/components/campaign/modals/CampaignModalPart";
import {AdventureModalPart} from "../../src/components/adventure/modals/AdventureModalPart";
import {ActModalPart} from "../../src/components/act/modals/ActModalPart";
import {SceneModalPart} from "../../src/components/scene/modals/SceneModalPart";
import {CharacterModalPart} from "../../src/components/character/modals/CharacterModalPart";
import {ClueModalPart} from "../../src/components/clue/modals/ClueModalPart";
import {EventModalPart} from "../../src/components/event/modals/EventModalPart";
import {FactionModalPart} from "../../src/components/faction/modals/FactionModalPart";
import {LocationModalPart} from "../../src/components/location/modals/LocationModalPart";
import {NonPlayerCharacterModalPart} from "../../src/components/character/modals/NonPlayerCharacterModalPart";
import {MusicModalPart} from "../../src/components/music/modals/MusicModalPart";
import {App} from "obsidian";
import {ModalFactoryInterface} from "../../src/core/interfaces/ModalFactoryInterface";
import {SessionModalPart} from "../../src/components/session/modals/SessionModalPart";
import {SubplotModalPart} from "../../src/components/subplot/modals/SubplotModalPart";

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
