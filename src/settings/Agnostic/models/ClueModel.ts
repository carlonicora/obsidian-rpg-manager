import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {DataType} from "../../../enums/DataType";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ClueInterface} from "../../../interfaces/data/ClueInterface";

export class ClueModel extends AbstractModel {
	protected currentElement: ClueInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'Header',
				this.currentElement
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'CharacterTable',
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Character,
				),
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'LocationTable',
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Location,
				),
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'EventTable',
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Event,
					DataType.Clue,
				),
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
