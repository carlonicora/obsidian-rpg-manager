import {GenericDataInterface} from "../interfaces/data/GenericDataInterface";
import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";

export abstract class AbstractDataList{
	public elements: GenericDataInterface[];

	constructor(
		public campaign: CampaignDataInterface|null,
	) {
	}

	public add(
		data: GenericDataInterface
	): void {
		this.elements.push(data);
	}

	public map(
		data: GenericDataInterface,
	): Map<string, any> {
		const response = new Map();
		const character: GenericDataInterface|undefined = this.elements.find(t=>t.link === data.link);

		if (character !== undefined) {
			Object.entries(character).forEach(([key, value]) => {
				response.set(key, value);
			});
		}

		return response;
	}
}
