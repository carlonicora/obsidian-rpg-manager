import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {App} from "obsidian";
import {DataType} from "../enums/DataType";
import {BreadcrumbResponseInterface} from "../interfaces/response/BreadcrumbResponseInterface";
import {ResponseBreadcrumb} from "../data/responses/ResponseBreadcrumb";
import {RpgOutlineDataInterface} from "../interfaces/data/RpgOutlineDataInterface";
import {RpgElementDataInterface} from "../interfaces/data/RpgElementDataInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";

export abstract class AbstractModel implements ModelInterface {
	constructor(
		protected app: App,
		protected currentElement: RpgOutlineDataInterface|RpgElementDataInterface,
		protected source: string,
		protected sourcePath: string,
		protected contentEl: HTMLElement,
		protected sourceMeta: any,
	) {
	}

	protected generateBreadcrumb(
	): BreadcrumbResponseInterface {
		const response = new ResponseBreadcrumb(this.app);
		response.link = this.currentElement.campaign.link;
		response.title = DataType[DataType.Campaign];

		if (this.currentElement.type !== DataType.Campaign){
			response.mainTitle = DataType[this.currentElement.type];

			let nextBreadcrumb,
				previousBreadcrumb,
				elementBreadcrumb,
				adventureBreadcrumb,
				sessionBreadcrumb,
				sceneBreadcrumb: BreadcrumbResponseInterface;

			let previousSession, nextSession: SessionInterface|null;

			switch (this.currentElement.type) {
				case DataType.Adventure:
					adventureBreadcrumb = new ResponseBreadcrumb(this.app);
					adventureBreadcrumb.link = this.currentElement.link;
					adventureBreadcrumb.title = DataType[DataType.Adventure];
					response.nextBreadcrumb = adventureBreadcrumb;
					break;
				case DataType.Session:
					previousSession = (<SessionInterface>this.currentElement).previousSession;
					nextSession = (<SessionInterface>this.currentElement).nextSession;

					adventureBreadcrumb = new ResponseBreadcrumb(this.app);
					adventureBreadcrumb.link = (<SessionInterface>this.currentElement).adventure.link;
					adventureBreadcrumb.title = DataType[DataType.Adventure];
					response.nextBreadcrumb = adventureBreadcrumb;

					sessionBreadcrumb = new ResponseBreadcrumb(this.app);
					sessionBreadcrumb.link = this.currentElement.link;
					sessionBreadcrumb.title = DataType[DataType.Session];
					adventureBreadcrumb.nextBreadcrumb = sessionBreadcrumb;

					previousBreadcrumb = new ResponseBreadcrumb(this.app);
					nextBreadcrumb = new ResponseBreadcrumb(this.app);

					if (previousSession != null) {
						previousBreadcrumb.link = previousSession.link;
						previousBreadcrumb.linkText = '<< prev session';
						previousBreadcrumb.isInNewLine = true;
						sessionBreadcrumb.nextBreadcrumb = previousBreadcrumb;
					}

					const sessionNotesBreadcrumb = new ResponseBreadcrumb(this.app);
					sessionNotesBreadcrumb.link = '[[link]]';
					sessionNotesBreadcrumb.linkText = 'notes';
					if (previousSession != null) {
						previousBreadcrumb.nextBreadcrumb = sessionNotesBreadcrumb;
					} else {
						sessionNotesBreadcrumb.isInNewLine = true;
						sessionBreadcrumb.nextBreadcrumb = sessionNotesBreadcrumb;
					}

					if (nextSession != null){
						nextBreadcrumb.link = nextSession.link;
						nextBreadcrumb.linkText = 'next session >>';
						sessionNotesBreadcrumb.nextBreadcrumb = nextBreadcrumb;
					}
					break;
				case DataType.Scene:
					adventureBreadcrumb = new ResponseBreadcrumb(this.app);
					adventureBreadcrumb.link = (<SceneInterface>this.currentElement).adventure.link;
					adventureBreadcrumb.title = DataType[DataType.Adventure];
					response.nextBreadcrumb = adventureBreadcrumb;

					sessionBreadcrumb = new ResponseBreadcrumb(this.app);
					sessionBreadcrumb.link = (<SceneInterface>this.currentElement).session.link;
					sessionBreadcrumb.title = DataType[DataType.Session];
					adventureBreadcrumb.nextBreadcrumb = sessionBreadcrumb;

					sceneBreadcrumb = new ResponseBreadcrumb(this.app);
					sceneBreadcrumb.link = this.currentElement.link;
					sceneBreadcrumb.title = DataType[DataType.Scene];
					sessionBreadcrumb.nextBreadcrumb = sceneBreadcrumb;

					previousBreadcrumb = new ResponseBreadcrumb(this.app);
					nextBreadcrumb = new ResponseBreadcrumb(this.app);
					if ((<SceneInterface>this.currentElement).previousScene != null) {
						previousBreadcrumb.link = (<SceneInterface>this.currentElement).previousScene?.link!;
						previousBreadcrumb.linkText = '<< prev scene';
						previousBreadcrumb.isInNewLine = true;
						sceneBreadcrumb.nextBreadcrumb = previousBreadcrumb;
					}

					if ((<SceneInterface>this.currentElement).nextScene != null){
						nextBreadcrumb.link = (<SceneInterface>this.currentElement).nextScene?.link!;
						nextBreadcrumb.linkText = 'next scene >>';

						if ((<SceneInterface>this.currentElement).previousScene != null) {
							previousBreadcrumb.nextBreadcrumb = nextBreadcrumb;
						} else {
							nextBreadcrumb.isInNewLine = true;
							sceneBreadcrumb.nextBreadcrumb = nextBreadcrumb;
						}
					}
					break;
				default:
					elementBreadcrumb = new ResponseBreadcrumb(this.app);
					elementBreadcrumb.link = this.currentElement.link;
					elementBreadcrumb.title = DataType[this.currentElement.type];
					response.nextBreadcrumb = elementBreadcrumb;
					break;
			}
		}

		return response;
	}

	abstract generateData(
	): ResponseDataInterface;
}
