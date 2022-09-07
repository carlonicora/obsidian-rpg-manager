import {StringView} from "../settings/Agnostic/views/StringView";
import {TableView} from "../settings/Agnostic/views/TableView";
import {BannerView} from "../settings/Agnostic/views/BannerView";
import {BoxView} from "../settings/Agnostic/views/BoxView";
import {BreadcrumbView} from "../settings/Agnostic/views/BreadcrumbView";
import {TimelineView} from "../settings/Agnostic/views/TimelineView";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ImageView} from "../settings/Agnostic/views/ImageView";

const ViewsMap = {
	AgnosticString: StringView,
	AgnosticTable: TableView,
	AgnosticBanner: BannerView,
	AgnosticBox: BoxView,
	AgnosticBreadcrumb: BreadcrumbView,
	AgnosticTimeline: TimelineView,
	AgnosticImage: ImageView,
};
type ViewsMapType = typeof ViewsMap;
type ViewKeys = keyof ViewsMapType;
type Tuples<T> = T extends ViewKeys ? [T, InstanceType<ViewsMapType[T]>] : never;
export type SingleViewKey<K> = [K] extends (K extends ViewKeys ? [K] : never) ? K : never;
type ViewClassType<A extends ViewKeys> = Extract<Tuples<ViewKeys>, [A, any]>[1];

export class ViewFactory extends AbstractFactory {
	public create<K extends ViewKeys>(
		k: SingleViewKey<K>,
		sourcePath: string,
	): ViewClassType<K> {
		return new ViewsMap[k](sourcePath);
	}
}
