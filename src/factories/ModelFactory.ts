import {AdventureModel} from "../models/AdventureModel";
import {CampaignModel} from "../models/CampaignModel";
import {ClueModel} from "../models/ClueModel";
import {EventModel} from "../models/EventModel";
import {FactionModel} from "../models/FactionModel";
import {LocationModel} from "../models/LocationModel";
import {NpcModel} from "../models/NpcModel";
import {PcModel} from "../models/PcModel";
import {SceneModel} from "../models/SceneModel";
import {ActModel} from "../models/ActModel";
import {ActNavigationModel} from "../models/ActNavigationModel";
import {AdventureNavigationModel} from "../models/AdventureNavigationModel";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {RawNpcModel} from "../rpgs/Raw/models/RawNpcModel";
import {MusicModel} from "../models/MusicModel";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {App} from "obsidian";
import {ModelInterface} from "../interfaces/ModelInterface";
import {ModelFactoryInterface} from "../interfaces/factories/ModelFactoryInterface";
import {CampaignNavigationModel} from "../models/CampaignNavigationModel";
import {SessionModel} from "../models/SessionModel";
import {SessionNavigationModel} from "../models/SessionNavigationModel";
import {SceneNavigationModel} from "../models/SceneNavigationModel";

export class ModelFactory extends AbstractFactory implements ModelFactoryInterface{
	private modelTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);
		
		this.modelTypeMap = new Map();
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
		this.modelTypeMap.set('RawNpc', RawNpcModel);
		this.modelTypeMap.set('AgnosticMusic', MusicModel);
	}

	public create(
		settings: CampaignSetting,
		modelName: string,
		currentElement: RecordInterface,
		source: string,
		sourcePath: string,
		sourceMeta: any,
	): ModelInterface {
		let modelKey = CampaignSetting[settings] + modelName;
		if (!this.modelTypeMap.has(modelKey)) modelKey = CampaignSetting[CampaignSetting.Agnostic] + modelName;
		if (!this.modelTypeMap.has(modelKey)) throw new Error('Type of data ' + CampaignSetting[settings] + modelName + ' cannot be found');

		return new (this.modelTypeMap.get(modelKey))(this.app, currentElement, source, sourcePath, sourceMeta);
	}
}
