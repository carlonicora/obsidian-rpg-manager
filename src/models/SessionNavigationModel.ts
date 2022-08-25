import {AbstractModel} from "../abstracts/AbstractModel";
import {SessionData} from "../data/SessionData";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";
import {DataType} from "../io/IoData";

export class SessionNavigationModel extends AbstractModel {
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

		const view = RpgViewFactory.createSingle(viewType.SessionNavigator, this.dv);
		view.render(data);
	}
}
