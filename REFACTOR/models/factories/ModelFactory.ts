import {AbstractFactory} from "../../abstracts/AbstractFactory";
import {CampaignSetting} from "../../../src/components/campaign/enums/CampaignSetting";
import {App} from "obsidian";
import {OldModelInterface} from "../interfaces/OldModelInterface";
import {ModelFactoryInterface} from "./interfaces/ModelFactoryInterface";
import {ModelInterface} from "../../../src/api/modelsManager/interfaces/ModelInterface";
import {ActHeaderSubModel} from "../../../src/components/act/models/ActHeaderSubModel";
import {ComponentType} from "../../../src/core/enums/ComponentType";
import {HeaderModel} from "../HeaderModel";
import {CampaignHeaderSubModel} from "../../../src/components/campaign/models/CampaignHeaderSubModel";
import {AdventureHeaderSubModel} from "../../../src/components/adventure/models/AdventureHeaderSubModel";
import {SceneHeaderSubModel} from "../../../src/components/scene/models/SceneHeaderSubModel";
import {SessionHeaderSubModel} from "../../../src/components/session/models/SessionHeaderSubModel";
import {SubplotHeaderSubModel} from "../../../src/components/subplot/models/SubplotHeaderSubModel";
import {CharacterHeaderSubModel} from "../../../src/components/character/models/CharacterHeaderSubModel";
import {ClueHeaderSubModel} from "../../../src/components/clue/models/ClueHeaderSubModel";
import {EventHeaderSubModel} from "../../../src/components/event/models/EventHeaderSubModel";
import {LocationHeaderSubModel} from "../../../src/components/location/models/LocationHeaderSubModel";
import {FactionHeaderSubModel} from "../../../src/components/faction/models/FactionHeaderSubModel";
import {MusicHeaderSubModel} from "../../../src/components/music/models/MusicHeaderSubModel";
import {AbtPlotSubModel} from "../../../src/services/plotsServices/models/AbtPlotSubModel";
import {StoryCirclePlotSubModel} from "../../../src/services/plotsServices/models/StoryCirclePlotSubModel";
import {ListModel} from "../ListModel";

export class ModelFactory extends AbstractFactory implements ModelFactoryInterface{
	private _modelTypeMap: Map<string,any>;
	private _subModels: Map<string, any>;

	constructor(
		app: App,
	) {
		super(app);

		this._subModels = new Map<string, any>([
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
		
		this._modelTypeMap = new Map([
			['AgnosticHeader', HeaderModel],
			['AgnosticList', ListModel]
		]);
	}

	public create(
		settings: CampaignSetting,
		modelName: string,
		currentComponent: ModelInterface,
		source: string,
		sourcePath: string,
		sourceMeta: any,
	): OldModelInterface {
		let modelKey = CampaignSetting[settings] + modelName;
		if (!this._modelTypeMap.has(modelKey)) modelKey = CampaignSetting[CampaignSetting.Agnostic] + modelName;
		if (!this._modelTypeMap.has(modelKey)) throw new Error('Type of interfaces ' + CampaignSetting[settings] + modelName + ' cannot be found');

		return new (this._modelTypeMap.get(modelKey))(this.app, currentComponent, source, sourcePath, sourceMeta);
	}

	public createSubModel(
		settings: CampaignSetting,
		type: ComponentType,
		subModelName: string,
	): any {
		if (this._subModels.has(this._createSubModelIdentifier(settings, type, subModelName))){
			return this._subModels.get(this._createSubModelIdentifier(settings, type, subModelName));
		} else {
			return this._subModels.get(this._createSubModelIdentifier(CampaignSetting.Agnostic, type, subModelName));
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
