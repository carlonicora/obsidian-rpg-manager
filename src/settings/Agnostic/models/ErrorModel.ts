import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/ResponseData";

export class ErrorModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();
		return response;
	}

	/*
	public async render() {
		this.container.innerText = "The selected function does not exist in Rpg Manager";
	}
	*/
}
