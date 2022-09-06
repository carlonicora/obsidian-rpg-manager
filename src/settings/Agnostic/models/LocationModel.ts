import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";
import {ResponseLine} from "../../../data/responses/ResponseLine";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {LocationInterface, RpgData} from "../../../Data";

export class LocationModel extends AbstractModel {
	protected currentElement: LocationInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		if (this.currentElement.address != null && this.currentElement.address !== '') {
			const status = new ResponseLine();
			status.content = ContentFactory.create(
				'## ' + this.currentElement.address,
				ContentType.Markdown,
			);
			response.addElement(status);
		}

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				RpgData.index.getRelationshipList(
					this.currentElement,
					DataType.Character,
					DataType.Faction,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'EventTable' as SingleComponentKey<any>,
				RpgData.index.getRelationshipList(
					this.currentElement,
					DataType.Event,
					DataType.Location,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'ClueTable' as SingleComponentKey<any>,
				RpgData.index.getRelationshipList(
					this.currentElement,
					DataType.Clue,
					DataType.Location,
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
				'Contained locations',
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'LocationTable' as SingleComponentKey<any>,
				RpgData.index.getRelationshipList(
					this.currentElement,
					DataType.Location,
					DataType.Location,
				),
				'Part of locations',
			)
		);

		return response;
	}

	/*
	public async render() {
		this.image(450);
	}
	 */
}
