import {AbstractModel} from "../abstracts/AbstractModel";
import {SessionData} from "../data/SessionData";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";

export class SessionNavigationModel extends AbstractModel {
	public async render() {
		this.synopsis();
		this.sessionNavigator();
	}

	private async sessionNavigator(
	) {
		const adventureId = this.api.getParentId(this.current.tags, this.api.settings.sessionTag);
		const sessionId = this.api.getId(this.current.tags, this.api.settings.sessionTag);

		const adventure = this.io.getAdventure(adventureId);
		const previousSession = this.io.getSession(adventureId, sessionId - 1);
		const nextSession = this.io.getSession(adventureId, sessionId + 1);

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
