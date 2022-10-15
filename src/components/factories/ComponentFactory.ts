import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {App, TFile} from "obsidian";
import {CampaignSetting} from "../components/campaign/enums/CampaignSetting";
import {IdInterface} from "../../id/interfaces/IdInterface";
import {ComponentType} from "../enums/ComponentType";
import {Campaign} from "../components/campaign/Campaign";
import {ComponentFactoryInterface} from "./interfaces/ComponentFactoryInterface";
import {ComponentInterface} from "../interfaces/ComponentInterface";
import {Adventure} from "../components/adventure/Adventure";
import {Act} from "../components/act/Act";
import {Scene} from "../components/scene/Scene";
import {Session} from "../components/session/Session";
import {Character} from "../components/character/Character";
import {Faction} from "../components/faction/Faction";
import {Clue} from "../components/clue/Clue";
import {Location} from "../components/location/Location";
import {Event} from "../components/event/Event";
import {Music} from "../components/music/Music";
import {Subplot} from "../components/subplot/Subplot";

export class ComponentFactory extends AbstractFactory implements ComponentFactoryInterface{
	private _componentTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);

		this._componentTypeMap = new Map<string, any>();
		this._componentTypeMap.set('AgnosticCampaign', Campaign);
		this._componentTypeMap.set('AgnosticAdventure', Adventure);
		this._componentTypeMap.set('AgnosticAct', Act);
		this._componentTypeMap.set('AgnosticScene', Scene);
		this._componentTypeMap.set('AgnosticSession', Session);
		this._componentTypeMap.set('AgnosticCharacter', Character);
		this._componentTypeMap.set('AgnosticNonPlayerCharacter', Character);
		this._componentTypeMap.set('AgnosticFaction', Faction);
		this._componentTypeMap.set('AgnosticClue', Clue);
		this._componentTypeMap.set('AgnosticLocation', Location);
		this._componentTypeMap.set('AgnosticEvent', Event);
		this._componentTypeMap.set('AgnosticMusic', Music);
		this._componentTypeMap.set('AgnosticSubplot', Subplot);
	}

	public create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ComponentInterface {
		let dataKey = CampaignSetting[settings] + ComponentType[id.type];
		if (!this._componentTypeMap.has(dataKey)) dataKey = CampaignSetting[CampaignSetting.Agnostic] + ComponentType[id.type];
		if (!this._componentTypeMap.has(dataKey)) throw new Error('Type of interfaces ' + CampaignSetting[settings] + ComponentType[id.type] + ' cannot be found');

		return new (this._componentTypeMap.get(dataKey))(this.app, settings, id, file);
	}
}
