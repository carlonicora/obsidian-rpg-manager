import {AbstractSubModelView} from "./AbstractSubModelView";
import {HeaderResponseInterface} from "../../responses/interfaces/HeaderResponseInterface";
import {HeaderResponseType} from "../../responses/enums/HeaderResponseType";
import {HeaderResponseElementInterface} from "../../responses/interfaces/HeaderResponseElementInterface";
import {ComponentInterface} from "../../databases/interfaces/ComponentInterface";

export abstract class AbstractHeaderView extends AbstractSubModelView {
	protected currentComponent: ComponentInterface;

	protected headerTitleEl: HTMLDivElement;
	protected headerInfoEl: HTMLDivElement;
	protected headerContainerEl: HTMLDivElement;
	protected imageContainterEl: HTMLDivElement;

	private isInternalRender = false;

	public internalRender(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		this.isInternalRender = true;
		this.executeRender(container, data);
	}

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		this.executeRender(container, data);
	}

	private executeRender(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		this.currentComponent = data.currentComponent;

		//Init
		const crs = container.createDiv({cls: 'rpgm-header-info'});
		this.headerTitleEl = crs.createDiv({cls: 'title'});

		//title
		data.link.fillContent(this.headerTitleEl, this.sourcePath);

		//container
		this.headerContainerEl = crs.createDiv({cls: 'container'});
		this.headerInfoEl = this.headerContainerEl.createDiv({cls: 'info'});

		//image
		//const crsImage = this.headerContainerEl.createDiv({cls: 'image'});
		if (data.imgSrc == null) {
			//crsImage.addClass('invisible');
			this.headerInfoEl.addClass('info-large');
		} else {
			this.imageContainterEl = this.headerContainerEl.createDiv({cls: 'image'});
			//const image = new Image(data.imgWidth, data.imgHeight);
			const image = new Image();
			image.src = data.imgSrc;
			//image.style.objectFit = 'cover';

			if (image.src.startsWith('http')) {
				const crsImageLink = this.imageContainterEl.createEl('a', {href: image.src});
				crsImageLink.append(image);
			} else {
				this.imageContainterEl.append(image);
			}
		}

		if (!this.isInternalRender){
			data.elements.forEach((element: HeaderResponseElementInterface) => {
				const containerEl = this.createContainerEl(element.type, element.title);
				element.value.fillContent(containerEl, this.sourcePath);
			});
		}

		this.headerContainerEl.createDiv({cls: 'reset'});
	}

	protected createContainerEl(
		responseType: HeaderResponseType,
		title: string,
	): HTMLDivElement {
		let prefix = 'short';
		let crsContainer: HTMLDivElement;

		switch (responseType){
			case HeaderResponseType.Long:
				prefix = 'long';
				crsContainer = this.headerInfoEl;
				break;
			case HeaderResponseType.Half:
			case HeaderResponseType.StoryCircleSelector:
			case HeaderResponseType.AbtSelector:
			case HeaderResponseType.SceneExcitment:
			case HeaderResponseType.SceneTypeSelector:
			case HeaderResponseType.SessionSelection:
			case HeaderResponseType.ScenesSelection:
				prefix = 'half';
				crsContainer = this.headerInfoEl.createDiv({cls: 'half'});
				break;
			default:
				crsContainer = this.headerInfoEl.createDiv({cls: 'short'});
				break;
		}

		crsContainer.createDiv({cls: prefix+ 'Title', text: title});
		crsContainer.createDiv({cls: prefix+ 'Text'});

		return crsContainer;
	}

	protected addElement(
		containerEl: HTMLDivElement,
		element: HeaderResponseElementInterface,
		fn: any,
	): void {
		switch (element.type){
			case HeaderResponseType.Long:
			case HeaderResponseType.Short:
			case HeaderResponseType.Half:
				element.value.fillContent(containerEl.children[1] as HTMLDivElement, this.sourcePath);
				break;
			default:
				fn;
		}

		//if (element.type !== HeaderResponseType.Long){
			containerEl.createDiv({cls: 'reset'});
		//}
	}
}
