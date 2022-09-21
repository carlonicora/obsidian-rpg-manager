import {StringView} from "../views/components/StringView";
import {TableView} from "../views/components/TableView";
import {BannerView} from "../views/components/BannerView";
import {BoxView} from "../views/components/BoxView";
import {BreadcrumbView} from "../views/components/BreadcrumbView";
import {TimelineView} from "../views/components/TimelineView";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ImageView} from "../views/components/ImageView";
import {HeaderView} from "../views/components/HeaderView";
import {AbtPlotView} from "../views/components/AbtPlotView";
import {StoryCirclePlotView} from "../views/components/StoryCirclePlotView";
import {CampaignSetting} from "../enums/CampaignSetting";
import {ResponseType} from "../enums/ResponseType";
import {RawCharacterRecordSheetView} from "../rpgs/Raw/views/RawCharacterRecordSheetView";
import {ViewType} from "../enums/ViewType";
import {AbstractView} from "../abstracts/AbstractView";
import {App, WorkspaceLeaf} from "obsidian";
import {ViewFactoryInterface} from "../interfaces/factories/ViewFactoryInterface";
import {ViewInterface} from "../interfaces/ViewInterface";
import {DataType} from "../enums/DataType";

export class ViewFactory extends AbstractFactory implements ViewFactoryInterface{
	private viewTypeMap: Map<string,any>;
	constructor(
		app: App,
	) {
		super(app);
		this.viewTypeMap = new Map();
		this.viewTypeMap.set('AgnosticString', StringView);
		this.viewTypeMap.set('AgnosticTable', TableView);
		this.viewTypeMap.set('AgnosticBanner', BannerView);
		this.viewTypeMap.set('AgnosticBox', BoxView);
		this.viewTypeMap.set('AgnosticBreadcrumb', BreadcrumbView);
		this.viewTypeMap.set('AgnosticTimeline', TimelineView);
		this.viewTypeMap.set('AgnosticImage', ImageView);
		this.viewTypeMap.set('AgnosticHeader', HeaderView);
		this.viewTypeMap.set('AgnosticAbtPlot', AbtPlotView);
		this.viewTypeMap.set('AgnosticStoryCirclePlot', StoryCirclePlotView);
		this.viewTypeMap.set('RawRawCharacterRecordSheet', RawCharacterRecordSheetView);
	}
	
	public create(
		settings: CampaignSetting,
		type: ResponseType,
		sourcePath: string,
	): ViewInterface {
		let viewKey:string = CampaignSetting[settings] + ResponseType[type];
		if (!this.viewTypeMap.has(viewKey)) viewKey = CampaignSetting[CampaignSetting.Agnostic] + ResponseType[type];
		if (!this.viewTypeMap.has(viewKey)) throw new Error('Type of modal ' + CampaignSetting[settings] + DataType[type] + ' cannot be found');

		return new (this.viewTypeMap.get(viewKey))(this.app, sourcePath);
	}

	public async showObsidianView(
		viewType: ViewType,
		params: Array<any> = [],
	): Promise<void> {
		this.app.workspace.detachLeavesOfType(viewType.toString());

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: viewType.toString(),
			active: true,
		});

		const leaf: WorkspaceLeaf = this.app.workspace.getLeavesOfType(viewType.toString())[0];

		const view: AbstractView = leaf.view as AbstractView;
		view.initialise(params);
		view.render();

		this.app.workspace.revealLeaf(leaf);
	}
}
