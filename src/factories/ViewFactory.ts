import {TableView} from "../views/subViews/TableView";
import {BreadcrumbView} from "../views/subViews/BreadcrumbView";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {HeaderView} from "../views/subViews/HeaderView";
import {CampaignSetting} from "../enums/CampaignSetting";
import {ResponseType} from "../enums/ResponseType";
import {RawCharacterRecordSheetView} from "../rpgs/Raw/views/RawCharacterRecordSheetView";
import {ViewType} from "../enums/ViewType";
import {App, WorkspaceLeaf} from "obsidian";
import {ViewFactoryInterface} from "../interfaces/factories/ViewFactoryInterface";
import {ViewInterface} from "../interfaces/ViewInterface";
import {ComponentType} from "../enums/ComponentType";
import {AbstractRpgManagerView} from "../abstracts/AbstractRpgManagerView";

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
		this.viewTypeMap.set('AgnosticHeader', HeaderView);
		this.viewTypeMap.set('RawRawCharacterRecordSheet', RawCharacterRecordSheetView);

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
