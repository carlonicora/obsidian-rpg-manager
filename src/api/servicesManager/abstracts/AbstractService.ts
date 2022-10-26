import {ServiceInterface} from "../interfaces/ServiceInterface";
import {App, Component} from "obsidian";
import {RpgManagerApiInterface} from "../../interfaces/RpgManagerApiInterface";

export class AbstractService extends Component implements ServiceInterface{
	constructor(
		protected app: App,
		protected api: RpgManagerApiInterface,
	) {
		super();
	}
}
