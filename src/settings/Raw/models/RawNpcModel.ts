import {NpcModel} from "../../Agnostic/models/NpcModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {CampaignSetting} from "../../../enums/CampaignSetting";

export class RawNpcModel extends NpcModel {
	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = super.generateData();

		if (this.sourceMeta?.raw?.character?.id != null) {
			const id: string = this.sourceMeta?.raw?.character?.id;
			const character = await this.callApi(id);
			this.sourceMeta.raw.character = character;
			this.sourceMeta.raw.character.id = id;
		}

		this.addCharacterRecordSheet(response);

		return response;
	}

	private async callApi(
		id: string,
	): Promise<any> {
			const data = await fetch('https://api.raw.dev.carlonicora.com/v1.0/characters/' + id, {
				method: 'GET',
				headers: {},
			});
			const response = await data.json();
			return response;
	}

	private async addCharacterRecordSheet(
		response: Promise<ResponseDataInterface>,
	): Promise<void> {
		response.then((response: ResponseDataInterface) => {
			response.addElement(
				this.app.plugins.getPlugin('rpg-manager').factories.components.create(
					CampaignSetting.Raw,
					'CharacterRecordSheet',
					this.currentElement,
					null,
					this.sourceMeta
				),
				2,
			);
		});
	}
}
