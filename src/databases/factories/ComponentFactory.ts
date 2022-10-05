import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {App, TFile} from "obsidian";
import {CampaignSetting} from "../enums/CampaignSetting";
import {IdInterface} from "../interfaces/IdInterface";
import {ComponentType} from "../enums/ComponentType";
import {Campaign} from "../components/Campaign";
import {ComponentFactoryInterface} from "./interfaces/ComponentFactoryInterface";
import {ComponentInterface} from "../interfaces/ComponentInterface";
import {Adventure} from "../components/Adventure";
import {Act} from "../components/Act";
import {Scene} from "../components/Scene";
import {Session} from "../components/Session";
import {Character} from "../components/Character";
import {Faction} from "../components/Faction";
import {Clue} from "../components/Clue";
import {Location} from "../components/Location";
import {Event} from "../components/Event";
import {Music} from "../components/Music";
import {Subplot} from "../components/Subplot";

export class ComponentFactory extends AbstractFactory implements ComponentFactoryInterface{
	private componentTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);

		this.componentTypeMap = new Map<string, any>();
		this.componentTypeMap.set('AgnosticCampaign', Campaign);
		this.componentTypeMap.set('AgnosticAdventure', Adventure);
		this.componentTypeMap.set('AgnosticAct', Act);
		this.componentTypeMap.set('AgnosticScene', Scene);
		this.componentTypeMap.set('AgnosticSession', Session);
		this.componentTypeMap.set('AgnosticCharacter', Character);
		this.componentTypeMap.set('AgnosticNonPlayerCharacter', Character);
		this.componentTypeMap.set('AgnosticFaction', Faction);
		this.componentTypeMap.set('AgnosticClue', Clue);
		this.componentTypeMap.set('AgnosticLocation', Location);
		this.componentTypeMap.set('AgnosticEvent', Event);
		this.componentTypeMap.set('AgnosticMusic', Music);
		this.componentTypeMap.set('AgnosticSubplot', Subplot);
	}

	public create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ComponentInterface {
		let dataKey = CampaignSetting[settings] + ComponentType[id.type];
		if (!this.componentTypeMap.has(dataKey)) dataKey = CampaignSetting[CampaignSetting.Agnostic] + ComponentType[id.type];
		if (!this.componentTypeMap.has(dataKey)) throw new Error('Type of interfaces ' + CampaignSetting[settings] + ComponentType[id.type] + ' cannot be found');

		return new (this.componentTypeMap.get(dataKey))(this.app, settings, id, file);
	}
}
