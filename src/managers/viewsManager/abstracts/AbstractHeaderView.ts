import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {NewHeaderViewInterface} from "../interfaces/NewHeaderViewInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {BreadcrumbService} from "../../../services/breadcrumbService/BreadcrumbService";
import {ComponentOptionsService} from "../../../services/componentOptionsService/ComponentOptionsService";
import {GalleryCarouselView} from "../../../services/galleryService/views/GalleryCarouselView";
import {ElementInterface} from "../interfaces/ElementInterface";
import {ElementDataInterface} from "../interfaces/ElementDataInterface";
import {ClassInterface} from "../../../api/interfaces/ClassInterface";
import {PlotService} from "../../../services/plotsService/PlotService";

export abstract class AbstractHeaderView implements NewHeaderViewInterface {
	private _breadcumbContainerEl: HTMLDivElement;
	private _componentOptionsContainerEl: HTMLDivElement;
	private _headerContainerEl: HTMLDivElement;
	protected titleContainerEl: HTMLDivElement;
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
		this.titleContainerEl = this._headerContainerEl.createDiv({cls: 'rpg-manager-header-container-title'});
		this._componentOptionsContainerEl = this._headerContainerEl.createDiv();

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
		this._componentOptionsContainerEl.addClass('rpg-manager-component-option');
		this.api.service(ComponentOptionsService).render(this.model, this._componentOptionsContainerEl);
	}

	protected addTitle(
	): void {
		const titleEl: HTMLDivElement = this.titleContainerEl.createDiv({cls: 'rpg-manager-header-container-title-name'});
		titleEl.textContent = this.model.file.basename;
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
		this._plotContainerEl.addClass('rpg-manager-header-container-info-plot');

		const plotView = this.api.service(PlotService).getView();

		plotView.render(this.model.abt, this._plotContainerEl);
		plotView.render(this.model.storyCircle, this._plotContainerEl);
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
}
