import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {CampaignSetting} from "../../components/components/campaign/enums/CampaignSetting";
import {App} from "obsidian";
import {ModelInterface} from "../interfaces/ModelInterface";
import {ModelFactoryInterface} from "./interfaces/ModelFactoryInterface";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {ActHeaderSubModel} from "../../components/components/act/models/ActHeaderSubModel";
import {ComponentType} from "../../components/enums/ComponentType";
import {HeaderModel} from "../HeaderModel";
import {CampaignHeaderSubModel} from "../../components/components/campaign/models/CampaignHeaderSubModel";
import {AdventureHeaderSubModel} from "../../components/components/adventure/models/AdventureHeaderSubModel";
import {SceneHeaderSubModel} from "../../components/components/scene/models/SceneHeaderSubModel";
import {SessionHeaderSubModel} from "../../components/components/session/models/SessionHeaderSubModel";
import {SubplotHeaderSubModel} from "../../components/components/subplot/models/SubplotHeaderSubModel";
import {CharacterHeaderSubModel} from "../../components/components/character/models/CharacterHeaderSubModel";
import {ClueHeaderSubModel} from "../../components/components/clue/models/ClueHeaderSubModel";
import {EventHeaderSubModel} from "../../components/components/event/models/EventHeaderSubModel";
import {LocationHeaderSubModel} from "../../components/components/location/models/LocationHeaderSubModel";
import {FactionHeaderSubModel} from "../../components/components/faction/models/FactionHeaderSubModel";
import {MusicHeaderSubModel} from "../../components/components/music/models/MusicHeaderSubModel";
import {AbtPlotSubModel} from "../../plots/models/AbtPlotSubModel";
import {StoryCirclePlotSubModel} from "../../plots/models/StoryCirclePlotSubModel";
import {ListModel} from "../ListModel";

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
			['AgnosticList', ListModel]
		]);
	}

	public create(
		settings: CampaignSetting,
		modelName: string,
		currentComponent: ComponentInterface,
		source: string,
		sourcePath: string,
		sourceMeta: any,
	): ModelInterface {
		let modelKey = CampaignSetting[settings] + modelName;
		if (!this.modelTypeMap.has(modelKey)) modelKey = CampaignSetting[CampaignSetting.Agnostic] + modelName;
		if (!this.modelTypeMap.has(modelKey)) throw new Error('Type of interfaces ' + CampaignSetting[settings] + modelName + ' cannot be found');

		return new (this.modelTypeMap.get(modelKey))(this.app, currentComponent, source, sourcePath, sourceMeta);
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
