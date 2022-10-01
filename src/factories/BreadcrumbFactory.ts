import {BreadcrumbFactoryInterface} from "../interfaces/factories/BreadcrumbFactoryInterface";
import {BreadcrumbResponseInterface} from "../interfaces/response/subModels/BreadcrumbResponseInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ResponseBreadcrumb} from "../responses/ResponseBreadcrumb";
import {ComponentType} from "../enums/ComponentType";
import {FileFactory} from "./FileFactory";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";
import {AdventureV2Interface} from "../_dbV2/components/interfaces/AdventureV2Interface";
import {SessionV2Interface} from "../_dbV2/components/interfaces/SessionV2Interface";
import {ActV2Interface} from "../_dbV2/components/interfaces/ActV2Interface";
import {SceneV2Interface} from "../_dbV2/components/interfaces/SceneV2Interface";
import {BaseCampaignV2Interface} from "../_dbV2/components/interfaces/BaseCampaignV2Interface";

export class BreadcrumbFactory extends AbstractFactory implements BreadcrumbFactoryInterface {
	public create(
		record: ComponentV2Interface,
	): BreadcrumbResponseInterface {
		const response = this.generateElementBreadcrumb(null, ComponentType.Campaign, record.campaign);

		if (record.id.type !== ComponentType.Campaign){
			response.mainTitle = ComponentType[record.id.type];

			switch (record.id.type) {
				case ComponentType.Adventure:
					this.generateAventureBreadcrumb(response, record as AdventureV2Interface);
					break;
				case ComponentType.Session:
					this.generateSessionBreadcrumb(response, record as SessionV2Interface);
					break;
				case ComponentType.Act:
					this.generateActBreadcrumb(response, record as ActV2Interface);
					break;
				case ComponentType.Scene:
					this.generateSceneBreadcrumb(response, record as SceneV2Interface);
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
		type: ComponentType,
		data: ComponentV2Interface|BaseCampaignV2Interface,
		linkText: string|null = null,
		isNewLine = false,
	): ResponseBreadcrumb {
		const response = new ResponseBreadcrumb(this.app, <ComponentV2Interface>data);
		response.link = data.file.basename;
		response.title = ComponentType[type];

		if (linkText != null) response.linkText = linkText;
		if (isNewLine) response.isInNewLine = isNewLine;

		if (parent != null) parent.nextBreadcrumb = response;

		return response;
	}

	sceneCreator = function(
		scene: SceneV2Interface,
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
		adventure: AdventureV2Interface
	): ResponseBreadcrumb {
		const adventureBreadcrumb = this.generateElementBreadcrumb(parent, ComponentType.Adventure, adventure);

		let previousAdventure: AdventureV2Interface|undefined;
		let nextAdventure: AdventureV2Interface|undefined;
		try {
			previousAdventure = this.database.readSingle<AdventureV2Interface>(ComponentType.Adventure, adventure.id, (adventure.id.adventureId ?? 0) - 1);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}
		try {
			nextAdventure = this.database.readSingle<AdventureV2Interface>(ComponentType.Adventure, adventure.id, (adventure.id.adventureId ?? 0) + 1);
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
		session: SessionV2Interface
	): ResponseBreadcrumb {
		const sessionBreadcrumb = this.generateElementBreadcrumb(parent, ComponentType.Session, session);

		let previousSession: SessionV2Interface|undefined;
		let nextSession: SessionV2Interface|undefined;
		try {
			previousSession = this.database.readSingle<SessionV2Interface>(ComponentType.Session, session.id, (session.id.sessionId ?? 0) - 1);
		} catch (e) {
			//no need to trigger anything, previousAdventure can be null
		}
		try {
			nextSession = this.database.readSingle<SessionV2Interface>(ComponentType.Session, session.id, (session.id.sessionId ?? 0) + 1);
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
		act: ActV2Interface
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
		scene: SceneV2Interface
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
