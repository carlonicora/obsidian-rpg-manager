import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {App} from "obsidian";
import {DataType} from "../enums/DataType";
import {BreadcrumbResponseInterface} from "../interfaces/response/BreadcrumbResponseInterface";
import {ResponseBreadcrumb} from "../data/responses/ResponseBreadcrumb";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {BaseCampaignInterface} from "../interfaces/data/BaseCampaignInterface";
import {FileFactory} from "../factories/FileFactory";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {ComponentFactory} from "../factories/ComponentFactory";
import {ResponseData} from "../data/responses/ResponseData";

export abstract class AbstractModel implements ModelInterface {
	protected io: DatabaseInterface;
	protected componentFactory: ComponentFactory;
	protected response:ResponseDataInterface;

	constructor(
		protected app: App,
		protected currentElement: RecordInterface,
		protected source: string,
		protected sourcePath: string,
		protected sourceMeta: any,
	) {
		this.io = this.app.plugins.getPlugin('rpg-manager').database;
		this.componentFactory = this.app.plugins.getPlugin('rpg-manager').factories.components;
		this.response = new ResponseData(this.app);
	}

	protected generateBreadcrumb(
	): BreadcrumbResponseInterface {
		const response = this.generateElementBreadcrumb(null, DataType.Campaign, this.currentElement.campaign);

		if (this.currentElement.id.type !== DataType.Campaign){
			response.mainTitle = DataType[this.currentElement.id.type];

			switch (this.currentElement.id.type) {
				case DataType.Adventure:
					this.generateElementBreadcrumb(response, DataType.Adventure, this.currentElement);
					break;
				case DataType.Session:
					this.generateSessionBreadcrumb(response, this.currentElement as SessionInterface);
					break;
				case DataType.Scene:
					this.generateSceneBreadcrumb(response, this.currentElement as SceneInterface);
					break;
				default:
					this.generateElementBreadcrumb(response, this.currentElement.id.type, this.currentElement);
					break;
			}
		}

		return response;
	}

	abstract generateData(
	): Promise<ResponseDataInterface>;

	private generateElementBreadcrumb(
		parent: ResponseBreadcrumb|null,
		type: DataType,
		data: RecordInterface|BaseCampaignInterface,
		linkText: string|null = null,
		isNewLine = false,
	): ResponseBreadcrumb {
		const response = new ResponseBreadcrumb(this.app);
		response.link = data.link;
		response.title = DataType[type];

		if (linkText != null) response.linkText = linkText;
		if (isNewLine) response.isInNewLine = isNewLine;

		if (parent != null) parent.nextBreadcrumb = response;

		return response;
	}

	noteCreator = function(
		session: SessionInterface,
		fileFactory: FileFactory,
	){
		fileFactory.silentCreate(
			DataType.Note,
			'Note - ' + session.name,
			session.campaign.campaignId,
			session.adventure.adventureId,
			session.sessionId
		);
	}

	sceneCreator = function(
		scene: SceneInterface,
		fileFactory: FileFactory,
	){
		const newSceneId = scene.sceneId + 1;
		fileFactory.silentCreate(
			DataType.Scene,
			's' +
				(scene.session.sessionId < 10 ? '0' + scene.session.sessionId.toString(): scene.session.sessionId.toString()) +
				'e' +
				(newSceneId < 10 ? '0' + newSceneId.toString() : newSceneId.toString()),
			scene.campaign.campaignId,
			scene.adventure.adventureId,
			scene.session.sessionId,
			newSceneId,
		);
	}

	private generateSessionBreadcrumb(
		parent: ResponseBreadcrumb,
		session: SessionInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, DataType.Adventure, session.adventure);
		const sessionBreadcrumb = this.generateElementBreadcrumb(adventureBreadcrumb, DataType.Session, session);

		let previousBreadcrumb: ResponseBreadcrumb|null = null;
		if (session.previousSession != null) previousBreadcrumb = this.generateElementBreadcrumb(sessionBreadcrumb, DataType.Session, session.previousSession, '<< prev session', true);

		let sessionNotesBreadcrumb: ResponseBreadcrumb;
		if (session.note != null) {
			sessionNotesBreadcrumb = this.generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : sessionBreadcrumb), DataType.Note, session.note, 'notes');
		} else {
			sessionNotesBreadcrumb = new ResponseBreadcrumb(this.app);
			sessionNotesBreadcrumb.link = '';
			sessionNotesBreadcrumb.linkText = 'create session notes';
			sessionNotesBreadcrumb.functionParameters = [this.currentElement as SessionInterface, this.app.plugins.getPlugin('rpg-manager').factories.files]
			sessionNotesBreadcrumb.function = this.noteCreator;
			if (previousBreadcrumb != null) {
				previousBreadcrumb.nextBreadcrumb = sessionNotesBreadcrumb;
			} else {
				sessionNotesBreadcrumb.isInNewLine = true;
				sessionBreadcrumb.nextBreadcrumb = sessionNotesBreadcrumb;
			}
		}

		let nextBreadcrumb: ResponseBreadcrumb|null = null;
		if (session.nextSession != null) nextBreadcrumb = this.generateElementBreadcrumb(sessionNotesBreadcrumb, DataType.Session, session.nextSession, 'next session >>');

		return (nextBreadcrumb != null ? nextBreadcrumb : sessionNotesBreadcrumb);
	}

	private generateSceneBreadcrumb(
		parent: ResponseBreadcrumb,
		scene: SceneInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, DataType.Adventure, scene.adventure);
		const sessionBreadcrumb = this.generateElementBreadcrumb(adventureBreadcrumb, DataType.Session, scene.session);
		const sceneBreadcrumb = this.generateElementBreadcrumb(sessionBreadcrumb, DataType.Scene, scene)

		let previousBreadcrumb: ResponseBreadcrumb|null = null;
		if (scene.previousScene != null) previousBreadcrumb = this.generateElementBreadcrumb(sceneBreadcrumb, DataType.Scene, scene.previousScene, '<< prev scene', true);

		let nextBreadcrumb: ResponseBreadcrumb|null = null;
		if (scene.nextScene != null) {
			nextBreadcrumb = this.generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : sceneBreadcrumb), DataType.Scene, scene.nextScene, 'next scene >>', (previousBreadcrumb != null ? false : true));
		} else {
			const newSceneBreadcrumb = new ResponseBreadcrumb(this.app);
			newSceneBreadcrumb.link = '';
			newSceneBreadcrumb.linkText = '+ add scene >>';
			newSceneBreadcrumb.functionParameters = [this.currentElement as SceneInterface, this.app.plugins.getPlugin('rpg-manager').factories.files];
			newSceneBreadcrumb.function = this.sceneCreator;
			if (previousBreadcrumb == null){
				newSceneBreadcrumb.isInNewLine = true;
				sceneBreadcrumb.nextBreadcrumb = newSceneBreadcrumb;
			} else {
				previousBreadcrumb.nextBreadcrumb = newSceneBreadcrumb;
			}
		}

		return (nextBreadcrumb != null ? nextBreadcrumb : (previousBreadcrumb != null ? previousBreadcrumb : sceneBreadcrumb));
	}
}
