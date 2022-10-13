import {AbstractSubModelView} from "./AbstractSubModelView";
import {HeaderResponseInterface} from "../../responses/interfaces/HeaderResponseInterface";
import {HeaderResponseType} from "../../responses/enums/HeaderResponseType";
import {HeaderResponseElementInterface} from "../../responses/interfaces/HeaderResponseElementInterface";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {ContentInterface} from "../../responses/contents/interfaces/ContentInterface";
import flatpickr from "flatpickr";

export abstract class AbstractHeaderView extends AbstractSubModelView {
	protected currentComponent: ComponentInterface;

	protected headerTitleEl: HTMLDivElement;
	protected headerInfoEl: HTMLDivElement;
	protected headerContainerEl: HTMLDivElement;
	protected imageContainterEl: HTMLDivElement;
	protected infoTableEl: HTMLTableSectionElement;

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

		if (!this.currentComponent.isComplete){
			const completerEl = this.headerTitleEl.createDiv();
			const completeButtonEl = completerEl.createEl('button', {cls: 'actionButton', text: 'Mark this component as completed'});
			completeButtonEl.addEventListener('click', () => {
				this.manipulators.codeblock.update(
					'data.complete',
					true,
				);
			});
		}


		//container
		this.headerContainerEl = crs.createDiv({cls: 'container'});
		this.headerInfoEl = this.headerContainerEl.createDiv({cls: 'info'});
		this.infoTableEl = this.headerInfoEl.createEl('table', {cls: 'rpgm-headless-table'}).createTBody();

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

			image.onload = (evt: Event) => {
				if (image.src.startsWith('http')) {
					const crsImageLink = this.imageContainterEl.createEl('a', {href: image.src});
					crsImageLink.append(image);
				} else {
					this.imageContainterEl.append(image);
				}
			}
		}

		if (!this.isInternalRender){
			data.elements.forEach((element: HeaderResponseElementInterface) => {
				const containerEl = this.createContainerEl(element);
				element.value.fillContent(containerEl, this.sourcePath);
			});
		}

		this.headerContainerEl.createDiv({cls: 'reset'});
	}

	protected createContainerEl(
		element: HeaderResponseElementInterface,
		fn: Function|undefined = undefined,
		additionalParams: Array<any>|undefined=undefined,
	): HTMLTableCellElement|undefined {
		let tableRowEl = this.infoTableEl.insertRow();
		const titleCellEl = tableRowEl.insertCell();
		titleCellEl.addClass('title');
		titleCellEl.textContent = element.title;

		if (element.type === HeaderResponseType.Long) {
			titleCellEl.colSpan = 2;
			tableRowEl = this.infoTableEl.insertRow();
		}

		const response = tableRowEl.insertCell();
		response.addClass('content');

		if (fn !== undefined){
			let subContent: any|ContentInterface|undefined;

			if (additionalParams === undefined) {
				subContent = fn(response, element);
			} else {
				subContent = fn(response, ...additionalParams);
			}

			if (subContent !== undefined) {
				const subRowEl = this.infoTableEl.insertRow();
				subRowEl.insertCell().textContent = '';
				const subRowContentEl = subRowEl.insertCell();
				subRowContentEl.addClass('subcontent');

				if (typeof subContent === 'function'){
					if (additionalParams === undefined) {
						subContent(subRowContentEl, element);
					} else {
						subContent(subRowContentEl, ...additionalParams);
					}
				} else {
					subContent.fillContent(subRowContentEl, this.sourcePath);
				}
			}
		} else {
			if (element.additionalInformation?.editableField !== undefined) this.addEditorIcon(response, element.currentComponent, element.additionalInformation.editableField)

			if (element.type === HeaderResponseType.Long) {
				response.colSpan = 2;
			} else {
				response.addClass('contentShort');
			}
		}

		return response;
	}

	protected addDateSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		if (data.additionalInformation === undefined)
			return;

		const options:any = {
			allowInput: true,
			dateFormat: "Y-m-d",
			altInput: true,
			onChange: (selectedDate: any, dateStr: any , instance: any) => {
				this.manipulators.codeblock.update(
					data.additionalInformation.yamlIdentifier,
					dateStr,
				);
			}
		};

		if (data.additionalInformation.date !== undefined) options.defaultDate = data.additionalInformation.date;

		const flatpickrEl = contentEl.createEl('input', {cls: 'flatpickr', type: 'text'});
		flatpickrEl.placeholder = data.additionalInformation.placeholder;
		flatpickrEl.readOnly = true;

		flatpickr(flatpickrEl, options);
	}
}
