import {TableView} from "../views/subViews/TableView";
import {BreadcrumbView} from "../views/subViews/BreadcrumbView";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {ResponseType} from "../enums/ResponseType";
import {ViewType} from "../enums/ViewType";
import {App, WorkspaceLeaf} from "obsidian";
import {ViewFactoryInterface} from "../interfaces/factories/ViewFactoryInterface";
import {ViewInterface} from "../interfaces/ViewInterface";
import {ComponentType} from "../enums/ComponentType";
import {AbstractRpgManagerView} from "../abstracts/AbstractRpgManagerView";
import {ActHeaderView} from "../views/subViews/headers/ActHeaderView";
import {AdventureHeaderView} from "../views/subViews/headers/AdventureHeaderView";
import {CampaignHeaderView} from "../views/subViews/headers/CampaignHeaderView";
import {CharacterHeaderView} from "../views/subViews/headers/CharacterHeaderView";
import {ClueHeaderView} from "../views/subViews/headers/ClueHeaderView";
import {EventHeaderView} from "../views/subViews/headers/EventHeaderView";
import {FactionHeaderView} from "../views/subViews/headers/FactionHeaderView";
import {LocationHeaderView} from "../views/subViews/headers/LocationHeaderView";
import {MusicHeaderView} from "../views/subViews/headers/MusicHeaderView";
import {SceneHeaderView} from "../views/subViews/headers/SceneHeaderView";
import {SessionHeaderView} from "../views/subViews/headers/SessionHeaderView";
import {SubplotHeaderView} from "../views/subViews/headers/SubplotHeaderView";

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
