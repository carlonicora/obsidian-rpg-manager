import {ElementInterface} from "../interfaces/ElementInterface";
import {TextElementInterface} from "./interfaces/TextElementInterface";
import {ClassInterface} from "../../../api/interfaces/ClassInterface";
import {AbstractElement} from "../abstracts/AbstractElement";
import {ElementDataInterface} from "../interfaces/ElementDataInterface";
import {Component, MarkdownRenderer, setIcon} from "obsidian";
import {AbstractTextElement} from "./abstracts/AbstractTextElement";

export class LongTextElement extends AbstractTextElement {
	public render(
		data: TextElementInterface,
		containerEl: HTMLElement,
	): void {
		this.renderText(data, containerEl, true);
	}
}
