import {App, TFile} from "obsidian";
import {RecordType} from "../enums/RecordType";
import {Campaign} from "../data/Campaign";
import {Adventure} from "../data/Adventure";
import {Act} from "../data/Act";
import {Scene} from "../data/Scene";
import {Character} from "../data/Character";
import {Faction} from "../data/Faction";
import {Clue} from "../data/Clue";
import {Location} from "../data/Location";
import {Event} from "../data/Event";
import {Timeline} from "../data/Timeline";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {VampireCharacter} from "../rpgs/Vampire/data/VampireCharacter";
import {RawCampaign} from "../rpgs/Raw/data/RawCampaign";
import {Music} from "../data/Music";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {DataFactoryInterface} from "../interfaces/factories/DataFactoryInterface";
import {IdInterface} from "../interfaces/data/IdInterface";
import {Session} from "../data/Session";

export class DataFactory extends AbstractFactory implements DataFactoryInterface{
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
			['AgnosticTimeline', Timeline],
			['VampireCharacter', VampireCharacter],
			['VampireNonPlayerCharacter', VampireCharacter],
			['RawCampaign', RawCampaign],
			['AgnosticMusic', Music],
		]);
	}

	public create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): RecordInterface {
		let dataKey = CampaignSetting[settings] + RecordType[id.type];
		if (!this.recordTypeMap.has(dataKey)) dataKey = CampaignSetting[CampaignSetting.Agnostic] + RecordType[id.type];
		if (!this.recordTypeMap.has(dataKey)) throw new Error('Type of data ' + CampaignSetting[settings] + RecordType[id.type] + ' cannot be found');

		return new (this.recordTypeMap.get(dataKey))(this.app, file, id);
	}
}
