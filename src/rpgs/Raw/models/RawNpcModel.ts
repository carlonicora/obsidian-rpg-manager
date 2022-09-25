import {NpcModel} from "../../../models/NpcModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {RawCampaignInterface} from "../interfaces/RawCampaignInterface";
import {RawEndpoint} from "../enums/RawEndpoint";
import {RawApi} from "../helpers/RawApi";
import {RawCharacterRecordSheetComponent} from "../components/RawCharacterRecordSheetComponent";

export class RawNpcModel extends NpcModel {
	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = super.generateData();

		if (this.sourceMeta?.raw?.character?.id != null) {
			const id: string = this.sourceMeta?.raw?.character?.id;
			const apiCampaignKey = (<RawCampaignInterface>this.currentElement.campaign).apiCampaignKey;
			const character = await RawApi.get(apiCampaignKey, RawEndpoint.Characters, id);
			this.sourceMeta.raw.character = character;
			this.sourceMeta.raw.character.id = id;
		}

		this.addCharacterRecordSheet(response);

		return response;
	}

	private async addCharacterRecordSheet(
		response: Promise<ResponseDataInterface>,
	): Promise<void> {
		response.then((response: ResponseDataInterface) => {
			response.addComponent(
				RawCharacterRecordSheetComponent,
				this.currentElement,
				this.currentElement,
				undefined,
				this.sourceMeta,
				2
			)
		});
	}
}
