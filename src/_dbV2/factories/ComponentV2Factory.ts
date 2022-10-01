import {AbstractFactory} from "../../abstracts/AbstractFactory";
import {App, TFile} from "obsidian";
import {CampaignSetting} from "../../enums/CampaignSetting";
import {IdInterface} from "../../interfaces/components/IdInterface";
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
	private recordTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);

		this.recordTypeMap = new Map<string, any>();
		this.recordTypeMap.set('AgnosticCampaign', CampaignV2);
		this.recordTypeMap.set('AgnosticAdventure', AdventureV2);
		this.recordTypeMap.set('AgnosticAct', ActV2);
		this.recordTypeMap.set('AgnosticScene', SceneV2);
		this.recordTypeMap.set('AgnosticSession', SessionV2);
		this.recordTypeMap.set('AgnosticCharacter', CharacterV2);
		this.recordTypeMap.set('AgnosticNonPlayerCharacter', CharacterV2);
		this.recordTypeMap.set('AgnosticFaction', FactionV2);
		this.recordTypeMap.set('AgnosticClue', ClueV2);
		this.recordTypeMap.set('AgnosticLocation', LocationV2);
		this.recordTypeMap.set('AgnosticEvent', EventV2);
		this.recordTypeMap.set('AgnosticMusic', MusicV2);
		this.recordTypeMap.set('AgnosticSubplot', SubplotV2);
	}

	public create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ComponentV2Interface {
		let dataKey = CampaignSetting[settings] + ComponentType[id.type];
		if (!this.recordTypeMap.has(dataKey)) dataKey = CampaignSetting[CampaignSetting.Agnostic] + ComponentType[id.type];
		if (!this.recordTypeMap.has(dataKey)) throw new Error('Type of components ' + CampaignSetting[settings] + ComponentType[id.type] + ' cannot be found');

		return new (this.recordTypeMap.get(dataKey))(this.app, settings, id, file);
	}
}
