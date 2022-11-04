import {Component, MarkdownPostProcessorContext, MarkdownRenderChild} from "obsidian";

export interface ControllerManagerInterface {
	create(
		container: HTMLElement,
		source: string,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string,
	): MarkdownRenderChild;
}
