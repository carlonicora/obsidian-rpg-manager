import {ResponseElementInterface} from "./ResponseElementInterface";

export interface BoxResponseInterface extends ResponseElementInterface {
	title: string;
	content: string|null;
	colour: string;
}
