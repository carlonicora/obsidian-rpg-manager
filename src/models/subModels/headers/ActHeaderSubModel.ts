import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../../../responses/ResponseHeaderElement";
import {AbtStage} from "../../../enums/AbtStage";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseType} from "../../../enums/ResponseType";
import {SceneAnalyser} from "../../../helpers/SceneAnalyser";
import {ActInterface} from "../../../database/components/interfaces/ActInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";

export class ActHeaderSubModel extends AbstractHeaderSubModel {
	protected data: ActInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentElement);

		response.type = ComponentType.Act;
		response.responseType = ResponseType.ActHeader;

		if (this.settings.usePlotStructures && this.data.abtStage !== undefined) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'ABT Stage', (this.data.abtStage !== undefined ? AbtStage[this.data.abtStage] : ''), HeaderResponseType.AbtSelector, {
				id: this.data.id,
				file: this.data.file,
			}));
		}

		if (this.settings.useSceneAnalyser) {
			const analyser = new SceneAnalyser(
				this.app,
				this.data.abtStage,
				this.data.id
			);

			if (analyser.scenesCount > 0) {
				response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Scene Analyser', (this.data.abtStage !== undefined ? AbtStage[this.data.abtStage] : ''), HeaderResponseType.SceneAnalyser, {
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
