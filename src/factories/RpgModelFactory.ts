import {AbstractModel} from "../abstracts/AbstractModel";
import {RpgFunctions} from "../data/RpgFunctions";
import {App, Component, MarkdownPostProcessorContext} from "obsidian";
import {RpgNpcModel} from "../models/RpgNpcModel";
import {RpgErrorModel} from "../models/RpgErrorModel";
import {RpgAdventureModel} from "../models/RpgAdventureModel";
import {RpgCampaignModel} from "../models/RpgCampaignModel";
import {RpgClueModel} from "../models/RpgClueModel";
import {RpgEventModel} from "../models/RpgEventModel";
import {RpgFactionModel} from "../models/RpgFactionModel";
import {RpgLocationModel} from "../models/RpgLocationModel";
import {RpgNotesModel} from "../models/RpgNotesModel";
import {RpgPcModel} from "../models/RpgPcModel";
import {RpgSceneModel} from "../models/RpgSceneModel";
import {RpgSessionModel} from "../models/RpgSessionModel";
import {RpgSessionNavigationModel} from "../models/RpgSessionNavigationModel";
import {RpgTimelineModel} from "../models/RpgTimelineModel";

export class RpgModelFactory {
	public static create(
		functions: RpgFunctions,
		app: App,
		container: HTMLElement,
		source: string,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string,
	): AbstractModel {
		switch (source.replace(/[\n\r]/g, '').toLowerCase()) {
			case 'adventure':
				return new RpgAdventureModel(functions, app, container, source, component, sourcePath);
				break;
			case 'campaign':
				return new RpgCampaignModel(functions, app, container, source, component, sourcePath);
				break;
			case 'clue':
				return new RpgClueModel(functions, app, container, source, component, sourcePath);
				break;
			case 'event':
				return new RpgEventModel(functions, app, container, source, component, sourcePath);
				break;
			case 'faction':
				return new RpgFactionModel(functions, app, container, source, component, sourcePath);
				break;
			case 'location':
				return new RpgLocationModel(functions, app, container, source, component, sourcePath);
				break;
			case 'npc':
				return new RpgNpcModel(functions, app, container, source, component, sourcePath);
				break;
			case 'notes':
				return new RpgNotesModel(functions, app, container, source, component, sourcePath);
				break;
			case 'pc':
				return new RpgPcModel(functions, app, container, source, component, sourcePath);
				break;
			case 'scene':
				return new RpgSceneModel(functions, app, container, source, component, sourcePath);
				break;
			case 'session':
				return new RpgSessionModel(functions, app, container, source, component, sourcePath);
				break;
			case 'sessionnavigator':
				return new RpgSessionNavigationModel(functions, app, container, source, component, sourcePath);
				break;
			case 'timeline':
				return new RpgTimelineModel(functions, app, container, source, component, sourcePath);
				break;
			default:
				return new RpgErrorModel(functions, app, container, source, component, sourcePath);
				break;
		}
	}
}
