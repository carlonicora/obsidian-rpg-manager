import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {NewHeaderViewInterface} from "../interfaces/NewHeaderViewInterface";
import {Component, MarkdownRenderer, setIcon} from "obsidian";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {BreadcrumbService} from "../../../services/breadcrumbService/BreadcrumbService";
import {ComponentOptionsService} from "../../../services/componentOptionsService/ComponentOptionsService";
import {GalleryService} from "../../../services/galleryService/GalleryService";
import {GalleryCarouselView} from "../../../services/galleryService/views/GalleryCarouselView";
import {ElementInterface} from "../interfaces/ElementInterface";
import {ElementDataInterface} from "../interfaces/ElementDataInterface";
import {ClassInterface} from "../../../api/interfaces/ClassInterface";

export abstract class AbstractHeaderView implements NewHeaderViewInterface {
	private _breadcumbContainerEl: HTMLDivElement;
	private _componentOptionsContainerEl: HTMLDivElement;
	private _headerContainerEl: HTMLDivElement;
	private _titleContainerEl: HTMLDivElement;
	private _headerInfoAndGalleryEl: HTMLDivElement;
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
		containerEl.addClass('rpg-manager-header');

		this._breadcumbContainerEl = containerEl.createDiv({cls: 'rpgm-breadcrumb'});

		this._headerContainerEl = containerEl.createDiv({cls: 'rpg-manager-header-container'});
		this._titleContainerEl = this._headerContainerEl.createDiv({cls: 'rpg-manager-header-container-title'});
		this._componentOptionsContainerEl = this._headerContainerEl.createDiv({cls: 'rpg-manager-component-option'});

		this._headerInfoAndGalleryEl = this._headerContainerEl.createDiv({cls: 'rpg-manager-header-container-info rpg-manager-header-container-info-no-gallery clearfix'});
		this._infoContainerEl = this._headerInfoAndGalleryEl.createDiv({cls: 'rpg-manager-header-container-info-data'});
		this._galleryContainerEl = this._headerInfoAndGalleryEl.createDiv({cls: 'rpg-manager-header-container-info-gallery'});

		this._plotContainerEl = this._headerContainerEl.createDiv({cls: 'rpg-manager-header-container-info-plot'});
		this._analyserContainerEl = this._headerContainerEl.createDiv({cls: 'rpg-manager-header-container-info-analyser'});
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
		if (this.model.images.length > 0){
			this._headerInfoAndGalleryEl.removeClass('rpg-manager-header-container-info-no-gallery');

			new GalleryCarouselView(this.api, this.model.images).render(this._galleryContainerEl);
		}
	}

	protected addPlot(
	): void {

	}

	protected addAnalyser(
	): void {

	}

	protected addInfoElement(
		elementClass: ClassInterface<ElementInterface>,
		data: ElementDataInterface,
	): void {
		const element: ElementInterface = this.api.views.getElement(elementClass);

		element.render(data, this._infoContainerEl);
	}

	protected addInfoLongElement(
		title: string,
		content: string,
		editableKeyId?: string,
	): void {
		const infoEl = this._infoContainerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-long clearfix'})

		let titleClass = 'rpg-manager-header-container-info-data-container-title';
		let contentClass = 'rpg-manager-header-container-info-data-container-content';

		if (editableKeyId !== undefined) {
			infoEl.addClass('rpg-manager-header-container-info-data-container-editable')
			const editEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-edit'});
			setIcon(editEl, 'edit');

			titleClass = 'rpg-manager-header-container-info-data-container-title-editable';
			contentClass = 'rpg-manager-header-container-info-data-container-content-editable';
		}

		infoEl.createDiv({cls: titleClass +' clearfix', text: title});
		const contentEl = infoEl.createDiv({cls: contentClass + ' clearfix'});

		MarkdownRenderer.renderMarkdown(
			content,
			contentEl,
			this.sourcePath,
			null as unknown as Component,
		);
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
