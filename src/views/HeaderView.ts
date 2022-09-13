import {AbstractView} from "../abstracts/AbstractView";
import {HeaderResponseInterface} from "../interfaces/response/HeaderResponseInterface";
import {HeaderResponseElementInterface} from "../interfaces/response/HeaderResponseElementInterface";
import {HeaderResponseType} from "../enums/HeaderResponseType";

export class HeaderView extends AbstractView {
	render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		const crs = container.createDiv({cls: 'rpgm-header-info'});
		const crsTitle = crs.createDiv({cls: 'title'});
		data.link.fillContent(crsTitle, this.sourcePath);

		const crsContainer = crs.createDiv({cls: 'container'});

		const crsInfo = crsContainer.createDiv({cls: 'info'});
		const crsImage = crsContainer.createDiv({cls: 'image'});
		if (data.imgSrc == null) {
			crsImage.addClass('invisible');
			crsInfo.addClass('info-large');
		}

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			let prefix = 'short';
			let crsContainer: HTMLElement;

			if (element.type === HeaderResponseType.Long) {
				prefix = 'long';
				crsContainer = crsInfo;
			} else {
				crsContainer = crsInfo.createDiv({cls: 'short'});
			}

			crsContainer.createDiv({cls: prefix+ 'Title', text: element.title});
			const contentEl = crsContainer.createDiv({cls: prefix+ 'Text'});
			element.value.fillContent(contentEl, this.sourcePath);

			if (element.type === HeaderResponseType.Short){
				crsContainer.createDiv({cls: 'reset'});
			}
		});


		if (data.imgSrc != null) {
			const image = new Image(data.imgWidth, data.imgHeight);
			image.src = data.imgSrc;
			image.style.objectFit = 'cover';
			crsImage.append(image);
		}

		crsContainer.createDiv({cls: 'reset'});
	}
}
