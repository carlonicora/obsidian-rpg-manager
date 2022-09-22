import {AbstractComponentView} from "../../abstracts/AbstractComponentView";
import {HeaderResponseInterface} from "../../interfaces/response/HeaderResponseInterface";
import {HeaderResponseElementInterface} from "../../interfaces/response/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../enums/HeaderResponseType";

export class HeaderView extends AbstractComponentView {
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

			if (element.type === HeaderResponseType.ScenesSelection){
				contentEl.createEl('span', {text: 'button to add scenes'});
			} else if (element.type === HeaderResponseType.SessionSelection){
				contentEl.createEl('span', {text: 'session dropdown'});
			} else {
				element.value.fillContent(contentEl, this.sourcePath);
			}

			if (element.type !== HeaderResponseType.Long){
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
