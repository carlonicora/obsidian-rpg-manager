import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";
import {ResponseLine} from "../../../data/responses/ResponseLine";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {LocationDataInterface} from "../../../interfaces/data/LocationDataInterface";

export class LocationModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		if ((<LocationDataInterface>this.specificData).address != null && (<LocationDataInterface>this.specificData).address !== '') {
			const status = new ResponseLine();
			status.content = ContentFactory.create(
				'## ' + (<LocationDataInterface>this.specificData).address,
				ContentType.Markdown,
			);
			response.addElement(status);
		}

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Character,
					DataType.Faction,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'EventTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Event,
					DataType.Location,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'ClueTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Clue,
					DataType.Location,
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
				'Contained locations',
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'LocationTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
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
		this.synopsis(this.dv.current()?.address ? this.dv.current()?.address : null);
		this.image(450);
	}
	 */
}
