import {AbstractDataList} from "../../../abstracts/AbstractData";
import {SceneListInterface} from "../../../interfaces/data/SceneListInterface";
import {SceneDataInterface} from "../../../interfaces/data/SceneDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

export class SceneList extends AbstractDataList implements SceneListInterface {
	public elements: SceneDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}
}
