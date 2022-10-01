import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {SceneTableSubModel} from "../subModels/tables/SceneTableSubModel";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";
import {SessionHeaderSubModel} from "../subModels/headers/SessionHeaderSubModel";
import {SessionV2Interface} from "../../_dbV2/components/interfaces/SessionV2Interface";
import {SceneV2Interface} from "../../_dbV2/components/interfaces/SceneV2Interface";

export class SessionNavigationModel extends AbstractModel {
	protected currentElement: SessionV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const scenes = this.database.read<SceneV2Interface>(
			(scene: SceneV2Interface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === this.currentElement.campaign.id.campaignId &&
				scene.id.sessionId === this.currentElement.id.sessionId,
		).sort(this.factories.sorter.create<SceneV2Interface>([
			new SorterComparisonElement((scene: SceneV2Interface) => scene.id.adventureId),
			new SorterComparisonElement((scene: SceneV2Interface) => scene.id.actId),
			new SorterComparisonElement((scene: SceneV2Interface) => scene.id.sceneId),
		]));

		this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(SessionHeaderSubModel, this.currentElement, this.currentElement);

		await this.response.addSubModel(
			SceneTableSubModel,
			this.currentElement,
			scenes,
			undefined,
			{parentType: ComponentType.Session},
		);

		return this.response;
	}
}
