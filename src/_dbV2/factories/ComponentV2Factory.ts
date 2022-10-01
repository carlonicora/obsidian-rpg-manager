import {AbstractFactory} from "../../abstracts/AbstractFactory";
import {App, TFile} from "obsidian";
import {CampaignSetting} from "../../enums/CampaignSetting";
import {IdInterface} from "../../interfaces/IdInterface";
import {ComponentType} from "../../enums/ComponentType";
import {CampaignV2} from "../components/CampaignV2";
import {ComponentV2FactoryInterface} from "./interfaces/ComponentV2FactoryInterface";
import {ComponentV2Interface} from "../interfaces/ComponentV2Interface";
import {AdventureV2} from "../components/AdventureV2";
import {ActV2} from "../components/ActV2";
import {SceneV2} from "../components/SceneV2";
import {SessionV2} from "../components/SessionV2";
import {CharacterV2} from "../components/CharacterV2";
import {FactionV2} from "../components/FactionV2";
import {ClueV2} from "../components/ClueV2";
import {LocationV2} from "../components/LocationV2";
import {EventV2} from "../components/EventV2";
import {MusicV2} from "../components/MusicV2";
import {SubplotV2} from "../components/SubplotV2";

export class ComponentV2Factory extends AbstractFactory implements ComponentV2FactoryInterface{
	private componentTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);

		this.componentTypeMap = new Map<string, any>();
		this.componentTypeMap.set('AgnosticCampaign', CampaignV2);
		this.componentTypeMap.set('AgnosticAdventure', AdventureV2);
		this.componentTypeMap.set('AgnosticAct', ActV2);
		this.componentTypeMap.set('AgnosticScene', SceneV2);
		this.componentTypeMap.set('AgnosticSession', SessionV2);
		this.componentTypeMap.set('AgnosticCharacter', CharacterV2);
		this.componentTypeMap.set('AgnosticNonPlayerCharacter', CharacterV2);
		this.componentTypeMap.set('AgnosticFaction', FactionV2);
		this.componentTypeMap.set('AgnosticClue', ClueV2);
		this.componentTypeMap.set('AgnosticLocation', LocationV2);
		this.componentTypeMap.set('AgnosticEvent', EventV2);
		this.componentTypeMap.set('AgnosticMusic', MusicV2);
		this.componentTypeMap.set('AgnosticSubplot', SubplotV2);
	}

	public create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ComponentV2Interface {
		let dataKey = CampaignSetting[settings] + ComponentType[id.type];
		if (!this.componentTypeMap.has(dataKey)) dataKey = CampaignSetting[CampaignSetting.Agnostic] + ComponentType[id.type];
		if (!this.componentTypeMap.has(dataKey)) throw new Error('Type of components ' + CampaignSetting[settings] + ComponentType[id.type] + ' cannot be found');

		return new (this.componentTypeMap.get(dataKey))(this.app, settings, id, file);
	}
}
