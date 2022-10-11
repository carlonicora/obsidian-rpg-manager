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
