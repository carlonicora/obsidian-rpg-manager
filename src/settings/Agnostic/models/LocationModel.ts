import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";
import {LocationInterface} from "../../../interfaces/data/LocationInterface";

export class LocationModel extends AbstractModel {
	protected currentElement: LocationInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'Header' as SingleComponentKey<any>,
				this.currentElement
			)
		);

		/*
		if (this.currentElement.address != null && this.currentElement.address !== '') {
			const status = new ResponseLine(this.app);
			status.content = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(
				'## ' + this.currentElement.address,
				ContentType.Markdown,
			);
			response.addElement(status);
		}

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'Image' as SingleComponentKey<any>,
				this.currentElement,
			)
		);
		*/

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Character,
					DataType.Faction,
				),
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'EventTable' as SingleComponentKey<any>,
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Event,
					DataType.Location,
				),
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'ClueTable' as SingleComponentKey<any>,
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Clue,
					DataType.Location,
				),
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'LocationTable' as SingleComponentKey<any>,
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Location,
				),
				'Contained locations',
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'LocationTable' as SingleComponentKey<any>,
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Location,
					DataType.Location,
				),
				'Part of locations',
			)
		);

		return response;
	}
}
