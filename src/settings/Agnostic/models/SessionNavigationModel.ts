import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";

export class SessionNavigationModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();
		return response;
	}

	/*
	public async render() {
		this.synopsis();
		this.sessionNavigator();
	}

	private async sessionNavigator(
	) {
		const adventureId = this.api.getTagId(this.current.tags, DataType.Adventure);
		const sessionId = this.api.getTagId(this.current.tags, DataType.Session);

		const adventure = this.io.getAdventure(adventureId);
		const previousSession = this.io.getSession(null, sessionId - 1);
		const nextSession = this.io.getSession(null, sessionId + 1);

		const data = new SessionData(
			this.api,
			this.current,
			this.campaign,
			adventure,
			previousSession,
			nextSession,
		);

		const view = ViewFactory.createSingle(ViewType.SessionNavigator, this.dv);
		view.render(data);
	}
	*/
}
