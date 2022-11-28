import {BreadcrumbFactoryInterface} from "../interfaces/BreadcrumbFactoryInterface";
import {BreadcrumbElementInterface} from "../interfaces/BreadcrumbElementInterface";
import {BreadcrumbElement} from "../BreadcrumbElement";
import {ComponentType} from "../../../core/enums/ComponentType";
import {FileCreationService} from "../../fileCreationService/FileCreationService";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {AdventureInterface} from "../../../components/adventure/interfaces/AdventureInterface";
import {SessionInterface} from "../../../components/session/interfaces/SessionInterface";
import {ActInterface} from "../../../components/act/interfaces/ActInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export class BreadcrumbFactory implements BreadcrumbFactoryInterface {
	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public create(
		model: ModelInterface,
	): BreadcrumbElementInterface {
		const response = this._generateElementBreadcrumb(null, model.campaign);

		if (model.index.type !== ComponentType.Campaign){
			response.mainTitle = ComponentType[model.index.type];

			switch (model.index.type) {
				case ComponentType.Adventure:
					this._generateAventureBreadcrumb(response, model as AdventureInterface);
					break;
				case ComponentType.Session:
					this._generateSessionBreadcrumb(response, model as SessionInterface);
					break;
				case ComponentType.Act:
					this._generateActBreadcrumb(response, model as ActInterface);
					break;
				case ComponentType.Scene:
					this._generateSceneBreadcrumb(response, model as SceneInterface);
					break;
				default:
					this._generateElementBreadcrumb(response, model);
					break;
			}
		}

		response.model = model;

		return response;
	}

	private _generateElementBreadcrumb(
		parent: BreadcrumbElement|null,
		data: ModelInterface,
		linkText: string|null = null,
		isNewLine = false,
	): BreadcrumbElement {
		const response = new BreadcrumbElement(data);

		if (linkText != null)
			response.linkText = linkText;

		if (isNewLine)
			response.isInNewLine = isNewLine;

		if (parent != null)
			parent.nextBreadcrumb = response;

		return response;
	}

	sceneCreator = function(
		scene: SceneInterface,
		fileFactory: FileCreationService,
	){
		const scenePosition = (scene.index.positionInParent ?? 0) + 1;

		fileFactory.silentCreate(
			ComponentType.Scene,
			'a' +
			((scene.act.index.parentPosition ?? 0) < 10 ? '0' + scene.act.index.parentPosition.toString(): scene.act.index.parentPosition.toString()) +
			's' +
			(scenePosition < 10 ? '0' + scenePosition.toString() : scenePosition.toString()),
			scene.campaign.index.campaignId,
			scene.act.index.id,
			scenePosition,
			undefined,
			true,
		);
	};

	private _generateAventureBreadcrumb(
		parent: BreadcrumbElement,
		adventure: AdventureInterface
	): BreadcrumbElement {
		const adventureBreadcrumb = this._generateElementBreadcrumb(parent, adventure);

		let previousAdventure: AdventureInterface|undefined;
		let nextAdventure: AdventureInterface|undefined;
		try {
			previousAdventure = this._api.database.readNeighbour<AdventureInterface>(ComponentType.Adventure, adventure.index, true);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}
		try {
			nextAdventure = this._api.database.readNeighbour<AdventureInterface>(ComponentType.Adventure, adventure.index, false);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}

		let previousBreadcrumb: BreadcrumbElement|undefined = undefined;
		let nextBreadcrumb: BreadcrumbElement|undefined = undefined;
		if (previousAdventure !== undefined) {
			previousBreadcrumb = this._generateElementBreadcrumb(
				adventureBreadcrumb,
				previousAdventure,
				'<< prev adventure',
				true,
			);
		}
		if (nextAdventure !== undefined) {
			nextBreadcrumb = this._generateElementBreadcrumb(
				(previousBreadcrumb ?? adventureBreadcrumb),
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
		parent: BreadcrumbElement,
		session: SessionInterface
	): BreadcrumbElement {
		const sessionBreadcrumb = this._generateElementBreadcrumb(parent, session);

		let previousSession: SessionInterface|undefined;
		let nextSession: SessionInterface|undefined;
		try {
			// previousSession = this._api.database.readSingle<SessionInterface>(ComponentType.Session, session.index, (session.index.sessionId ?? 0) - 1);
			previousSession = this._api.database.readNeighbour<SessionInterface>(ComponentType.Session, session.index, true);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}
		try {
			//nextSession = this._api.database.readSingle<SessionInterface>(ComponentType.Session, session.index, (session.index.sessionId ?? 0) + 1);
			nextSession = this._api.database.readNeighbour<SessionInterface>(ComponentType.Session, session.index, false);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}

		let previousBreadcrumb: BreadcrumbElement|undefined = undefined;
		let nextBreadcrumb: BreadcrumbElement|undefined = undefined;
		if (previousSession !== undefined) {
			previousBreadcrumb = this._generateElementBreadcrumb(
				sessionBreadcrumb,
				previousSession,
				'<< prev session',
				true,
			);
		}
		if (nextSession !== undefined) {
			nextBreadcrumb = this._generateElementBreadcrumb(
				(previousBreadcrumb ?? sessionBreadcrumb),
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
		parent: BreadcrumbElement,
		act: ActInterface
	): BreadcrumbElement {
		const adventureBreadcrumb = this._generateElementBreadcrumb(parent, act.adventure);
		const actBreadcrumb = this._generateElementBreadcrumb(adventureBreadcrumb, act);

		let previousBreadcrumb: BreadcrumbElement|null = null;
		if (act.previousAct != null) previousBreadcrumb = this._generateElementBreadcrumb(actBreadcrumb, act.previousAct, '<< prev act', true);

		let nextBreadcrumb: BreadcrumbElement|null = null;
		if (act.nextAct != null) nextBreadcrumb = this._generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : actBreadcrumb), act.nextAct, 'next act >>', (previousBreadcrumb == null));

		return (nextBreadcrumb != null ? nextBreadcrumb : (previousBreadcrumb != null ? previousBreadcrumb : actBreadcrumb));
	}

	private _generateSceneBreadcrumb(
		parent: BreadcrumbElement,
		scene: SceneInterface,
	): BreadcrumbElement {
		const adventureBreadcrumb = this._generateElementBreadcrumb(parent, scene.adventure);
		const actBreadcrumb = this._generateElementBreadcrumb(adventureBreadcrumb, scene.act);
		const sceneBreadcrumb = this._generateElementBreadcrumb(actBreadcrumb, scene);

		let previousBreadcrumb: BreadcrumbElement|null = null;
		if (scene.previousScene != null)
			previousBreadcrumb = this._generateElementBreadcrumb(sceneBreadcrumb, scene.previousScene, '<< prev scene', true);

		let nextBreadcrumb: BreadcrumbElement|null = null;
		if (scene.nextScene != null) {
			nextBreadcrumb = this._generateElementBreadcrumb((previousBreadcrumb != null ? previousBreadcrumb : sceneBreadcrumb), scene.nextScene, 'next scene >>', (previousBreadcrumb == null));
		} else {
			const newSceneBreadcrumb = new BreadcrumbElement(scene);
			newSceneBreadcrumb.link = '';
			newSceneBreadcrumb.linkText = '+ add scene >>';
			newSceneBreadcrumb.functionParameters = [scene, this._api.service(FileCreationService)];
			newSceneBreadcrumb.function = this.sceneCreator;
			if (previousBreadcrumb == null){
				newSceneBreadcrumb.isInNewLine = true;
				sceneBreadcrumb.nextBreadcrumb = newSceneBreadcrumb;
			} else {
				previousBreadcrumb.nextBreadcrumb = newSceneBreadcrumb;
			}
		}

		let lastBreadcrumb = (nextBreadcrumb != null ? nextBreadcrumb : (previousBreadcrumb != null ? previousBreadcrumb : sceneBreadcrumb))

		if (scene.session !== undefined){
			const sessionBreadcrumb = new BreadcrumbElement(scene.session);
			sessionBreadcrumb.isInNewLine = true;
			lastBreadcrumb.nextBreadcrumb = sessionBreadcrumb;

			lastBreadcrumb = sessionBreadcrumb;

			if (scene.positionInSession !== undefined) {
				if (scene.positionInSession > 1) {
					const previousSceneInSession = this._api.database.read<SceneInterface>((model: SceneInterface) =>
						model.index.type === ComponentType.Scene &&
						model.session !== undefined &&
						model.session.index.id === scene.session?.index.id &&
						model.positionInSession !== undefined &&
						scene.positionInSession !== undefined &&
						model.positionInSession === (scene.positionInSession - 1)
					);

					if (previousSceneInSession.length === 1)
						lastBreadcrumb = this._generateElementBreadcrumb(lastBreadcrumb, previousSceneInSession[0], '<< prev scene in session');

				}

				const nextSceneInSession = this._api.database.read<SceneInterface>((model: SceneInterface) =>
					model.index.type === ComponentType.Scene &&
					model.session !== undefined &&
					model.session.index.id === scene.session?.index.id &&
					model.positionInSession !== undefined &&
					scene.positionInSession !== undefined &&
					model.positionInSession === (scene.positionInSession +1)
				);

				if (nextSceneInSession.length === 1)
					lastBreadcrumb = this._generateElementBreadcrumb(lastBreadcrumb, nextSceneInSession[0], 'next scene in session >>');

			}
		}

		return lastBreadcrumb;
	}
}
