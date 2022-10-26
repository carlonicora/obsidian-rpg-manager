import {AbstractFactory} from "../abstracts/AbstractFactory";
import {App, TFile} from "obsidian";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {IdInterface} from "../../services/id/interfaces/IdInterface";
import {ComponentType} from "../enums/ComponentType";
import {CampaignModel} from "../../components/campaign/models/CampaignModel";
import {ComponentFactoryInterface} from "../interfaces/ComponentFactoryInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {AdventureModel} from "../../components/adventure/models/AdventureModel";
import {ActModel} from "../../components/act/models/ActModel";
import {SceneModel} from "../../components/scene/models/SceneModel";
import {SessionModel} from "../../components/session/models/SessionModel";
import {CharacterModel} from "../../components/character/models/CharacterModel";
import {FactionModel} from "../../components/faction/models/FactionModel";
import {ClueModel} from "../../components/clue/models/ClueModel";
import {LocationModel} from "../../components/location/models/LocationModel";
import {EventModel} from "../../components/event/models/EventModel";
import {MusicModel} from "../../components/music/models/MusicModel";
import {SubplotModel} from "../../components/subplot/models/SubplotModel";

export class ComponentFactory extends AbstractFactory implements ComponentFactoryInterface{
	private _componentTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);

		this._componentTypeMap = new Map<string, any>();
		this._componentTypeMap.set('AgnosticCampaign', CampaignModel);
		this._componentTypeMap.set('AgnosticAdventure', AdventureModel);
		this._componentTypeMap.set('AgnosticAct', ActModel);
		this._componentTypeMap.set('AgnosticScene', SceneModel);
		this._componentTypeMap.set('AgnosticSession', SessionModel);
		this._componentTypeMap.set('AgnosticCharacter', CharacterModel);
		this._componentTypeMap.set('AgnosticNonPlayerCharacter', CharacterModel);
		this._componentTypeMap.set('AgnosticFaction', FactionModel);
		this._componentTypeMap.set('AgnosticClue', ClueModel);
		this._componentTypeMap.set('AgnosticLocation', LocationModel);
		this._componentTypeMap.set('AgnosticEvent', EventModel);
		this._componentTypeMap.set('AgnosticMusic', MusicModel);
		this._componentTypeMap.set('AgnosticSubplot', SubplotModel);
	}

	public create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ModelInterface {
		let dataKey = CampaignSetting[settings] + ComponentType[id.type];
		if (!this._componentTypeMap.has(dataKey)) dataKey = CampaignSetting[CampaignSetting.Agnostic] + ComponentType[id.type];
		if (!this._componentTypeMap.has(dataKey)) throw new Error('Type of interfaces ' + CampaignSetting[settings] + ComponentType[id.type] + ' cannot be found');

		return new (this._componentTypeMap.get(dataKey))(this.app, settings, id, file);
	}
}
