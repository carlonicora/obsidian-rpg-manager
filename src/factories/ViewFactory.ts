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
import {WorkspaceLeaf} from "obsidian";

const ViewsMap = {
	AgnosticString: StringView,
	AgnosticTable: TableView,
	AgnosticBanner: BannerView,
	AgnosticBox: BoxView,
	AgnosticBreadcrumb: BreadcrumbView,
	AgnosticTimeline: TimelineView,
	AgnosticImage: ImageView,
	AgnosticHeader: HeaderView,
	AgnosticAbtPlot: AbtPlotView,
	AgnosticStoryCirclePlot: StoryCirclePlotView,
	RawRawCharacterRecordSheet: RawCharacterRecordSheetView,
};
type ViewsMapType = typeof ViewsMap;
type ViewKeys = keyof ViewsMapType;
type Tuples<T> = T extends ViewKeys ? [T, InstanceType<ViewsMapType[T]>] : never;
type SingleViewKey<K> = [K] extends (K extends ViewKeys ? [K] : never) ? K : never;
type ViewClassType<A extends ViewKeys> = Extract<Tuples<ViewKeys>, [A, any]>[1];

export class ViewFactory extends AbstractFactory {
	public create<K extends ViewKeys>(
		settings: CampaignSetting,
		type: ResponseType,
		sourcePath: string,
	): ViewClassType<K> {

		let viewKey: SingleViewKey<K> = CampaignSetting[settings] + ResponseType[type] as SingleViewKey<K>;
		if (ViewsMap[viewKey] == null && settings !== CampaignSetting.Agnostic){
			viewKey = CampaignSetting[CampaignSetting.Agnostic] + ResponseType[type] as SingleViewKey<K>;
		}
		return new ViewsMap[viewKey](this.app, sourcePath);
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
