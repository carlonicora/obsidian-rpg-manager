import {RecordInterface} from "../database/RecordInterface";
import {BreadcrumbResponseInterface} from "../response/BreadcrumbResponseInterface";

export interface BreadcrumbFactoryInterface {
	create(
		record: RecordInterface,
	): BreadcrumbResponseInterface;
}
