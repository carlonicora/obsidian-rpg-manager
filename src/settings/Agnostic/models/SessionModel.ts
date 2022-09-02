import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {RpgFunctions} from "../../../RpgFunctions";
import {DataType} from "../../../enums/DataType";

export class SessionModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'SceneTable' as SingleComponentKey<any>,
				this.io,
				this.io.getSceneList(
					RpgFunctions.getTagId(this.current.tags, DataType.Adventure),
					RpgFunctions.getTagId(this.current.tags, DataType.Session),
				),
			)
		);

		return response;
	}
}
