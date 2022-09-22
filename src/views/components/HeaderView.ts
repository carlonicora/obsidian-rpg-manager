import {AbstractComponentView} from "../../abstracts/AbstractComponentView";
import {HeaderResponseInterface} from "../../interfaces/response/HeaderResponseInterface";
import {HeaderResponseElementInterface} from "../../interfaces/response/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../enums/HeaderResponseType";
import {SessionInterface} from "../../interfaces/data/SessionInterface";
import {RecordType} from "../../enums/RecordType";
import {IdInterface} from "../../interfaces/data/IdInterface";
import {CachedMetadata, TFile} from "obsidian";

export class HeaderView extends AbstractComponentView {
	private sessionSelectorEl: HTMLSelectElement;

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
				this.addSessionSelector(contentEl, element);
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

	private addSessionSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		const sceneId:IdInterface|undefined = data.additionalInformation?.sceneId;
		
		if (sceneId !== undefined) {
			const sessions: Array<SessionInterface> = this.database.read<SessionInterface>(
				(session: SessionInterface) =>
					session.id.type === RecordType.Session &&
					session.id.campaignId === sceneId.campaignId
			).sort(function(leftData:SessionInterface, rightData:SessionInterface) {
				if (leftData.sessionId > rightData.sessionId) return -1;
				if (leftData.sessionId < rightData.sessionId) return 1;
				return 0;
			});

			this.sessionSelectorEl = contentEl.createEl("select");
			if (sessions.length > 1) {
				this.sessionSelectorEl.createEl("option", {
					text: "",
					value: ""
				}).selected = true;
			}
			sessions.forEach((session: SessionInterface) => {
				const sessionOptionEl = this.sessionSelectorEl.createEl("option", {
					text: session.name,
					value: session.sessionId.toString(),
				});

				if (data.value.content.toString() === session.sessionId.toString()) sessionOptionEl.selected = true;
			});

			this.sessionSelectorEl.addEventListener("change", (e) => {
				this.selectSession(data);
			});
		}
	}

	public async selectSession(
		data: HeaderResponseElementInterface,
	): Promise<void> {
		const file: TFile|undefined = data.additionalInformation.file;

		if (file !== undefined){
			this.app.vault.read(file)
				.then((fileContent: string) => {
					return {content: fileContent, fileContent: fileContent.split('\n')};
				})
				.then((val: {content: string, fileContent: string[]}) => {
					const newfileContentArray: Array<string> = [];

					let hasFrontMatterStarted = false;
					let hasFrontMatterEnded = false;
					let hasSessionBeenAdded = false;
					for (let index=0; index<val.fileContent.length; index++){
						if (!hasFrontMatterEnded) {
							if (val.fileContent[index] === '---') {
								if (!hasFrontMatterStarted) {
									hasFrontMatterStarted = true;
								} else {
									hasFrontMatterEnded = true;

									if (!hasSessionBeenAdded) newfileContentArray.push('session: ' + this.sessionSelectorEl.value);
								}
							} else if (val.fileContent[index].trimStart().toLowerCase().startsWith('session:')) {
								console.log('found');
								val.fileContent[index] = 'session: ' + this.sessionSelectorEl.value;
								hasSessionBeenAdded = true;
							}
						}

						newfileContentArray.push(val.fileContent[index]);
					}

					const newFileContent = newfileContentArray.join('\n');

					if (newFileContent !== val.content){
						this.app.vault.modify(file, newFileContent);
					}
				});
		}
	}
}
