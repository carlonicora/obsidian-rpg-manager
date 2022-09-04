import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";

export class NpcModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'CharacterSynopsis' as SingleComponentKey<any>,
				this.io,
				this.specificData,
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'FactionTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Faction,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Character,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'EventTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Event,
					DataType.Character,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'ClueTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Clue,
					DataType.Character,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'LocationTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Location,
				),
			)
		);

		return response;
	}

	/*
	public async render() {
		this.synopsis();
		this.image(300,300);
		this.info();
	}

	async info(){
		const current = this.dv.current();
		if (current !== undefined) {

			const data = new CharacterData(
				this.api,
				current,
				this.campaign,
			)

			const view = ViewFactory.createSingle(ViewType.CharacterInfo, this.dv);
			view.render(data);
		}
	}

	 */
}
