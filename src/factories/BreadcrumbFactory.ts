import {BreadcrumbFactoryInterface} from "../interfaces/factories/BreadcrumbFactoryInterface";
import {BreadcrumbResponseInterface} from "../interfaces/response/subModels/BreadcrumbResponseInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ResponseBreadcrumb} from "../responses/ResponseBreadcrumb";
import {ComponentType} from "../enums/ComponentType";
import {FileFactory} from "./FileFactory";
import {ComponentInterface} from "../database/interfaces/ComponentInterface";
import {AdventureInterface} from "../database/components/interfaces/AdventureInterface";
import {SessionInterface} from "../database/components/interfaces/SessionInterface";
import {ActInterface} from "../database/components/interfaces/ActInterface";
import {SceneInterface} from "../database/components/interfaces/SceneInterface";

export class BreadcrumbFactory extends AbstractFactory implements BreadcrumbFactoryInterface {
	public create(
		component: ComponentInterface,
	): BreadcrumbResponseInterface {
		const response = this.generateElementBreadcrumb(null, ComponentType.Campaign, component.campaign);

		if (component.id.type !== ComponentType.Campaign){
			response.mainTitle = ComponentType[component.id.type];

			switch (component.id.type) {
				case ComponentType.Adventure:
					this.generateAventureBreadcrumb(response, component as AdventureInterface);
					break;
				case ComponentType.Session:
					this.generateSessionBreadcrumb(response, component as SessionInterface);
					break;
				case ComponentType.Act:
					this.generateActBreadcrumb(response, component as ActInterface);
					break;
				case ComponentType.Scene:
					this.generateSceneBreadcrumb(response, component as SceneInterface);
					break;
				default:
					this.generateElementBreadcrumb(response, component.id.type, component);
					break;
			}
		}

		return response;
	}

	private generateElementBreadcrumb(
		parent: ResponseBreadcrumb|null,
		type: ComponentType,
		data: ComponentInterface,
		linkText: string|null = null,
		isNewLine = false,
	): ResponseBreadcrumb {
		const response = new ResponseBreadcrumb(this.app, <ComponentInterface>data);
		response.link = data.link;
		response.title = ComponentType[type];

		if (linkText != null) response.linkText = linkText;
		if (isNewLine) response.isInNewLine = isNewLine;

		if (parent != null) parent.nextBreadcrumb = response;

		return response;
	}

	sceneCreator = function(
		scene: SceneInterface,
		fileFactory: FileFactory,
	){
		const newSceneId = (scene.id.sceneId ?? 0) + 1;
		fileFactory.silentCreate(
			ComponentType.Scene,
			'a' +
			((scene.act.id.actId ?? 0) < 10 ? '0' + scene.act.id.actId?.toString(): scene.act.id.actId?.toString()) +
			's' +
			(newSceneId < 10 ? '0' + newSceneId.toString() : newSceneId.toString()),
			scene.campaign.id.campaignId,
			scene.adventure.id.adventureId,
			scene.act.id.actId,
			newSceneId,
		);
	}

	private generateAventureBreadcrumb(
		parent: ResponseBreadcrumb,
		adventure: AdventureInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, ComponentType.Adventure, adventure);

		let previousAdventure: AdventureInterface|undefined;
		let nextAdventure: AdventureInterface|undefined;
		try {
			previousAdventure = this.database.readSingle<AdventureInterface>(ComponentType.Adventure, adventure.id, (adventure.id.adventureId ?? 0) - 1);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}
		try {
			nextAdventure = this.database.readSingle<AdventureInterface>(ComponentType.Adventure, adventure.id, (adventure.id.adventureId ?? 0) + 1);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}

		let previousBreadcrumb: ResponseBreadcrumb|undefined = undefined;
		let nextBreadcrumb: ResponseBreadcrumb|undefined = undefined;
		if (previousAdventure !== undefined) {
			previousBreadcrumb = this.generateElementBreadcrumb(
				adventureBreadcrumb,
				ComponentType.Adventure,
				previousAdventure,
				'<< prev adventure',
				true,
			);
		}
		if (nextAdventure !== undefined) {
			nextBreadcrumb = this.generateElementBreadcrumb(
				(previousBreadcrumb ?? adventureBreadcrumb),
				ComponentType.Adventure,
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
		const sessionBreadcrumb = this.generateElementBreadcrumb(parent, ComponentType.Session, session);

		let previousSession: SessionInterface|undefined;
		let nextSession: SessionInterface|undefined;
		try {
			previousSession = this.database.readSingle<SessionInterface>(ComponentType.Session, session.id, (session.id.sessionId ?? 0) - 1);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}
		try {
			nextSession = this.database.readSingle<SessionInterface>(ComponentType.Session, session.id, (session.id.sessionId ?? 0) + 1);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}

		let previousBreadcrumb: ResponseBreadcrumb|undefined = undefined;
		let nextBreadcrumb: ResponseBreadcrumb|undefined = undefined;
		if (previousSession !== undefined) {
			previousBreadcrumb = this.generateElementBreadcrumb(
				sessionBreadcrumb,
				ComponentType.Session,
				previousSession,
				'<< prev session',
				true,
			);
		}
		if (nextSession !== undefined) {
			nextBreadcrumb = this.generateElementBreadcrumb(
				(previousBreadcrumb ?? sessionBreadcrumb),
				ComponentType.Session,
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
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, ComponentType.Adventure, act.adventure);
		const actBreadcrumb = this.generateElementBreadcrumb(adventureBreadcrumb, ComponentType.Act, act);

		let previousBreadcrumb: ResponseBreadcrumb|null = null;
		if (act.previousAct != null) previousBreadcrumb = this.generateElementBreadcrumb(actBreadcrumb, ComponentType.Act, act.previousAct, '<< prev act', true);

		let nextBreadcrumb: ResponseBreadcrumb|null = null;
		if (act.nextAct != null) nextBreadcrumb = this.generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : actBreadcrumb), ComponentType.Act, act.nextAct, 'next act >>', (previousBreadcrumb != null ? false : true));

		return (nextBreadcrumb != null ? nextBreadcrumb : (previousBreadcrumb != null ? previousBreadcrumb : actBreadcrumb));
	}

	private generateSceneBreadcrumb(
		parent: ResponseBreadcrumb,
		scene: SceneInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, ComponentType.Adventure, scene.adventure);
		const actBreadcrumb = this.generateElementBreadcrumb(adventureBreadcrumb, ComponentType.Act, scene.act);
		const sceneBreadcrumb = this.generateElementBreadcrumb(actBreadcrumb, ComponentType.Scene, scene)

		let previousBreadcrumb: ResponseBreadcrumb|null = null;
		if (scene.previousScene != null) previousBreadcrumb = this.generateElementBreadcrumb(sceneBreadcrumb, ComponentType.Scene, scene.previousScene, '<< prev scene', true);

		let nextBreadcrumb: ResponseBreadcrumb|null = null;
		if (scene.nextScene != null) {
			nextBreadcrumb = this.generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : sceneBreadcrumb), ComponentType.Scene, scene.nextScene, 'next scene >>', (previousBreadcrumb != null ? false : true));
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
