import {ServiceInterface} from "../interfaces/ServiceInterface";
import {Component} from "obsidian";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export class AbstractService extends Component implements ServiceInterface{
	constructor(
		protected api: RpgManagerApiInterface,
	) {
		super();
	}
}
