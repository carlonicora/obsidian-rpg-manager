import {StaticViewType} from "../enums/StaticViewType";

export interface StaticViewsManagerInterface {
	create(
		type: StaticViewType,
		params?: any[],
	): Promise<void>;

	createGeneric(
		type: string,
		inRightSplit: boolean,
		params?: any[],
	): Promise<void>;
}
