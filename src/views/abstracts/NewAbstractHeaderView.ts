import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {NewHeaderViewInterface} from "../interfaces/NewHeaderViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";

export abstract class NewAbstractHeaderView implements NewHeaderViewInterface{
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
	) {
	}

	public get type(): NewViewType {
		return NewViewType.Header;
	}

	public abstract render(): void;

	protected addBreadcrumb(
	): void {

	}

	protected addTitle(
	): void {

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
	): void {

	}

	protected addInfoShortElement(
	): void {

	}

	protected addDateElement(
	): void {

	}
}
