import {ComponentInterface} from "../interfaces/ComponentInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";

export abstract class AbstractComponent extends AbstractRpgManager implements ComponentInterface {
	abstract generateData(
		relationships: RelationshipInterface|RelationshipInterface[],
		title: string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface | null>;
}
