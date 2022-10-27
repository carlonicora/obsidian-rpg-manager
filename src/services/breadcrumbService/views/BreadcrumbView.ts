import {BreadcrumbElementInterface} from "../interfaces/BreadcrumbElementInterface";
import {Component, MarkdownRenderer} from "obsidian";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";

export class BreadcrumbView {
	private _model: ModelInterface;

	render(
		container: HTMLElement,
		data: BreadcrumbElementInterface,
	): void {
		if (data.model === undefined)
			return;

		this._model = data.model;

		const breadcrumbContainer = container.createDiv({cls: 'rpgm-breadcrumbService'});
		breadcrumbContainer.createEl('h2').textContent = data.mainTitle;
		const breadcrumbLine = breadcrumbContainer.createDiv({cls:'line'});

		this._renderBreadcrumb(breadcrumbContainer, breadcrumbLine, data);

		breadcrumbContainer.createDiv({cls: 'reset'});
	}



	private _renderBreadcrumb(
		breadcrumb: HTMLElement,
		line: HTMLElement,
		data: BreadcrumbElementInterface,
		isFirstLine = true,
	): void {
		let lineToUse = line;

		if (data.isInNewLine){
			breadcrumb.createDiv({cls: 'reset'});
			lineToUse = breadcrumb.createDiv({cls:'line'});
			isFirstLine = false;
		}

		const crumb = lineToUse.createDiv({cls: 'crumb'});
		crumb.createDiv({cls: 'title', text: data.title ? data.title : ' '});
		const value = crumb.createDiv({cls: 'value'});

		if (data.function != null){
			const functionLink: HTMLAnchorElement = value.createEl('a');
			functionLink.textContent = data.linkText;
			functionLink.addEventListener("click", () => {
				if (data.functionParameters != null){
					data.function(...data.functionParameters);
				} else {
					data.function();
				}
			});
		} else {
			let link: string = data.link;
			if (data.linkText != null){
				if (link.indexOf('|') !== -1){
					link = link.substring(0, link.indexOf('|') + 1) + data.linkText + ']]';
				} else {
					link = link.substring(0, link.indexOf(']]')) + '|' + data.linkText + ']]';
				}
			}

			MarkdownRenderer.renderMarkdown(
				link,
				value,
				'',
				null as unknown as Component,
			);
		}

		if (data.nextBreadcrumb != null){
			if (data.nextBreadcrumb.isInNewLine === false) {
				const separator = lineToUse.createDiv({cls: 'separator'});
				separator.createDiv({cls: 'title', text: ' '});
				const separatorText = separator.createDiv({cls: 'value'});
				separatorText.createEl('p').textContent = isFirstLine ? '>' : '|';
			}

			this._renderBreadcrumb(breadcrumb, lineToUse, data.nextBreadcrumb, isFirstLine);
		} else {
			breadcrumb.createDiv({cls: 'reset'});
		}
	}
}
