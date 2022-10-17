import {TextStatusInterface} from "./TextStatusInterface";

export interface TextAnalyserInterface {
	analyse(
		containerEl: HTMLInputElement|HTMLDivElement|HTMLTextAreaElement,
		status: TextStatusInterface,
	): void;
}
