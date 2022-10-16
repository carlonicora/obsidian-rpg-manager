import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {ImageInterface} from "../interfaces/ImageInterface";
import {App, Component, MarkdownRenderer} from "obsidian";

export class ImageCarouselView extends AbstractRpgManager {
	private _currentImage: number;
	private _imagesCount: number;

	private _imageGroups: HTMLDivElement[];

	private _imageCounterEl: HTMLDivElement;

	constructor(
		app: App,
		private _images: ImageInterface[],
	) {
		super(app);

		this._currentImage = 0;
		this._imagesCount = this._images.length;
		this._imageGroups = [];
	}

	render(
		containerEl: HTMLDivElement,
	): void {
		const carouselContainerEl = containerEl.createDiv({cls: 'rpgm-image-carousel'});
		this._addImageNavigator(carouselContainerEl);
		const imagesContainerEl = carouselContainerEl.createDiv({cls: 'images'});

		this._images.forEach((image: ImageInterface, index:number) => {
			this._addImageGroup(image, imagesContainerEl);
		});

		this._imageGroups[0].removeClass('invisible');
		this._imageCounterEl.textContent = '1/' + this._imagesCount.toString();
	}

	private _addImageGroup(
		image: ImageInterface,
		containerEl: HTMLDivElement,
	): void {
		const imageGroupEl: HTMLDivElement = containerEl.createDiv({cls: 'group invisible'});

		const imageContainerEl: HTMLDivElement = imageGroupEl.createDiv({cls: 'container'});

		const imageEl = new Image();

		imageEl.onload = (evt: Event) => {
			if (image.src.startsWith('http')) {
				const crsImageLink = imageContainerEl.createEl('a', {href: image.src});
				crsImageLink.append(imageEl);
			} else {
				imageContainerEl.append(imageEl);
			}
		}

		imageEl.src = image.src;

		const imageCaptionEl: HTMLDivElement = imageGroupEl.createDiv({cls: 'container'});
		if (image.caption !== '') {
			MarkdownRenderer.renderMarkdown(
				image.caption,
				imageCaptionEl,
				'',
				null as unknown as Component,
			);
		}

		this._imageGroups.push(imageGroupEl);
	}

	private _addImageNavigator(
		containerEl: HTMLDivElement,
	): void {
		const imageNavigatorContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'navigator'});

		if (this._images.length > 0) {
			const previousImageNavigatorEl: HTMLDivElement = imageNavigatorContainerEl.createDiv({cls: 'previous', text: '<<'});
			previousImageNavigatorEl.addEventListener('click', this._movePrevious.bind(this))

			const nextImageNavigatorEl: HTMLDivElement = imageNavigatorContainerEl.createDiv({cls: 'next', text: '>>'});
			nextImageNavigatorEl.addEventListener('click', this._moveNext.bind(this))

			this._imageCounterEl = imageNavigatorContainerEl.createDiv({cls: 'counter'});
		}

		imageNavigatorContainerEl.createDiv({cls: 'reset'});
	}

	private _movePrevious(): void {
		this._imageGroups[this._currentImage].addClass('invisible');

		if (this._currentImage === 0) {
			this._currentImage = this._imagesCount-1;
		} else {
			this._currentImage--;
		}

		this._imageGroups[this._currentImage].removeClass('invisible');
		this._imageCounterEl.textContent = (this._currentImage + 1).toString() + '/' + this._imagesCount.toString();
	}

	private _moveNext(): void {
		this._imageGroups[this._currentImage].addClass('invisible');

		if (this._currentImage === this._imagesCount -1) {
			this._currentImage = 0;
		} else {
			this._currentImage++;
		}

		this._imageGroups[this._currentImage].removeClass('invisible');
		this._imageCounterEl.textContent = (this._currentImage + 1).toString() + '/' + this._imagesCount.toString();
	}
}
