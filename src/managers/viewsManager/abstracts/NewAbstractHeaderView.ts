import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {NewHeaderViewInterface} from "../interfaces/NewHeaderViewInterface";
import {Component, MarkdownRenderer} from "obsidian";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {BreadcrumbService} from "../../../services/breadcrumbService/BreadcrumbService";
import {ComponentOptionsService} from "../../../services/componentOptionsService/ComponentOptionsService";

export abstract class NewAbstractHeaderView implements NewHeaderViewInterface {
	private _breadcumbContainerEl: HTMLDivElement;
	private _componentOptionsContainerEl: HTMLDivElement;
	private _headerContainerEl: HTMLDivElement;
	private _titleContainerEl: HTMLDivElement;
	private _galleryContainerEl: HTMLDivElement;
	private _infoContainerEl: HTMLDivElement;
	private _plotContainerEl: HTMLDivElement;
	private _analyserContainerEl: HTMLDivElement;

	constructor(
		protected api: RpgManagerApiInterface,
		public model: ModelInterface,
		public containerEl: HTMLElement,
		public sourcePath: string,
	) {
		this._breadcumbContainerEl = containerEl.createDiv({cls: ''});
		this._componentOptionsContainerEl = containerEl.createDiv({cls: ''});

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
		this.api.service(BreadcrumbService).render(this.model, this._breadcumbContainerEl);
	}

	protected addComponentOptions(
	): void {
		this.api.service(ComponentOptionsService).render(this.model, this._componentOptionsContainerEl);
	}

	protected addTitle(
	): void {
		MarkdownRenderer.renderMarkdown(
			'[[' + this.model.file.basename + ']]',
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
