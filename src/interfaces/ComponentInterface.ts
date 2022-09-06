import {ResponseElementInterface} from "./response/ResponseElementInterface";
import {RpgDataInterface} from "../Data";

export interface ComponentInterface {
	generateData(
		data: RpgDataInterface[]|RpgDataInterface,
		title: string|null,
	): ResponseElementInterface|null;
}
