import {StringView} from "../settings/Agnostic/views/StringView";
import {TableView} from "../settings/Agnostic/views/TableView";
import {BannerView} from "../settings/Agnostic/views/BannerView";
import {BoxView} from "../settings/Agnostic/views/BoxView";
import {BreadcrumbView} from "../settings/Agnostic/views/BreadcrumbView";
import {TimelineView} from "../settings/Agnostic/views/TimelineView";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ImageView} from "../settings/Agnostic/views/ImageView";
import {HeaderView} from "../settings/Agnostic/views/HeaderView";
import {AbtPlotView} from "../settings/Agnostic/views/AbtPlotView";
import {StoryCirclePlotView} from "../settings/Agnostic/views/StoryCirclePlotView";
import {CampaignSetting} from "../enums/CampaignSetting";
import {ResponseType} from "../enums/ResponseType";

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
		return new ViewsMap[viewKey](sourcePath);
	}
}
