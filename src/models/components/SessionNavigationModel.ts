import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../responses/interfaces/ResponseDataInterface";
import {ComponentType} from "../../databases/enums/ComponentType";
import {SceneTableSubModel} from "../subModels/tables/SceneTableSubModel";
import {SorterComparisonElement} from "../../databases/SorterComparisonElement";
import {SessionHeaderSubModel} from "../subModels/headers/SessionHeaderSubModel";
import {SessionInterface} from "../../databases/components/interfaces/SessionInterface";
import {SceneInterface} from "../../databases/components/interfaces/SceneInterface";

export class SessionNavigationModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const scenes = this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === this.currentElement.campaign.id.campaignId &&
				scene.id.sessionId === this.currentElement.id.sessionId,
		).sort(this.factories.sorter.create<SceneInterface>([
			new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
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
