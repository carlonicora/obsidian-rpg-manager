import {AbstractModel} from "../abstracts/AbstractModel";

export class ErrorModel extends AbstractModel {
	public async render() {
		this.container.innerText = "The selected function does not exist in Rpg Manager";
	}
}
