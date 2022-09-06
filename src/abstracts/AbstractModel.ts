import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {IoInterface} from "../interfaces/IoInterface";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {IoFactory, SingleIoKey} from "../factories/Iofactory";
import {App} from "obsidian";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataType} from "../enums/DataType";
import {GenericDataInterface} from "../interfaces/data/GenericDataInterface";
import {RpgFunctions} from "../RpgFunctions";
import {DataFactory, SingleDataKey} from "../factories/DataFactory";
import {SessionDataInterface} from "../interfaces/data/SessionDataInterface";
import {SceneDataInterface} from "../interfaces/data/SceneDataInterface";
import {BreadcrumbResponseInterface} from "../interfaces/response/BreadcrumbResponseInterface";
import {ResponseBreadcrumb} from "../data/responses/ResponseBreadcrumb";
import {AdventureDataInterface} from "../interfaces/data/AdventureDataInterface";
import {RpgDataInterface, SceneInterface, SessionInterface} from "../Data";

export abstract class AbstractModel implements ModelInterface {
	protected io: IoInterface;

	protected dataType: DataType;
	protected specificData: GenericDataInterface;

	constructor(
		protected app: App,
		//protected campaign: CampaignDataInterface,
		//protected current: Record<string, any>,
		//protected dv: DataviewInlineApi,
		protected currentElement: RpgDataInterface,
		protected source: string,
		protected sourcePath: string,
		protected contentEl: HTMLElement,
		protected sourceMeta: any,
	) {
		/*
		this.io = IoFactory.create(CampaignSetting[this.campaign.settings] + 'Io' as SingleIoKey<any>, this.app, this.campaign, this.dv, this.current);

		const dt = RpgFunctions.getDataType(this.current.tags);
		if (dt != null) {
			this.dataType = dt;
			if (this.dataType != null) {
				this.specificData = DataFactory.create(
					CampaignSetting[this.campaign.settings] + DataType[this.dataType] as SingleDataKey<any>,
					this.current,
					this.campaign,
				);
			}

			if (this.dataType === DataType.Session) {
				(<SessionDataInterface>this.specificData).adventure = this.io.getAdventure((<SessionDataInterface>this.specificData).adventureId);

				(<SessionDataInterface>this.specificData).previousSession = this.io.getSession(
					null,
					(<SessionDataInterface>this.specificData).id - 1,
				);

				(<SessionDataInterface>this.specificData).nextSession = this.io.getSession(
					null,
					(<SessionDataInterface>this.specificData).id + 1,
				);
			} else if (this.dataType === DataType.Scene) {
				(<SceneDataInterface>this.specificData).adventure = this.io.getAdventure(
					(<SceneDataInterface>this.specificData).adventureId,
				);
				(<SceneDataInterface>this.specificData).session = this.io.getSession(
					(<SceneDataInterface>this.specificData).adventureId,
					(<SceneDataInterface>this.specificData).sessionId,
				);

				(<SceneDataInterface>this.specificData).previousScene = this.io.getScene(
					(<SceneDataInterface>this.specificData).adventureId,
					(<SceneDataInterface>this.specificData).sessionId,
					(<SceneDataInterface>this.specificData).id - 1,
				);

				(<SceneDataInterface>this.specificData).nextScene = this.io.getScene(
					(<SceneDataInterface>this.specificData).adventureId,
					(<SceneDataInterface>this.specificData).sessionId,
					(<SceneDataInterface>this.specificData).id + 1,
				);
			}
		}
		*/
	}

	protected generateBreadcrumb(
	): BreadcrumbResponseInterface {
		const response = new ResponseBreadcrumb();
		//response.link = this.campaign.link.toString();
		response.link = this.currentElement.campaign.link;
		response.title = DataType[DataType.Campaign];

		//if (this.dataType !== DataType.Campaign){
		if (this.currentElement.type !== DataType.Campaign){
			//response.mainTitle = DataType[this.dataType];
			response.mainTitle = DataType[this.currentElement.type];

			//let adventure: AdventureDataInterface|null;
			//let session: SessionDataInterface|null;
			let sessionBreadcrumb, sceneBreadcrumb: BreadcrumbResponseInterface;
			const adventureBreadcrumb = new ResponseBreadcrumb();
			const elementBreadcrumb = new ResponseBreadcrumb();
			switch (this.dataType) {
				case DataType.Adventure:
					//adventureBreadcrumb.link = (<AdventureDataInterface>this.specificData).link.toString();
					//adventureBreadcrumb.title = DataType[DataType.Adventure];
					adventureBreadcrumb.link = this.currentElement.link.toString();
					adventureBreadcrumb.title = DataType[this.currentElement.type];
					response.nextBreadcrumb = adventureBreadcrumb;
					break;
				case DataType.Session:
					//adventure = (<SessionDataInterface>this.specificData).adventure;
					//if (adventure != null) {
						//adventureBreadcrumb.link = adventure.link.toString();
						//adventureBreadcrumb.title = DataType[DataType.Adventure];
						adventureBreadcrumb.link = (<SessionInterface>this.currentElement).adventure.link;
						adventureBreadcrumb.title = DataType[DataType.Adventure];
						response.nextBreadcrumb = adventureBreadcrumb;

						sessionBreadcrumb = new ResponseBreadcrumb();
						//sessionBreadcrumb.link = (<SessionDataInterface>this.specificData).link.toString();
						sessionBreadcrumb.link = this.currentElement.link;
						sessionBreadcrumb.title = DataType[DataType.Session];
						adventureBreadcrumb.nextBreadcrumb = sessionBreadcrumb;

						//const previousSession = (<SessionDataInterface>this.specificData).previousSession;
						//const nextSession = (<SessionDataInterface>this.specificData).nextSession;

						const previousSessionBreadcrumb = new ResponseBreadcrumb();
						const nextSessionBreadcrumb = new ResponseBreadcrumb();

						//if (previousSession != null) {
						if ((<SessionInterface>this.currentElement).previousSession != null) {
							//previousSessionBreadcrumb.link = previousSession.link.toString();
							previousSessionBreadcrumb.link = (<SessionInterface>this.currentElement).previousSession?.link!;
							previousSessionBreadcrumb.linkText = '<< prev session';
							previousSessionBreadcrumb.isInNewLine = true;
							sessionBreadcrumb.nextBreadcrumb = previousSessionBreadcrumb;
						}

						const sessionNotesBreadcrumb = new ResponseBreadcrumb();
						sessionNotesBreadcrumb.link = '[[link]]';
						sessionNotesBreadcrumb.linkText = 'notes';
						//if (previousSession != null) {
						if ((<SessionInterface>this.currentElement).previousSession != null) {
							previousSessionBreadcrumb.nextBreadcrumb = sessionNotesBreadcrumb;
						} else {
							sessionNotesBreadcrumb.isInNewLine = true;
							sessionBreadcrumb.nextBreadcrumb = sessionNotesBreadcrumb;
						}

						//if (nextSession != null){
						if ((<SessionInterface>this.currentElement).nextSession != null){
							//nextSessionBreadcrumb.link = nextSession.link.toString();
							nextSessionBreadcrumb.link = (<SessionInterface>this.currentElement).nextSession?.link!;
							nextSessionBreadcrumb.linkText = 'next session >>';

							sessionNotesBreadcrumb.nextBreadcrumb = nextSessionBreadcrumb;
						}
					//}
					break;
				case DataType.Scene:
					//adventure = (<SceneDataInterface>this.specificData).adventure;
					//if (adventure != null) {
						//adventureBreadcrumb.link = adventure.link.toString();
						adventureBreadcrumb.link = (<SceneInterface>this.currentElement).adventure.link;
						adventureBreadcrumb.title = DataType[DataType.Adventure];
						response.nextBreadcrumb = adventureBreadcrumb;

						//session = (<SceneDataInterface>this.specificData).session;
						//if (session != null){
							sessionBreadcrumb = new ResponseBreadcrumb();
							//sessionBreadcrumb.link = session.link.toString();
							sessionBreadcrumb.link = (<SceneInterface>this.currentElement).session.link;
							sessionBreadcrumb.title = DataType[DataType.Session];
							adventureBreadcrumb.nextBreadcrumb = sessionBreadcrumb;

							sceneBreadcrumb = new ResponseBreadcrumb();
							//sceneBreadcrumb.link = (<SceneDataInterface>this.specificData).link.toString();
							sceneBreadcrumb.link = this.currentElement.link;
							sceneBreadcrumb.title = DataType[DataType.Scene];
							sessionBreadcrumb.nextBreadcrumb = sceneBreadcrumb;

							//const previousScene = (<SceneDataInterface>this.specificData).previousScene;
							//const nextScene = (<SceneDataInterface>this.specificData).nextScene;

							const previousSceneBreadcrumb = new ResponseBreadcrumb();
							const nextSceneBreadcrumb = new ResponseBreadcrumb();
							//if (previousScene != null) {
							if ((<SceneInterface>this.currentElement).previousScene != null) {
								//previousSceneBreadcrumb.link = previousScene.link.toString();
								previousSceneBreadcrumb.link = (<SceneInterface>this.currentElement).previousScene?.link!;
								previousSceneBreadcrumb.linkText = '<< prev scene';
								previousSceneBreadcrumb.isInNewLine = true;
								sceneBreadcrumb.nextBreadcrumb = previousSceneBreadcrumb;
							}

							//if (nextScene != null){
							if ((<SceneInterface>this.currentElement).nextScene != null){
								//nextSceneBreadcrumb.link = nextScene.link.toString();
								nextSceneBreadcrumb.link = (<SceneInterface>this.currentElement).nextScene?.link!;
								nextSceneBreadcrumb.linkText = 'next scene >>';

								//if (previousScene != null){
								if ((<SceneInterface>this.currentElement).previousScene != null) {
									previousSceneBreadcrumb.nextBreadcrumb = nextSceneBreadcrumb;
								} else {
									nextSceneBreadcrumb.isInNewLine = true;
									sceneBreadcrumb.nextBreadcrumb = nextSceneBreadcrumb;
								}
							}
						//}
					//}
					break;
				default:
					//elementBreadcrumb.link = this.specificData.link.toString();
					elementBreadcrumb.link = this.currentElement.link;
					//elementBreadcrumb.title = DataType[this.dataType];
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
