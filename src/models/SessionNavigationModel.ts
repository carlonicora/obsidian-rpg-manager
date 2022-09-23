import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {RecordType} from "../enums/RecordType";
import {SceneTableComponent} from "../components/SceneTableComponent";
import {SorterComparisonElement} from "../database/SorterComparisonElement";

export class SessionNavigationModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const scenes = this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === RecordType.Scene &&
				scene.id.campaignId === this.currentElement.campaign.campaignId &&
				scene.sessionId === this.currentElement.id.sessionId,
		).sort(
			this.factories.sorter.create<SceneInterface>([
				new SorterComparisonElement((scene: SceneInterface) => scene.sceneId)
			]));

		this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent, this.currentElement);

		await this.response.addComponent(
			SceneTableComponent,
			scenes,
			undefined,
			{parentType: RecordType.Session},
		);

		return this.response;
	}
}
