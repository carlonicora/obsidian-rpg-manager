import {AbstractHeaderView} from "../../../abstracts/AbstractHeaderView";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {CampaignInterface} from "../../../interfaces/components/CampaignInterface";
import {ViewType} from "../../../enums/ViewType";

export class CampaignHeaderView extends AbstractHeaderView {
	protected currentElement: CampaignInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

		if (this.currentElement.currentDate !== undefined) {
			this.headerTitleEl.createEl('a', {cls: 'subtitle', text: 'View Campaign Timeline', href: '#'})
				.addEventListener("click", () => {
					this.factories.views.showObsidianView(ViewType.Timeline, [data.metadata.campaignId]);
				});
		}
	}
}
