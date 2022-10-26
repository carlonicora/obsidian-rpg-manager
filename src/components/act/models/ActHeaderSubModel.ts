import {AbstractHeaderSubModel} from "../../../../REFACTOR/models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../../REFACTOR/responses/interfaces/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../../../../REFACTOR/responses/ResponseHeaderElement";
import {AbtStage} from "../../../services/plotsServices/enums/AbtStage";
import {HeaderResponseType} from "../../../../REFACTOR/responses/enums/HeaderResponseType";
import {ResponseHeader} from "../../../../REFACTOR/responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../../REFACTOR/responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ResponseType} from "../../../../REFACTOR/responses/enums/ResponseType";
import {ActInterface} from "../interfaces/ActInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {AnalyserInterface} from "../../../../REFACTOR/services/analyser/interfaces/AnalyserInterface";

export class ActHeaderSubModel extends AbstractHeaderSubModel {
	protected data: ActInterface;

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

		response.type = ComponentType.Act;
		response.responseType = ResponseType.ActHeader;

		if (this.settings.usePlotStructures) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'ABT Stage', (this.data.abtStage !== undefined ? AbtStage[this.data.abtStage] : ''), HeaderResponseType.AbtSelector, {
				id: this.data.id,
				file: this.data.file,
			}));
		}

		if (this.settings.useSceneAnalyser) {
			const analyser: AnalyserInterface = this.factories.analyser.createAct(
				this.data,
				this.data.abtStage,
			);

			if (analyser.scenesCount > 0) {
				response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'SceneModel Analyser', (this.data.abtStage !== undefined ? AbtStage[this.data.abtStage] : ''), HeaderResponseType.SceneAnalyser, {
					id: this.data.id,
					file: this.data.file,
					sceneAnalyser: analyser,
				}));
			}
		}

		response.metadata = {actId: this.data.id, sourceMeta: additionalInformation};
		return this.completeData(response);
	}
}
