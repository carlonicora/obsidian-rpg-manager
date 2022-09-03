import {StringView} from "../settings/Agnostic/views/StringView";
import {TableView} from "../settings/Agnostic/views";
import {BannerView} from "../settings/Agnostic/views/BannerView";
import {BoxView} from "../settings/Agnostic/views/BoxView";

const ViewsMap = {
	AgnosticString: StringView,
	AgnosticTable: TableView,
	AgnosticBanner: BannerView,
	AgnosticBox: BoxView
};
type ViewsMapType = typeof ViewsMap;
type ViewKeys = keyof ViewsMapType;
type Tuples<T> = T extends ViewKeys ? [T, InstanceType<ViewsMapType[T]>] : never;
export type SingleViewKey<K> = [K] extends (K extends ViewKeys ? [K] : never) ? K : never;
type ViewClassType<A extends ViewKeys> = Extract<Tuples<ViewKeys>, [A, any]>[1];

export class ViewFactory {
	static create<K extends ViewKeys>(
		k: SingleViewKey<K>,
		sourcePath: string,
	): ViewClassType<K> {
		return new ViewsMap[k](sourcePath);
	}
}
