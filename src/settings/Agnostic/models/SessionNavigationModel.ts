import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {SessionInterface} from "../../../interfaces/data/SessionInterface";

export class SessionNavigationModel extends AbstractModel {
	protected currentElement: SessionInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'Header',
				this.currentElement
			)
		);

		if (this.sourceMeta?.abt != null){
			response.addElement(
				this.app.plugins.getPlugin('rpg-manager').factories.components.create(
					this.currentElement.campaign.settings,
					'AbtPlot',
					this.currentElement,
					null,
					this.sourceMeta.abt,
				)
			);
		}

		if (this.sourceMeta?.storycircle != null){
			response.addElement(
				this.app.plugins.getPlugin('rpg-manager').factories.components.create(
					this.currentElement.campaign.settings,
					'StoryCirclePlot',
					this.currentElement,
					null,
					this.sourceMeta.storycircle,
				)
			);
		}

		return response;
	}
}
