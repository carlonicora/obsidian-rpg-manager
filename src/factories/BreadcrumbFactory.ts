import {BreadcrumbFactoryInterface} from "../interfaces/factories/BreadcrumbFactoryInterface";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {BreadcrumbResponseInterface} from "../interfaces/response/BreadcrumbResponseInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ResponseBreadcrumb} from "../data/responses/ResponseBreadcrumb";
import {RecordType} from "../enums/RecordType";
import {BaseCampaignInterface} from "../interfaces/data/BaseCampaignInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {FileFactory} from "./FileFactory";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {NoteInterface} from "../interfaces/data/NoteInterface";

export class BreadcrumbFactory extends AbstractFactory implements BreadcrumbFactoryInterface {
	public create(
		record: RecordInterface,
	): BreadcrumbResponseInterface {
		const response = this.generateElementBreadcrumb(null, RecordType.Campaign, record.campaign);

		if (record.id.type !== RecordType.Campaign){
			response.mainTitle = RecordType[record.id.type];

			switch (record.id.type) {
				case RecordType.Adventure:
					this.generateAventureBreadcrumb(response, record as AdventureInterface);
					break;
				case RecordType.Session:
					this.generateSessionBreadcrumb(response, record as SessionInterface);
					break;
				case RecordType.Scene:
					this.generateSceneBreadcrumb(response, record as SceneInterface);
					break;
				case RecordType.Note:
					this.generatNoteBreadcrumb(response, record as NoteInterface);
					break;
				default:
					this.generateElementBreadcrumb(response, record.id.type, record);
					break;
			}
		}

		return response;
	}

	private generateElementBreadcrumb(
		parent: ResponseBreadcrumb|null,
		type: RecordType,
		data: RecordInterface|BaseCampaignInterface,
		linkText: string|null = null,
		isNewLine = false,
	): ResponseBreadcrumb {
		const response = new ResponseBreadcrumb(this.app);
		response.link = data.link;
		response.title = RecordType[type];

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
			RecordType.Note,
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
			RecordType.Scene,
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

	private generateAventureBreadcrumb(
		parent: ResponseBreadcrumb,
		adventure: AdventureInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, RecordType.Adventure, adventure);

		let previousAdventure: AdventureInterface|undefined;
		let nextAdventure: AdventureInterface|undefined;
		try {
			previousAdventure = this.database.readSingle<AdventureInterface>(RecordType.Adventure, adventure.id, adventure.adventureId - 1);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}
		try {
			nextAdventure = this.database.readSingle<AdventureInterface>(RecordType.Adventure, adventure.id, adventure.adventureId + 1);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}

		let previousBreadcrumb: ResponseBreadcrumb|undefined = undefined;
		let nextBreadcrumb: ResponseBreadcrumb|undefined = undefined;
		if (previousAdventure !== undefined) {
			previousBreadcrumb = this.generateElementBreadcrumb(
				adventureBreadcrumb,
				RecordType.Adventure,
				previousAdventure,
				'<< prev adventure',
				true,
			);
		}
		if (nextAdventure !== undefined) {
			nextBreadcrumb = this.generateElementBreadcrumb(
				(previousBreadcrumb ?? adventureBreadcrumb),
				RecordType.Adventure,
				nextAdventure,
				'next adventure >>',
				(previousAdventure !== undefined ? false : true),
			);
		}

		if (nextBreadcrumb !== undefined){
			return nextBreadcrumb;
		} else {
			if (previousBreadcrumb !== undefined) return previousBreadcrumb;
			return adventureBreadcrumb;
		}
	}

	private generateSessionBreadcrumb(
		parent: ResponseBreadcrumb,
		session: SessionInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, RecordType.Adventure, session.adventure);
		const sessionBreadcrumb = this.generateElementBreadcrumb(adventureBreadcrumb, RecordType.Session, session);

		let previousBreadcrumb: ResponseBreadcrumb|null = null;
		if (session.previousSession != null) previousBreadcrumb = this.generateElementBreadcrumb(sessionBreadcrumb, RecordType.Session, session.previousSession, '<< prev session', true);

		let sessionNotesBreadcrumb: ResponseBreadcrumb;
		if (session.note != null) {
			sessionNotesBreadcrumb = this.generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : sessionBreadcrumb), RecordType.Note, session.note, 'notes');
		} else {
			sessionNotesBreadcrumb = new ResponseBreadcrumb(this.app);
			sessionNotesBreadcrumb.link = '';
			sessionNotesBreadcrumb.linkText = 'create session notes';
			sessionNotesBreadcrumb.functionParameters = [session, this.factories.files]
			sessionNotesBreadcrumb.function = this.noteCreator;
			if (previousBreadcrumb != null) {
				previousBreadcrumb.nextBreadcrumb = sessionNotesBreadcrumb;
			} else {
				sessionNotesBreadcrumb.isInNewLine = true;
				sessionBreadcrumb.nextBreadcrumb = sessionNotesBreadcrumb;
			}
		}

		let nextBreadcrumb: ResponseBreadcrumb|null = null;
		if (session.nextSession != null) nextBreadcrumb = this.generateElementBreadcrumb(sessionNotesBreadcrumb, RecordType.Session, session.nextSession, 'next session >>');

		return (nextBreadcrumb != null ? nextBreadcrumb : sessionNotesBreadcrumb);
	}

	private generateSceneBreadcrumb(
		parent: ResponseBreadcrumb,
		scene: SceneInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, RecordType.Adventure, scene.adventure);
		const sessionBreadcrumb = this.generateElementBreadcrumb(adventureBreadcrumb, RecordType.Session, scene.session);
		const sceneBreadcrumb = this.generateElementBreadcrumb(sessionBreadcrumb, RecordType.Scene, scene)

		let previousBreadcrumb: ResponseBreadcrumb|null = null;
		if (scene.previousScene != null) previousBreadcrumb = this.generateElementBreadcrumb(sceneBreadcrumb, RecordType.Scene, scene.previousScene, '<< prev scene', true);

		let nextBreadcrumb: ResponseBreadcrumb|null = null;
		if (scene.nextScene != null) {
			nextBreadcrumb = this.generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : sceneBreadcrumb), RecordType.Scene, scene.nextScene, 'next scene >>', (previousBreadcrumb != null ? false : true));
		} else {
			const newSceneBreadcrumb = new ResponseBreadcrumb(this.app);
			newSceneBreadcrumb.link = '';
			newSceneBreadcrumb.linkText = '+ add scene >>';
			newSceneBreadcrumb.functionParameters = [scene, this.factories.files];
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

	private generatNoteBreadcrumb(
		parent: ResponseBreadcrumb,
		note: NoteInterface,
	): ResponseBreadcrumb {
		if (note.adventure === undefined) return parent;
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, RecordType.Adventure, note.adventure);

		const session = this.database.readSingle<SessionInterface>(RecordType.Session, note.id);
		if (session === undefined) return adventureBreadcrumb;

		const sessionBreadcrumb = this.generateElementBreadcrumb(adventureBreadcrumb, RecordType.Session, session);
		const noteBreadcrumb = this.generateElementBreadcrumb(sessionBreadcrumb, RecordType.Note, note);

		return noteBreadcrumb;
	}
}
