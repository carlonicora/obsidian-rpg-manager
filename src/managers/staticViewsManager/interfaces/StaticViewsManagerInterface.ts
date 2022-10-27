import {StaticViewType} from "../enums/StaticViewType";

export interface StaticViewsManagerInterface {
	create(
		type: StaticViewType,
		params?: any[],
	): Promise<void>;
}
