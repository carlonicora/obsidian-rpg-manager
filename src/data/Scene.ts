import {AbstractRpgOutlineData} from "../abstracts/AbstractRpgOutlineData";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";

export class Scene extends AbstractRpgOutlineData implements SceneInterface {
	public sceneId: number;
	public action: string | null;
	public startTime: Date | null;
	public endTime: Date | null;

	public adventure: AdventureInterface;
	public session: SessionInterface;
	public previousScene: SceneInterface | null = null;
	public nextScene: SceneInterface | null = null;

	protected async loadData(
	): Promise<void> {
		this.sceneId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(this.type, this.tag);
		this.startTime = this.initialiseDate(this.frontmatter?.time?.start);
		this.endTime = this.initialiseDate(this.frontmatter?.time?.end);
		this.action = this.frontmatter?.action;

		super.loadData();
	}

	public loadHierarchy(
		dataList: RpgDataListInterface,
	) {
		super.loadHierarchy(dataList);

		this.adventure = this.loadAdventure(this.campaign.campaignId);
		this.session = this.loadSession(this.campaign.campaignId, this.adventure.adventureId);
		this.previousScene = this.app.plugins.getPlugin('rpg-manager').io.getScene(this.campaign.campaignId, this.adventure.adventureId, this.session.sessionId, this.sceneId - 1);
		this.nextScene = this.app.plugins.getPlugin('rpg-manager').io.getScene(this.campaign.campaignId, this.adventure.adventureId, this.session.sessionId, this.sceneId + 1);

		if (this.nextScene != null) this.nextScene.previousScene = this;
		if (this.previousScene != null) this.previousScene.nextScene = this;
	}

	public get duration(): string {
		let response = '';

		if (this.startTime && this.endTime) {
			const duration = this.endTime.getTime() - this.startTime.getTime();
			const hours = Math.floor(duration / (1000 * 60 * 60));
			const minutes = Math.floor(duration / (1000 * 60)) % 60;

			response = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
		}

		return response;
	}
}
