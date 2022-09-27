import {AbstractComponent} from "./AbstractComponent";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";

export abstract class AbstractComponentElement extends AbstractComponent implements ComponentInterface {
	public isOutline = false;
}
