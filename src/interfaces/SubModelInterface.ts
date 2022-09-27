import {ResponseDataElementInterface} from "./response/ResponseDataElementInterface";
import {RelationshipInterface} from "./RelationshipInterface";

export interface SubModelInterface {
	generateData(
		relationships: RelationshipInterface|RelationshipInterface[],
		title: string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null>;
}
