import {AdventureModel} from "../models/components/AdventureModel";
import {CampaignModel} from "../models/components/CampaignModel";
import {ClueModel} from "../models/components/ClueModel";
import {EventModel} from "../models/components/EventModel";
import {FactionModel} from "../models/components/FactionModel";
import {LocationModel} from "../models/components/LocationModel";
import {NpcModel} from "../models/components/NpcModel";
import {PcModel} from "../models/components/PcModel";
import {SceneModel} from "../models/components/SceneModel";
import {ActModel} from "../models/components/ActModel";
import {ActNavigationModel} from "../models/components/ActNavigationModel";
import {AdventureNavigationModel} from "../models/components/AdventureNavigationModel";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {MusicModel} from "../models/components/MusicModel";
import {App} from "obsidian";
import {ModelInterface} from "../interfaces/ModelInterface";
import {ModelFactoryInterface} from "../interfaces/factories/ModelFactoryInterface";
import {CampaignNavigationModel} from "../models/components/CampaignNavigationModel";
import {SessionModel} from "../models/components/SessionModel";
import {SessionNavigationModel} from "../models/components/SessionNavigationModel";
import {SceneNavigationModel} from "../models/components/SceneNavigationModel";
import {SubplotModel} from "../models/components/SubplotModel";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";

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
		this.modelTypeMap.set('AgnosticMusic', MusicModel);
		this.modelTypeMap.set('AgnosticSubplot', SubplotModel);
	}

	public create(
		settings: CampaignSetting,
		modelName: string,
		currentElement: ComponentV2Interface,
		source: string,
		sourcePath: string,
		sourceMeta: any,
	): ModelInterface {
		let modelKey = CampaignSetting[settings] + modelName;
		if (!this.modelTypeMap.has(modelKey)) modelKey = CampaignSetting[CampaignSetting.Agnostic] + modelName;
		if (!this.modelTypeMap.has(modelKey)) throw new Error('Type of components ' + CampaignSetting[settings] + modelName + ' cannot be found');

		return new (this.modelTypeMap.get(modelKey))(this.app, currentElement, source, sourcePath, sourceMeta);
	}
}
