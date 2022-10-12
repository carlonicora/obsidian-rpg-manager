import {AbstractHeaderSubModel} from "../../../../models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../../../../responses/ResponseHeaderElement";
import {AbtStage} from "../../../../plots/enums/AbtStage";
import {HeaderResponseType} from "../../../../responses/enums/HeaderResponseType";
import {ResponseHeader} from "../../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseType} from "../../../../responses/enums/ResponseType";
import {SceneAnalyser} from "../../../../analyser/SceneAnalyser";
import {SessionInterface} from "../interfaces/SessionInterface";
import {RelationshipInterface} from "../../../../relationships/interfaces/RelationshipInterface";
import {ComponentInterface} from "../../../interfaces/ComponentInterface";
import {SceneInterface} from "../../scene/interfaces/SceneInterface";
import {SorterComparisonElement} from "../../../../databases/SorterComparisonElement";

export class SessionHeaderSubModel extends AbstractHeaderSubModel {
	protected data: SessionInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentComponent);

		response.type = ComponentType.Session;
		response.responseType = ResponseType.SessionHeader;

		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Scenes', '', HeaderResponseType.ScenesSelection, {session: this.data}));

		if (this.settings.usePlotStructures) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'ABT Stage', (this.data.abtStage !== undefined ? AbtStage[this.data.abtStage] : ''), HeaderResponseType.AbtSelector, {
				id: this.data.id,
				file: this.data.file,
			}));
		}

		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Session Date', this.data.irl, HeaderResponseType.DateSelector));
		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Target Duration', this.data.targetDuration, HeaderResponseType.DurationSelector));

		if (response.metadata === undefined) response.metadata = {};
		response.metadata.isSceneNoteListAvailable = this.data.isSceneNoteListAvailable;

		if (this.data.isSceneNoteListAvailable){
			response.metadata.scenes = this.database.read<ComponentInterface>(
				(scene: SceneInterface) =>
					scene.id.type === ComponentType.Scene &&
					scene.id.campaignId === this.currentComponent.campaign.id.campaignId &&
					scene.session?.id.sessionId === this.data.id.sessionId,
			).sort(this.factories.sorter.create<SceneInterface>([
				new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
			]));
		}

		if (this.settings.useSceneAnalyser){
			const analyser = new SceneAnalyser(
				this.app,
				this.data.abtStage,
				this.data.id
			);

			if (analyser.scenesCount > 0) {
				response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Scene Analyser', (this.data.abtStage !== undefined ? AbtStage[this.data.abtStage] : ''), HeaderResponseType.SceneAnalyser, {
					id: this.data.id,
					file: this.data.file,
					sceneAnalyser: analyser,
				}));
			}
		}

		return this.completeData(response);
	}
}
