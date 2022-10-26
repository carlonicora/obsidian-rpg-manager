import {ServiceInterface} from "../interfaces/ServiceInterface";
import {Component} from "obsidian";
import {RpgManagerApiInterface} from "../../interfaces/RpgManagerApiInterface";

export class AbstractService extends Component implements ServiceInterface{
	constructor(
		protected api: RpgManagerApiInterface,
	) {
		super();
	}
}
