import {ResponseDataElementInterface} from "./response/ResponseDataElementInterface";
import {RelationshipV2Interface} from "../_dbV2/relationships/interfaces/RelationshipV2Interface";

export interface SubModelInterface {
	generateData(
		relationships: RelationshipV2Interface|RelationshipV2Interface[],
		title: string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null>;
}
