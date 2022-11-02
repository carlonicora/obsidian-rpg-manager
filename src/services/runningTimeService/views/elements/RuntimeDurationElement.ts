import {AbstractElement} from "../../../../managers/viewsManager/abstracts/AbstractElement";
import {RunElementDataInterface} from "./interfaces/RunElementDataInterface";
import {SceneInterface} from "../../../../components/scene/interfaces/SceneInterface";
import {DateService} from "../../../dateService/DateService";

export class RuntimeDurationElement extends AbstractElement {
	private _runningTime: HTMLSpanElement;
	private _model: SceneInterface;

	render(
		data: RunElementDataInterface,
		containerEl: HTMLElement
	) {

		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.model, data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});
		this._runningTime = contentEl.createSpan();

		this._runningTime.textContent = this.api.service(DateService).formatMinutesSeconds(data.values.runtime);

		if (data.values.scene.isCurrentlyRunning) {
			this._model = data.values.scene;

			setInterval(() => {
				this._runningTime.textContent = this._countOngoingDuration();
			}, 1000);
		}
	}

	private _countOngoingDuration(
	): string {
		let duration: number = this._model.currentDuration ?? 0;

		if (this._model.lastStart !== undefined && this._model.lastStart !== 0)
			duration += (Math.floor(Date.now()/1000) - this._model.lastStart);

		return this.api.service(DateService).formatMinutesSeconds(duration);
	}
}
