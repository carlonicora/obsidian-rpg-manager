import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {App} from "obsidian";
import {ModelInterface} from "../interfaces/ModelInterface";
import {ModelFactoryInterface} from "../interfaces/factories/ModelFactoryInterface";
import {ComponentInterface} from "../database/interfaces/ComponentInterface";
import {ActHeaderSubModel} from "../models/subModels/headers/ActHeaderSubModel";
import {ComponentType} from "../enums/ComponentType";
import {HeaderModel} from "../models/HeaderModel";
import {CampaignHeaderSubModel} from "../models/subModels/headers/CampaignHeaderSubModel";
import {AdventureHeaderSubModel} from "../models/subModels/headers/AdventureHeaderSubModel";
import {SceneHeaderSubModel} from "../models/subModels/headers/SceneHeaderSubModel";
import {SessionHeaderSubModel} from "../models/subModels/headers/SessionHeaderSubModel";
import {SubplotHeaderSubModel} from "../models/subModels/headers/SubplotHeaderSubModel";
import {CharacterHeaderSubModel} from "../models/subModels/headers/CharacterHeaderSubModel";
import {ClueHeaderSubModel} from "../models/subModels/headers/ClueHeaderSubModel";
import {EventHeaderSubModel} from "../models/subModels/headers/EventHeaderSubModel";
import {LocationHeaderSubModel} from "../models/subModels/headers/LocationHeaderSubModel";
import {FactionHeaderSubModel} from "../models/subModels/headers/FactionHeaderSubModel";
import {MusicHeaderSubModel} from "../models/subModels/headers/MusicHeaderSubModel";
import {AbtPlotSubModel} from "../models/subModels/AbtPlotSubModel";
import {StoryCirclePlotSubModel} from "../models/subModels/StoryCirclePlotSubModel";

export class ModelFactory extends AbstractFactory implements ModelFactoryInterface{
	private modelTypeMap: Map<string,any>;

	private subModels: Map<string, any>;

	constructor(
		app: App,
	) {
		super(app);

		this.subModels = new Map<string, any>([
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Campaign, 'Header'), CampaignHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Adventure, 'Header'), AdventureHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Act, 'Header'), ActHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Scene, 'Header'), SceneHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Session, 'Header'), SessionHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Subplot, 'Header'), SubplotHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Character, 'Header'), CharacterHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.NonPlayerCharacter, 'Header'), CharacterHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Clue, 'Header'), ClueHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Event, 'Header'), EventHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Location, 'Header'), LocationHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Faction, 'Header'), FactionHeaderSubModel],
			[this._createSubModelIdentifier(CampaignSetting.Agnostic, ComponentType.Music, 'Header'), MusicHeaderSubModel],
			[this._createSubModelIdentifier(undefined, undefined, 'AbtPlot'), AbtPlotSubModel],
			[this._createSubModelIdentifier(undefined, undefined, 'StoryCirclePlot'), StoryCirclePlotSubModel],
		]);
		
		this.modelTypeMap = new Map([
			['AgnosticHeader', HeaderModel],
		]);
		/*
		this.modelTypeMap.set('AgnosticAdventure', AdventureModel);
		this.modelTypeMap.set('AgnosticAdventureNavigation', AdventureNavigationModel);
		this.modelTypeMap.set('AgnosticCampaign', CampaignModel);
		this.modelTypeMap.set('AgnosticCampaignNavigation', CampaignNavigationModel);
		this.modelTypeMap.set('AgnosticClue', ClueModel);
		this.modelTypeMap.set('AgnosticEvent', EventModel);
		this.modelTypeMap.set('AgnosticFaction', FactionModel);
		this.modelTypeMap.set('AgnosticLocation', LocationModel);
		this.modelTypeMap.set('AgnosticNpc', NpcModel);
		this.modelTypeMap.set('AgnosticPc', PcModel);
		this.modelTypeMap.set('AgnosticScene', SceneModel);
		this.modelTypeMap.set('AgnosticSceneNavigation', SceneNavigationModel);
		this.modelTypeMap.set('AgnosticSession', SessionModel);
		this.modelTypeMap.set('AgnosticSessionNavigation', SessionNavigationModel);
		this.modelTypeMap.set('AgnosticAct', ActModel);
		this.modelTypeMap.set('AgnosticActNavigation', ActNavigationModel);
		this.modelTypeMap.set('AgnosticMusic', MusicModel);
		this.modelTypeMap.set('AgnosticSubplot', SubplotModel);
		*/
	}

	public create(
		settings: CampaignSetting,
		modelName: string,
		currentElement: ComponentInterface,
		source: string,
		sourcePath: string,
		sourceMeta: any,
	): ModelInterface {
		let modelKey = CampaignSetting[settings] + modelName;
		if (!this.modelTypeMap.has(modelKey)) modelKey = CampaignSetting[CampaignSetting.Agnostic] + modelName;
		if (!this.modelTypeMap.has(modelKey)) throw new Error('Type of interfaces ' + CampaignSetting[settings] + modelName + ' cannot be found');

		return new (this.modelTypeMap.get(modelKey))(this.app, currentElement, source, sourcePath, sourceMeta);
	}

	public createSubModel(
		settings: CampaignSetting,
		type: ComponentType,
		subModelName: string,
	): any {
		if (this.subModels.has(this._createSubModelIdentifier(settings, type, subModelName))){
			return this.subModels.get(this._createSubModelIdentifier(settings, type, subModelName));
		} else {
			return this.subModels.get(this._createSubModelIdentifier(CampaignSetting.Agnostic, type, subModelName));
		}
	}

	private _createSubModelIdentifier(
		settings: CampaignSetting|undefined,
		type: ComponentType|undefined,
		subModelName: string,
	): string {
		return (settings !== undefined ? settings.toString() : '') + '.' + (type !== undefined ? type.toString() : '') + '.' + subModelName;
	}
}
