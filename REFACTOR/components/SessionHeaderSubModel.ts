import {AbstractHeaderSubModel} from "../models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../responses/ResponseHeaderElement";
import {AbtStage} from "../../src/services/plotsServices/enums/AbtStage";
import {HeaderResponseType} from "../responses/enums/HeaderResponseType";
import {ResponseHeader} from "../responses/ResponseHeader";
import {HeaderResponseInterface} from "../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../src/core/enums/ComponentType";
import {ResponseType} from "../responses/enums/ResponseType";
import {SessionInterface} from "../../src/components/session/interfaces/SessionInterface";
import {RelationshipInterface} from "../../src/services/relationshipsService/interfaces/RelationshipInterface";
import {ModelInterface} from "../../src/api/modelsManager/interfaces/ModelInterface";
import {SceneInterface} from "../../src/components/scene/interfaces/SceneInterface";
import {SorterComparisonElement} from "../../src/services/sorterService/SorterComparisonElement";
import {AnalyserInterface} from "../services/analyser/interfaces/AnalyserInterface";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";

export class SessionHeaderSubModel extends AbstractHeaderSubModel {
	protected data: SessionInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship))
			return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null)
			response = new ResponseHeader(this.app, this.currentComponent);

		response.type = ComponentType.Session;
		response.responseType = ResponseType.SessionHeader;
		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Scenes', '', HeaderResponseType.ScenesSelection, {session: this.data}));

		if (this.settings.usePlotStructures)
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'ABT Stage', (this.data.abtStage !== undefined ? AbtStage[this.data.abtStage] : ''), HeaderResponseType.AbtSelector, {
				id: this.data.id,
				file: this.data.file,
			}));

		response.addElement(
			new ResponseHeaderElement(
				this.app,
				this.currentComponent,
				'SessionModel Date',
				this.api.service(DateService).getReadableDate(this.data.irl, this.data),
				HeaderResponseType.DateSelector
			)
		);
		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Target Duration', this.data.targetDuration, HeaderResponseType.DurationSelector));

		if (response.metadata === undefined)
			response.metadata = {};

		response.metadata.isSceneNoteListAvailable = this.data.isSceneNoteListAvailable;

		if (this.data.isSceneNoteListAvailable){
			response.metadata.scenes = this.database.read<ModelInterface>(
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
			const analyser: AnalyserInterface = this.factories.analyser.createSession(
				this.data,
				this.data.abtStage,
			);

			if (analyser.scenesCount > 0)
				response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'SceneModel Analyser', (this.data.abtStage !== undefined ? AbtStage[this.data.abtStage] : ''), HeaderResponseType.SceneAnalyser, {
					id: this.data.id,
					file: this.data.file,
					sceneAnalyser: analyser,
				}));

		}

		return this.completeData(response);
	}
}
