import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";
import {CharacterInterface, RpgData} from "../../../Data";

export class PcModel extends AbstractModel {
	protected currentElement: CharacterInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'CharacterSynopsis' as SingleComponentKey<any>,
				this.currentElement,
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'FactionTable' as SingleComponentKey<any>,
				RpgData.index.getRelationshipList(
					this.currentElement,
					DataType.Faction,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				RpgData.index.getRelationshipList(
					this.currentElement,
					DataType.Character,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'LocationTable' as SingleComponentKey<any>,
				RpgData.index.getRelationshipList(
					this.currentElement,
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
		this.factionList();
		this.characterList();
		this.locationList();
	}
	 */
}
