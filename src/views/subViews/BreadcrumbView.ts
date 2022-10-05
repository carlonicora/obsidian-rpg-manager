import {AbstractSubModelView} from "../abstracts/AbstractSubModelView";
import {BreadcrumbResponseInterface} from "../../responses/interfaces/BreadcrumbResponseInterface";
import {Component, MarkdownRenderer} from "obsidian";

export class BreadcrumbView extends AbstractSubModelView {
	render(
		container: HTMLElement,
		data: BreadcrumbResponseInterface,
	): void {
		const breadcrumbContainer = container.createDiv({cls: 'rpgm-breadcrumb'});
		breadcrumbContainer.createEl('h2').textContent = data.mainTitle;
		const breadcrumbLine = breadcrumbContainer.createDiv({cls:'line'});

		this.renderBreadcrumb(breadcrumbContainer, breadcrumbLine, data);
	}

	private renderBreadcrumb(
		breadcrumb: HTMLElement,
		line: HTMLElement,
		data: BreadcrumbResponseInterface,
		isFirstLine = true,
	): void {
		let lineToUse = line;

		if (data.isInNewLine){
			breadcrumb.createDiv({cls: 'reset'});
			lineToUse = breadcrumb.createDiv({cls:'line'})
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
				this.sourcePath,
				null as unknown as Component,
			)
		}



		if (data.nextBreadcrumb != null){
			if (data.nextBreadcrumb.isInNewLine === false) {
				const separator = lineToUse.createDiv({cls: 'separator'});
				separator.createDiv({cls: 'title', text: ' '});
				const separatorText = separator.createDiv({cls: 'value'});
				separatorText.createEl('p').textContent = isFirstLine ? '>' : '|';
			}

			this.renderBreadcrumb(breadcrumb, lineToUse, data.nextBreadcrumb, isFirstLine);
		} else {
			breadcrumb.createDiv({cls: 'reset'});
		}
	}
}
