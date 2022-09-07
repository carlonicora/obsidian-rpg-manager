import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";
import {ResponseLine} from "../../../data/responses/ResponseLine";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {RpgOutlineDataInterface} from "../../../interfaces/data/RpgOutlineDataInterface";
import {RpgElementDataInterface} from "../../../interfaces/data/RpgElementDataInterface";

export class FactionModel extends AbstractModel {
	protected currentElement: RpgOutlineDataInterface|RpgElementDataInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		const status = new ResponseLine();
		status.content =ContentFactory.create(
			(this.currentElement.synopsis != null && this.currentElement.synopsis !== ''
				? this.currentElement.synopsis
				: '<span class="rpgm-missing">Synopsis missing</span>'),
			ContentType.Markdown,
		);
		response.addElement(status);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				this.app,
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Character,
					DataType.Faction,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'LocationTable' as SingleComponentKey<any>,
				this.app,
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
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
		this.image(200);
	}
	*/
}
