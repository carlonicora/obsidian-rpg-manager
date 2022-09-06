import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ResponseLine} from "../../../data/responses/ResponseLine";
import {ClueDataInterface} from "../../../interfaces/data/ClueDataInterface";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {ClueInterface} from "../../../Data";

export class ClueModel extends AbstractModel {
	protected currentElement: ClueInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		const status = new ResponseLine();
		status.content =ContentFactory.create(
			((<ClueDataInterface>this.specificData).synopsis != null && (<ClueDataInterface>this.specificData).synopsis !== ''
				? (<ClueDataInterface>this.specificData).synopsis
				: '<span class="rpgm-missing">Synopsis missing</span>'),
			ContentType.Markdown,
		);
		response.addElement(status);

		response.addElement(
			ComponentFactory.create(
				//CampaignSetting[this.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				CampaignSetting[this.currentElement.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Character,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				//CampaignSetting[this.campaign.settings] + 'LocationTable' as SingleComponentKey<any>,
				CampaignSetting[this.currentElement.campaign.settings] + 'LocationTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Location,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				//CampaignSetting[this.campaign.settings] + 'EventTable' as SingleComponentKey<any>,
				CampaignSetting[this.currentElement.campaign.settings] + 'EventTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Event,
					DataType.Clue,
				),
			)
		);

		return response;
	}

	/*
	public async render() {
		this.status();
		this.image(450);
		this.synopsis();
	}
	*/
}
