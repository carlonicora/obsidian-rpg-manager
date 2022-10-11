import {TableView} from "../subViews/TableView";
import {BreadcrumbView} from "../subViews/BreadcrumbView";
import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {CampaignSetting} from "../../components/components/campaign/enums/CampaignSetting";
import {ResponseType} from "../../responses/enums/ResponseType";
import {ViewType} from "../enums/ViewType";
import {App, WorkspaceLeaf} from "obsidian";
import {ViewFactoryInterface} from "./interfaces/ViewFactoryInterface";
import {ViewInterface} from "../interfaces/ViewInterface";
import {ComponentType} from "../../components/enums/ComponentType";
import {AbstractRpgManagerView} from "../../abstracts/AbstractRpgManagerView";
import {ActHeaderView} from "../../components/components/act/views/ActHeaderView";
import {AdventureHeaderView} from "../../components/components/adventure/views/AdventureHeaderView";
import {CampaignHeaderView} from "../../components/components/campaign/views/CampaignHeaderView";
import {CharacterHeaderView} from "../../components/components/character/views/CharacterHeaderView";
import {ClueHeaderView} from "../../components/components/clue/views/ClueHeaderView";
import {EventHeaderView} from "../../components/components/event/views/EventHeaderView";
import {FactionHeaderView} from "../../components/components/faction/views/FactionHeaderView";
import {LocationHeaderView} from "../../components/components/location/views/LocationHeaderView";
import {MusicHeaderView} from "../../components/components/music/views/MusicHeaderView";
import {SceneHeaderView} from "../../components/components/scene/views/SceneHeaderView";
import {SessionHeaderView} from "../../components/components/session/views/SessionHeaderView";
import {SubplotHeaderView} from "../../components/components/subplot/views/SubplotHeaderView";

export class ViewFactory extends AbstractFactory implements ViewFactoryInterface{
	private viewTypeMap: Map<string,any>;
	private showInRightLeaf: Map<ViewType, boolean>;

	constructor(
		app: App,
	) {
		super(app);
		this.viewTypeMap = new Map();
		this.viewTypeMap.set('AgnosticTable', TableView);
		this.viewTypeMap.set('AgnosticBreadcrumb', BreadcrumbView);

		this.viewTypeMap.set('AgnosticActHeader', ActHeaderView);
		this.viewTypeMap.set('AgnosticAdventureHeader', AdventureHeaderView);
		this.viewTypeMap.set('AgnosticCampaignHeader', CampaignHeaderView);
		this.viewTypeMap.set('AgnosticCharacterHeader', CharacterHeaderView);
		this.viewTypeMap.set('AgnosticClueHeader', ClueHeaderView);
		this.viewTypeMap.set('AgnosticEventHeader', EventHeaderView);
		this.viewTypeMap.set('AgnosticFactionHeader', FactionHeaderView);
		this.viewTypeMap.set('AgnosticLocationHeader', LocationHeaderView);
		this.viewTypeMap.set('AgnosticMusicHeader', MusicHeaderView);
		this.viewTypeMap.set('AgnosticSceneHeader', SceneHeaderView);
		this.viewTypeMap.set('AgnosticSessionHeader', SessionHeaderView);
		this.viewTypeMap.set('AgnosticSubplotHeader', SubplotHeaderView);


		this.showInRightLeaf = new Map<ViewType, boolean>();
		this.showInRightLeaf.set(ViewType.RPGManager, true);
		this.showInRightLeaf.set(ViewType.Errors, true);
		this.showInRightLeaf.set(ViewType.ReleaseNote, false);
		this.showInRightLeaf.set(ViewType.Timeline, false);
	}
	
	public create(
		settings: CampaignSetting,
		type: ResponseType,
		sourcePath: string,
	): ViewInterface {
		let viewKey:string = CampaignSetting[settings] + ResponseType[type];
		if (!this.viewTypeMap.has(viewKey)) viewKey = CampaignSetting[CampaignSetting.Agnostic] + ResponseType[type];
		if (!this.viewTypeMap.has(viewKey)) throw new Error('Type of modal ' + CampaignSetting[settings] + ComponentType[type] + ' cannot be found');

		return new (this.viewTypeMap.get(viewKey))(this.app, sourcePath);
	}

	public async showObsidianView(
		viewType: ViewType,
		params: Array<any> = [],
	): Promise<void> {
		this.app.workspace.detachLeavesOfType(viewType.toString());

		const showInRightLeaf: boolean|undefined = this.showInRightLeaf.get(viewType);

		if (showInRightLeaf === true || showInRightLeaf === undefined) {
			await this.app.workspace.getRightLeaf(false).setViewState({
				type: viewType.toString(),
				active: true,
			});
		} else {
			await this.app.workspace.getLeaf(true).setViewState({
				type: viewType.toString(),
				active: true,
			});
		}

		const leaf: WorkspaceLeaf = this.app.workspace.getLeavesOfType(viewType.toString())[0];
		const view: AbstractRpgManagerView = leaf.view as AbstractRpgManagerView;

		this.app.workspace.revealLeaf(leaf);

		view.initialise(params);
		view.render();
	}
}
