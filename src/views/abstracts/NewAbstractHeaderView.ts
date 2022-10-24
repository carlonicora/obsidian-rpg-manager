import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {NewHeaderViewInterface} from "../interfaces/NewHeaderViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {Component, MarkdownRenderer} from "obsidian";

export abstract class NewAbstractHeaderView implements NewHeaderViewInterface {
	private _breadcumbContainerEl: HTMLDivElement;
	private _headerContainerEl: HTMLDivElement;
	private _titleContainerEl: HTMLDivElement;
	private _galleryContainerEl: HTMLDivElement;
	private _infoContainerEl: HTMLDivElement;
	private _plotContainerEl: HTMLDivElement;
	private _analyserContainerEl: HTMLDivElement;

	constructor(
		public model: ComponentModelInterface,
		public containerEl: HTMLElement,
		public sourcePath: string,
	) {
		this._breadcumbContainerEl = containerEl.createDiv({cls: ''});
		this._headerContainerEl = containerEl.createDiv({cls: 'rpgm-header-info'});
		this._titleContainerEl = this._headerContainerEl.createDiv({cls: 'title'});
		const headerInfoAndGalleryEl = this._headerContainerEl.createDiv({cls: ''});
		this._infoContainerEl = headerInfoAndGalleryEl.createDiv({cls: ''});
		this._galleryContainerEl = headerInfoAndGalleryEl.createDiv({cls: ''});
		this._plotContainerEl = this._headerContainerEl.createDiv({cls: ''});
		this._analyserContainerEl = this._headerContainerEl.createDiv({cls: ''});
	}

	public abstract render(): void;

	protected addBreadcrumb(
	): void {

	}

	protected addTitle(
	): void {
		MarkdownRenderer.renderMarkdown(
			this.sourcePath,
			this._titleContainerEl,
			this.sourcePath,
			null as unknown as Component,
		);
	}

	protected addGallery(
	): void {

	}

	protected addPlot(
	): void {

	}

	protected addAnalyser(
	): void {

	}

	protected addInfoLongElement(
		title: string,
		content: string,
		editableKeyId?: string,
	): void {

	}

	protected addInfoShortElement(
		title: string,
		content: string|any,
		editableKeyId?: string,
	): void {

	}

	protected addDateElement(
	): void {

	}

	protected flatPickr() {

	}
}
