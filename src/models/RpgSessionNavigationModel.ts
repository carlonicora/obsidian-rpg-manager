import {AbstractModel} from "../abstracts/AbstractModel";
import {SessionData} from "../data/SessionData";
import {AdventureData} from "../data/AdventureData";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";

export class RpgSessionNavigationModel extends AbstractModel {
	public async render() {
		this.sessionNavigator();
	}

	private async sessionNavigator(
	) {
		const current = this.dv.current();

		if (
			current != undefined &&
			current.ids != undefined &&
			current.ids.session != undefined &&
			current.ids.adventure != undefined
		) {
			const adventures = this.dv.pages("#adventure")
				.where(adventure =>
					adventure.file.folder !== "Templates" &&
					adventure.ids.adventure != undefined &&
					adventure.ids.adventure == current.ids.adventure
				);
			const adventure = adventures != undefined && adventures.length === 1 ? adventures[0] : null;

			const previousSessions = this.dv.pages("#session")
				.where(session =>
					session.file.folder !== "Templates" &&
					session.ids.adventure != undefined &&
					session.ids.session != undefined &&
					session.ids.adventure === current.ids.adventure &&
					session.ids.session === current.ids.session - 1
				);
			const previousSession = previousSessions != undefined && previousSessions.length === 1 ? previousSessions[0] : null;

			const nextSessions = this.dv.pages("#session")
				.where(session =>
					session.file.folder !== "Templates" &&
					session.ids.adventure != undefined &&
					session.ids.session != undefined &&
					session.ids.adventure === current.ids.adventure &&
					session.ids.session === current.ids.session + 1
				);
			const nextSession = nextSessions != undefined && nextSessions.length === 1 ? nextSessions[0] : null;

			const data = new SessionData(
				this.functions,
				current,
				this.campaign,
				(adventure != undefined ? new AdventureData(this.functions, adventure) : null),
				(previousSession != undefined ? new SessionData(this.functions, previousSession) : null),
				(nextSession != undefined ? new SessionData(this.functions, nextSession) : null),

			)

			const view = RpgViewFactory.createSingle(viewType.SessionNavigator, this.dv);
			view.render(data);
		}
	}
}
