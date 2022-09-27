import {App, TFile} from "obsidian";
import {ComponentType} from "../enums/ComponentType";
import {Campaign} from "../components/Campaign";
import {Adventure} from "../components/Adventure";
import {Act} from "../components/Act";
import {Scene} from "../components/Scene";
import {Character} from "../components/Character";
import {Faction} from "../components/Faction";
import {Clue} from "../components/Clue";
import {Location} from "../components/Location";
import {Event} from "../components/Event";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {VampireCharacter} from "../rpgs/Vampire/data/VampireCharacter";
import {RawCampaign} from "../rpgs/Raw/data/RawCampaign";
import {Music} from "../components/Music";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";
import {ComponentFactoryInterface} from "../interfaces/factories/ComponentFactoryInterface";
import {IdInterface} from "../interfaces/components/IdInterface";
import {Session} from "../components/Session";
import {Subplot} from "../components/Subplot";

export class ComponentFactory extends AbstractFactory implements ComponentFactoryInterface{
	private recordTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);

		this.recordTypeMap = new Map([
			['AgnosticCampaign', Campaign],
			['AgnosticAdventure', Adventure],
			['AgnosticAct', Act],
			['AgnosticScene', Scene],
			['AgnosticSession', Session],
			['AgnosticCharacter', Character],
			['AgnosticNonPlayerCharacter', Character],
			['AgnosticFaction', Faction],
			['AgnosticClue', Clue],
			['AgnosticLocation', Location],
			['AgnosticEvent', Event],
			['VampireCharacter', VampireCharacter],
			['VampireNonPlayerCharacter', VampireCharacter],
			['RawCampaign', RawCampaign],
			['AgnosticMusic', Music],
			['AgnosticSubplot', Subplot],
		]);
	}

	public create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ComponentInterface {
		let dataKey = CampaignSetting[settings] + ComponentType[id.type];
		if (!this.recordTypeMap.has(dataKey)) dataKey = CampaignSetting[CampaignSetting.Agnostic] + ComponentType[id.type];
		if (!this.recordTypeMap.has(dataKey)) throw new Error('Type of components ' + CampaignSetting[settings] + ComponentType[id.type] + ' cannot be found');

		return new (this.recordTypeMap.get(dataKey))(this.app, file, id);
	}
}
