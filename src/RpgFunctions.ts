import {App, TAbstractFile, TFile} from "obsidian";

export class RpgFunctions {
	private root: string;
	
	constructor(
		private app: App,
	) {
		this.initialiseRoots();
	}

	private initialiseRoots() {
		if (this.app.vault.getFiles().length !== 0) {
			const filePath = this.app.vault.getFiles()[0].path;

			let slashCount = 0;
			let p = filePath.indexOf('/');
			while (p !== -1) {
				slashCount++;
				p = filePath.indexOf('/', p + 1);
			}

			slashCount++;
			const file = this.app.vault.getAbstractFileByPath(filePath);

			if (file instanceof TFile) {
				this.root = this.app.vault.getResourcePath(file);
			}

			if (this.root === null) {
				console.log('Rpg Manager failed to find the root folder!');
				return;
			}

			if (this.root.includes("?")) {
				this.root = this.root.substring(0, this.root.lastIndexOf("?"));
			}

			for (let removedSlash = slashCount; removedSlash > 0; removedSlash--) {
				this.root = this.root.slice(0, this.root.lastIndexOf('/'));
			}

			if (!this.root.endsWith("/")) {
				this.root += "/";
			}
		}
	}

	private fileExists(path: string): boolean {
		const abstractFile = this.app.vault.getAbstractFileByPath(path);
		let response = false;

		if (abstractFile instanceof TAbstractFile) {
			response = true;
		}

		return response;
	}


	public getImg(
		name: string,
	): string|null {
		const imageExtensions = ["jpeg", "jpg", "png", "webp"];

		for (let extensionCount = 0; extensionCount < imageExtensions.length; extensionCount++) {
			const fileName = this.app.vault.config.attachmentFolderPath + '/' + name + '.' + imageExtensions[extensionCount];

			if (this.fileExists(fileName)) {
				if (this.root == null) {
					this.initialiseRoots();
				}
				return this.root + fileName;
			}
		}

		return null;
	}

	public getImgElement(
		imgSrc: string,
		width: number|undefined =75,
		height: number|undefined =75,
	): HTMLImageElement|null
	{
		if (width !== 75 && height === 75){
			height = undefined;
		} else if (width === 75 && height !== 75){
			width = undefined;
		}

		const response = new Image(width, height);
		response.src = imgSrc;
		response.style.objectFit = 'cover';

		return response;
	}

	public formatTime(
		date: Date|null
	): string {
		if (date == null) return '';

		const hours = date.getHours();
		const minutes = date.getMinutes();

		return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
	}
}
