import {App, Component, MarkdownPostProcessorContext, MarkdownRenderChild} from "obsidian";
import {RpgManagerApiInterface} from "../../interfaces/RpgManagerApiInterface";

export interface ControllerManagerInterface {
	create(
		container: HTMLElement,
		source: string,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string,
	): MarkdownRenderChild;
}
