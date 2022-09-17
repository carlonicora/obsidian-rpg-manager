import {ResponseElementInterface} from "./response/ResponseElementInterface";
import {RecordInterface} from "./database/RecordInterface";
import {RelationshipInterface} from "./RelationshipInterface";

export interface ComponentInterface {
	generateData(
		relationships: RelationshipInterface|RelationshipInterface[],
		title: string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null>;
}
