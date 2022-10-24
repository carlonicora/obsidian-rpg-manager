import {AbstractSubModelView} from "../abstracts/AbstractSubModelView";
import {BreadcrumbResponseInterface} from "../../../responses/interfaces/BreadcrumbResponseInterface";
import {Component, MarkdownRenderer} from "obsidian";
import {RelationshipsSelectionModal} from "../../../services/relationships/modals/RelationshipsSelectionModal";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {IdSwitcherModal} from "../../../core/modals/IdSwitcherModal";
import {GalleryManagementModal} from "../../../services/galleries/modals/GalleryManagementModal";

export class BreadcrumbView extends AbstractSubModelView {
	private _currentComponent: ComponentModelInterface;

	render(
		container: HTMLElement,
		data: BreadcrumbResponseInterface,
	): void {
		if (data.component === undefined) return;
		this._currentComponent = data.component;

		const breadcrumbContainer = container.createDiv({cls: 'rpgm-breadcrumb'});
		breadcrumbContainer.createEl('h2').textContent = data.mainTitle;
		const breadcrumbLine = breadcrumbContainer.createDiv({cls:'line'});

		this._renderBreadcrumb(breadcrumbContainer, breadcrumbLine, data);

		breadcrumbContainer.createDiv({cls: 'reset'});
		const relationshipAdderContainerEl = breadcrumbContainer.createDiv({cls:'line spaced-line'});

		this._addFunctionality(relationshipAdderContainerEl, 'Relationships', 'Manage Relationship')
			.addEventListener("click", () => {
				new RelationshipsSelectionModal(this.app, this._currentComponent).open();
			});

		this._addSeparator(relationshipAdderContainerEl);

		this._addFunctionality(relationshipAdderContainerEl,'Move', 'Move your ' + ComponentType[this._currentComponent.id.type])
			.addEventListener("click", () => {
				new IdSwitcherModal(this.app, this._currentComponent.file).open();
			});

		this._addSeparator(relationshipAdderContainerEl);

		this._addFunctionality(relationshipAdderContainerEl, 'Images', 'Gallery Manager')
			.addEventListener("click", () => {
				new GalleryManagementModal(this.app, this._currentComponent).open();
			});
	}

	private _addFunctionality(
		containerEl: HTMLDivElement,
		title: string,
		description: string,
	): HTMLSpanElement {
		const crumb = containerEl.createDiv({cls: 'crumb'})
		crumb.createDiv({cls: 'title', text: title});
		const value = crumb.createDiv({cls: 'value'});
		return value.createSpan({cls: 'rpgm-edit-icon', text: description});
	}

	private _addSeparator(
		containerEl: HTMLDivElement,
	): void {
		const separator = containerEl.createDiv({cls: 'separator'});
		separator.createDiv({cls: 'title', text: ' '});
		const separatorText = separator.createDiv({cls: 'value'});
		separatorText.createEl('p').textContent = '|';
	}

	private _renderBreadcrumb(
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

			this._renderBreadcrumb(breadcrumb, lineToUse, data.nextBreadcrumb, isFirstLine);
		} else {
			breadcrumb.createDiv({cls: 'reset'});
		}
	}
}
