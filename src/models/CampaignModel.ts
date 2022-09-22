import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {RecordType} from "../enums/RecordType";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.addList(
			RecordType.Adventure,
			this.database.readList<AdventureInterface>(RecordType.Adventure, this.currentElement.id)
				.sort(function (leftData: AdventureInterface, rightData: AdventureInterface) {
					if (leftData.adventureId > rightData.adventureId) return -1;
					if (leftData.adventureId < rightData.adventureId) return 1;
					return 0;
				}),
		);

		await this.addList(
			RecordType.Act,
			this.database.readList<ActInterface>(RecordType.Act, this.currentElement.id)
				.sort(function (leftData: ActInterface, rightData: ActInterface) {
					if (leftData.actId > rightData.actId) return -1;
					if (leftData.actId < rightData.actId) return 1;
					return 0;
				}),
		);

		await this.addList(
			RecordType.Character,
			this.database.readList<CharacterInterface>(RecordType.Character | RecordType.NonPlayerCharacter, this.currentElement.id)
				.sort(function (leftData: CharacterInterface, rightData: CharacterInterface) {
					if (leftData.name > rightData.name) return 1;
					if (leftData.name < rightData.name) return -1;
					return 0;
				}),
		);


		return this.response;
	}
}
