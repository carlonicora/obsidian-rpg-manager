import {AbstractFactory} from "../abstracts/AbstractFactory";
import {App, TFile} from "obsidian";
import {CampaignSetting} from "../../src/components/campaign/enums/CampaignSetting";
import {IdInterface} from "../../src/services/idService/interfaces/IdInterface";
import {ComponentType} from "../../src/core/enums/ComponentType";
import {CampaignModel} from "../../src/components/campaign/models/CampaignModel";
import {ComponentFactoryInterface} from "../../src/core/interfaces/ComponentFactoryInterface";
import {ModelInterface} from "../../src/api/modelsManager/interfaces/ModelInterface";
import {AdventureModel} from "../../src/components/adventure/models/AdventureModel";
import {ActModel} from "../../src/components/act/models/ActModel";
import {SceneModel} from "../../src/components/scene/models/SceneModel";
import {SessionModel} from "../../src/components/session/models/SessionModel";
import {CharacterModel} from "../../src/components/character/models/CharacterModel";
import {FactionModel} from "../../src/components/faction/models/FactionModel";
import {ClueModel} from "../../src/components/clue/models/ClueModel";
import {LocationModel} from "../../src/components/location/models/LocationModel";
import {EventModel} from "../../src/components/event/models/EventModel";
import {MusicModel} from "../../src/components/music/models/MusicModel";
import {SubplotModel} from "../../src/components/subplot/models/SubplotModel";

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
