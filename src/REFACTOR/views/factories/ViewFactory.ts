import {TableView} from "../subViews/TableView";
import {BreadcrumbView} from "../subViews/BreadcrumbView";
import {AbstractFactory} from "../../../core/abstracts/AbstractFactory";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ResponseType} from "../../../responses/enums/ResponseType";
import {ViewType} from "../enums/ViewType";
import {App, WorkspaceLeaf} from "obsidian";
import {ViewFactoryInterface} from "./interfaces/ViewFactoryInterface";
import {ViewInterface} from "../interfaces/ViewInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {AbstractRpgManagerView} from "../../../core/abstracts/AbstractRpgManagerView";
import {ActHeaderView} from "../../../components/act/views/ActHeaderView";
import {AdventureHeaderView} from "../../../components/adventure/views/AdventureHeaderView";
import {CampaignHeaderView} from "../../../components/campaign/views/CampaignHeaderView";
import {CharacterHeaderView} from "../../../components/character/views/CharacterHeaderView";
import {ClueHeaderView} from "../../../components/clue/views/ClueHeaderView";
import {EventHeaderView} from "../../../components/event/views/EventHeaderView";
import {FactionHeaderView} from "../../../components/faction/views/FactionHeaderView";
import {LocationHeaderView} from "../../../components/location/views/LocationHeaderView";
import {MusicHeaderView} from "../../../components/music/views/MusicHeaderView";
import {SceneHeaderView} from "../../../components/scene/views/SceneHeaderView";
import {SessionHeaderView} from "../../../components/session/views/SessionHeaderView";
import {SubplotHeaderView} from "../../../components/subplot/views/SubplotHeaderView";

export class ViewFactory extends AbstractFactory implements ViewFactoryInterface{
	private _viewTypeMap: Map<string,any>;
	private _showInRightLeaf: Map<ViewType, boolean>;

	constructor(
		app: App,
	) {
		super(app);
		this._viewTypeMap = new Map();
		this._viewTypeMap.set('AgnosticTable', TableView);
		this._viewTypeMap.set('AgnosticBreadcrumb', BreadcrumbView);

		this._viewTypeMap.set('AgnosticActHeader', ActHeaderView);
		this._viewTypeMap.set('AgnosticAdventureHeader', AdventureHeaderView);
		this._viewTypeMap.set('AgnosticCampaignHeader', CampaignHeaderView);
		this._viewTypeMap.set('AgnosticCharacterHeader', CharacterHeaderView);
		this._viewTypeMap.set('AgnosticClueHeader', ClueHeaderView);
		this._viewTypeMap.set('AgnosticEventHeader', EventHeaderView);
		this._viewTypeMap.set('AgnosticFactionHeader', FactionHeaderView);
		this._viewTypeMap.set('AgnosticLocationHeader', LocationHeaderView);
		this._viewTypeMap.set('AgnosticMusicHeader', MusicHeaderView);
		this._viewTypeMap.set('AgnosticSceneHeader', SceneHeaderView);
		this._viewTypeMap.set('AgnosticSessionHeader', SessionHeaderView);
		this._viewTypeMap.set('AgnosticSubplotHeader', SubplotHeaderView);


		this._showInRightLeaf = new Map<ViewType, boolean>();
		this._showInRightLeaf.set(ViewType.RPGManager, true);
		this._showInRightLeaf.set(ViewType.Errors, true);
		this._showInRightLeaf.set(ViewType.ReleaseNote, false);
		this._showInRightLeaf.set(ViewType.Timeline, false);
	}
	
	public create(
		settings: CampaignSetting,
		type: ResponseType,
		sourcePath: string,
	): ViewInterface {
		let viewKey:string = CampaignSetting[settings] + ResponseType[type];
		if (!this._viewTypeMap.has(viewKey)) viewKey = CampaignSetting[CampaignSetting.Agnostic] + ResponseType[type];
		if (!this._viewTypeMap.has(viewKey)) throw new Error('Type of modal ' + CampaignSetting[settings] + ComponentType[type] + ' cannot be found');

		return new (this._viewTypeMap.get(viewKey))(this.app, sourcePath);
	}

	public async showObsidianView(
		viewType: ViewType,
		params: any[] = [],
	): Promise<void> {
		this.app.workspace.detachLeavesOfType(viewType.toString());

		const showInRightLeaf: boolean|undefined = this._showInRightLeaf.get(viewType);

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
