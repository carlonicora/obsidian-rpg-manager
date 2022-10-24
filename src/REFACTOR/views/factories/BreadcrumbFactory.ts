import {BreadcrumbFactoryInterface} from "./interfaces/BreadcrumbFactoryInterface";
import {BreadcrumbResponseInterface} from "../../../responses/interfaces/BreadcrumbResponseInterface";
import {AbstractFactory} from "../../../core/abstracts/AbstractFactory";
import {ResponseBreadcrumb} from "../../../responses/ResponseBreadcrumb";
import {ComponentType} from "../../../core/enums/ComponentType";
import {FileFactory} from "../../../core/factories/FileFactory";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {AdventureInterface} from "../../../components/adventure/interfaces/AdventureInterface";
import {SessionInterface} from "../../../components/session/interfaces/SessionInterface";
import {ActInterface} from "../../../components/act/interfaces/ActInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";

export class BreadcrumbFactory extends AbstractFactory implements BreadcrumbFactoryInterface {
	public create(
		component: ComponentModelInterface,
	): BreadcrumbResponseInterface {
		const response = this._generateElementBreadcrumb(null, ComponentType.Campaign, component.campaign);

		if (component.id.type !== ComponentType.Campaign){
			response.mainTitle = ComponentType[component.id.type];

			switch (component.id.type) {
				case ComponentType.Adventure:
					this._generateAventureBreadcrumb(response, component as AdventureInterface);
					break;
				case ComponentType.Session:
					this._generateSessionBreadcrumb(response, component as SessionInterface);
					break;
				case ComponentType.Act:
					this._generateActBreadcrumb(response, component as ActInterface);
					break;
				case ComponentType.Scene:
					this._generateSceneBreadcrumb(response, component as SceneInterface);
					break;
				default:
					this._generateElementBreadcrumb(response, component.id.type, component);
					break;
			}
		}

		response.component = component;

		return response;
	}

	private _generateElementBreadcrumb(
		parent: ResponseBreadcrumb|null,
		type: ComponentType,
		data: ComponentModelInterface,
		linkText: string|null = null,
		isNewLine = false,
	): ResponseBreadcrumb {
		const response = new ResponseBreadcrumb(this.app, <ComponentModelInterface>data);
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
			undefined,
			undefined,
			true,
		);
	}

	private _generateAventureBreadcrumb(
		parent: ResponseBreadcrumb,
		adventure: AdventureInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this._generateElementBreadcrumb(parent, ComponentType.Adventure, adventure);

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
			previousBreadcrumb = this._generateElementBreadcrumb(
				adventureBreadcrumb,
				ComponentType.Adventure,
				previousAdventure,
				'<< prev adventure',
				true,
			);
		}
		if (nextAdventure !== undefined) {
			nextBreadcrumb = this._generateElementBreadcrumb(
				(previousBreadcrumb ?? adventureBreadcrumb),
				ComponentType.Adventure,
				nextAdventure,
				'next adventure >>',
				(previousAdventure === undefined),
			);
		}

		if (nextBreadcrumb !== undefined){
			return nextBreadcrumb;
		} else {
			if (previousBreadcrumb !== undefined) return previousBreadcrumb;
			return adventureBreadcrumb;
		}
	}

	private _generateSessionBreadcrumb(
		parent: ResponseBreadcrumb,
		session: SessionInterface
	): ResponseBreadcrumb {
		const sessionBreadcrumb = this._generateElementBreadcrumb(parent, ComponentType.Session, session);

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
			previousBreadcrumb = this._generateElementBreadcrumb(
				sessionBreadcrumb,
				ComponentType.Session,
				previousSession,
				'<< prev session',
				true,
			);
		}
		if (nextSession !== undefined) {
			nextBreadcrumb = this._generateElementBreadcrumb(
				(previousBreadcrumb ?? sessionBreadcrumb),
				ComponentType.Session,
				nextSession,
				'next session >>',
				(previousSession === undefined),
			);
		}

		if (nextBreadcrumb !== undefined){
			return nextBreadcrumb;
		} else {
			if (previousBreadcrumb !== undefined) return previousBreadcrumb;
			return sessionBreadcrumb;
		}
	}

	private _generateActBreadcrumb(
		parent: ResponseBreadcrumb,
		act: ActInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this._generateElementBreadcrumb(parent, ComponentType.Adventure, act.adventure);
		const actBreadcrumb = this._generateElementBreadcrumb(adventureBreadcrumb, ComponentType.Act, act);

		let previousBreadcrumb: ResponseBreadcrumb|null = null;
		if (act.previousAct != null) previousBreadcrumb = this._generateElementBreadcrumb(actBreadcrumb, ComponentType.Act, act.previousAct, '<< prev act', true);

		let nextBreadcrumb: ResponseBreadcrumb|null = null;
		if (act.nextAct != null) nextBreadcrumb = this._generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : actBreadcrumb), ComponentType.Act, act.nextAct, 'next act >>', (previousBreadcrumb == null));

		return (nextBreadcrumb != null ? nextBreadcrumb : (previousBreadcrumb != null ? previousBreadcrumb : actBreadcrumb));
	}

	private _generateSceneBreadcrumb(
		parent: ResponseBreadcrumb,
		scene: SceneInterface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this._generateElementBreadcrumb(parent, ComponentType.Adventure, scene.adventure);
		const actBreadcrumb = this._generateElementBreadcrumb(adventureBreadcrumb, ComponentType.Act, scene.act);
		const sceneBreadcrumb = this._generateElementBreadcrumb(actBreadcrumb, ComponentType.Scene, scene)

		let previousBreadcrumb: ResponseBreadcrumb|null = null;
		if (scene.previousScene != null) previousBreadcrumb = this._generateElementBreadcrumb(sceneBreadcrumb, ComponentType.Scene, scene.previousScene, '<< prev scene', true);

		let nextBreadcrumb: ResponseBreadcrumb|null = null;
		if (scene.nextScene != null) {
			nextBreadcrumb = this._generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : sceneBreadcrumb), ComponentType.Scene, scene.nextScene, 'next scene >>', (previousBreadcrumb == null));
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
