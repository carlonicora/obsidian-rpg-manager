import {RawEndpoint} from "../enums/RawEndpoint";

export class RawApi {
	public static async get(
		apiCampaignKey: string|null,
		parentEndpoint: RawEndpoint,
		parentId: string|null=null,
		childEndpoint: RawEndpoint|null=null,
		childId: string|null=null,
	): Promise<any> {
		const server = 'https://api.raw.dev.carlonicora.com/v1.0';
		let endpoint = '/' + RawEndpoint[parentEndpoint];
		if (parentId != null) {
			endpoint += '/' + parentId;
			if (childEndpoint != null) {
				endpoint += '/' + RawEndpoint[childEndpoint];
				if (childId != null) endpoint += '/' + childId;
			}
		}

		const data = await fetch(server + endpoint, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + (apiCampaignKey ?? ''),
			},
		});
		const response = await data.json();
		return response;
	}
}
