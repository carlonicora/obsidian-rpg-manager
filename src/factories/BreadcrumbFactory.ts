import {BreadcrumbFactoryInterface} from "../interfaces/factories/BreadcrumbFactoryInterface";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {BreadcrumbResponseInterface} from "../interfaces/response/BreadcrumbResponseInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ResponseBreadcrumb} from "../data/responses/ResponseBreadcrumb";
import {RecordType} from "../enums/RecordType";
import {BaseCampaignInterface} from "../interfaces/data/BaseCampaignInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {FileFactory} from "./FileFactory";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";

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
				case RecordType.Act:
					this.generateActBreadcrumb(response, record as ActInterface);
					break;
				case RecordType.Scene:
					this.generateSceneBreadcrumb(response, record as SceneInterface);
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
		const response = new ResponseBreadcrumb(this.app, <RecordInterface>data);
		response.link = data.link;
		response.title = RecordType[type];

		if (linkText != null) response.linkText = linkText;
		if (isNewLine) response.isInNewLine = isNewLine;

		if (parent != null) parent.nextBreadcrumb = response;

		return response;
	}

	sceneCreator = function(
		scene: SceneInterface,
		fileFactory: FileFactory,
	){
		const newSceneId = scene.sceneId + 1;
		fileFactory.silentCreate(
			RecordType.Scene,
			'a' +
			(scene.act.actId < 10 ? '0' + scene.act.actId.toString(): scene.act.actId.toString()) +
			's' +
			(newSceneId < 10 ? '0' + newSceneId.toString() : newSceneId.toString()),
			scene.campaign.campaignId,
			scene.adventure.adventureId,
			scene.act.actId,
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
		const sessionBreadcrumb = this.generateElementBreadcrumb(parent, RecordType.Session, session);

		let previousSession: SessionInterface|undefined;
		let nextSession: SessionInterface|undefined;
		try {
			previousSession = this.database.readSingle<SessionInterface>(RecordType.Session, session.id, session.sessionId - 1);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}
		try {
			nextSession = this.database.readSingle<SessionInterface>(RecordType.Session, session.id, session.sessionId + 1);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}

		let previousBreadcrumb: ResponseBreadcrumb|undefined = undefined;
		let nextBreadcrumb: ResponseBreadcrumb|undefined = undefined;
		if (previousSession !== undefined) {
			previousBreadcrumb = this.generateElementBreadcrumb(
				sessionBreadcrumb,
				RecordType.Session,
				previousSession,
				'<< prev session',
				true,
			);
		}
		if (nextSession !== undefined) {
			nextBreadcrumb = this.generateElementBreadcrumb(
				(previousBreadcrumb ?? sessionBreadcrumb),
				RecordType.Session,
				nextSession,
				'next session >>',
				(previousSession !== undefined ? false : true),
			);
		}

		if (nextBreadcrumb !== undefined){
			return nextBreadcrumb;
		} else {
			if (previousBreadcrumb !== undefined) return previousBreadcrumb;
			return sessionBreadcrumb;
		}
	}

	private generateActBreadcrumb(
		parent: ResponseBreadcrumb,
		act: ActInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, RecordType.Adventure, act.adventure);
		const actBreadcrumb = this.generateElementBreadcrumb(adventureBreadcrumb, RecordType.Act, act);

		let previousBreadcrumb: ResponseBreadcrumb|null = null;
		if (act.previousAct != null) previousBreadcrumb = this.generateElementBreadcrumb(actBreadcrumb, RecordType.Act, act.previousAct, '<< prev act', true);

		let nextBreadcrumb: ResponseBreadcrumb|null = null;
		if (act.nextAct != null) nextBreadcrumb = this.generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : actBreadcrumb), RecordType.Act, act.nextAct, 'next act >>', (previousBreadcrumb != null ? false : true));

		return (nextBreadcrumb != null ? nextBreadcrumb : (previousBreadcrumb != null ? previousBreadcrumb : actBreadcrumb));
	}

	private generateSceneBreadcrumb(
		parent: ResponseBreadcrumb,
		scene: SceneInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, RecordType.Adventure, scene.adventure);
		const actBreadcrumb = this.generateElementBreadcrumb(adventureBreadcrumb, RecordType.Act, scene.act);
		const sceneBreadcrumb = this.generateElementBreadcrumb(actBreadcrumb, RecordType.Scene, scene)

		let previousBreadcrumb: ResponseBreadcrumb|null = null;
		if (scene.previousScene != null) previousBreadcrumb = this.generateElementBreadcrumb(sceneBreadcrumb, RecordType.Scene, scene.previousScene, '<< prev scene', true);

		let nextBreadcrumb: ResponseBreadcrumb|null = null;
		if (scene.nextScene != null) {
			nextBreadcrumb = this.generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : sceneBreadcrumb), RecordType.Scene, scene.nextScene, 'next scene >>', (previousBreadcrumb != null ? false : true));
		} else {
			const newSceneBreadcrumb = new ResponseBreadcrumb(this.app, scene);
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
}
