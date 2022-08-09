import {RpgAbstractView} from "../abstracts/RpgAbstractView";
import {RpgFunctions} from "../data/RpgFunctions";
import {App, Component, MarkdownPostProcessorContext} from "obsidian";
import {RpgNpcView} from "../views/RpgNpcView";
import {RpgErrorView} from "../views/RpgErrorView";
import {RpgAdventureView} from "../views/RpgAdventureView";
import {RpgCampaignView} from "../views/RpgCampaignView";
import {RpgClueView} from "../views/RpgClueView";
import {RpgEventView} from "../views/RpgEventView";
import {RpgFactionView} from "../views/RpgFactionView";
import {RpgLocationView} from "../views/RpgLocationView";
import {RpgNotesView} from "../views/RpgNotesView";
import {RpgPcView} from "../views/RpgPcView";
import {RpgSceneView} from "../views/RpgSceneView";
import {RpgSessionView} from "../views/RpgSessionView";
import {RpgSessionNavigationView} from "../views/RpgSessionNavigationView";

export class RpgViewFactory {
	public static create(
		functions: RpgFunctions,
		app: App,
		container: HTMLElement,
		source: string,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string,
	): RpgAbstractView {
		switch (source.replace(/[\n\r]/g, '').toLowerCase()) {
			case 'adventure':
				return new RpgAdventureView(functions, app, container, source, component, sourcePath);
				break;
			case 'campaign':
				return new RpgCampaignView(functions, app, container, source, component, sourcePath);
				break;
			case 'clue':
				return new RpgClueView(functions, app, container, source, component, sourcePath);
				break;
			case 'event':
				return new RpgEventView(functions, app, container, source, component, sourcePath);
				break;
			case 'faction':
				return new RpgFactionView(functions, app, container, source, component, sourcePath);
				break;
			case 'location':
				return new RpgLocationView(functions, app, container, source, component, sourcePath);
				break;
			case 'npc':
				return new RpgNpcView(functions, app, container, source, component, sourcePath);
				break;
			case 'notes':
				return new RpgNotesView(functions, app, container, source, component, sourcePath);
				break;
			case 'pc':
				return new RpgPcView(functions, app, container, source, component, sourcePath);
				break;
			case 'scene':
				return new RpgSceneView(functions, app, container, source, component, sourcePath);
				break;
			case 'session':
				return new RpgSessionView(functions, app, container, source, component, sourcePath);
				break;
			case 'sessionnavigator':
				return new RpgSessionNavigationView(functions, app, container, source, component, sourcePath);
				break;
			default:
				return new RpgErrorView(functions, app, container, source, component, sourcePath);
				break;
		}
	}
}
