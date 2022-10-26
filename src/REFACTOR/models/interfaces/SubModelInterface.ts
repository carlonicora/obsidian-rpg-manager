import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";

export interface SubModelInterface {
	generateData(
		relationships: RelationshipInterface|RelationshipInterface[],
		title: string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null>;
}
