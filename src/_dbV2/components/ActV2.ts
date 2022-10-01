import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {ActV2Interface} from "./interfaces/ActV2Interface";
import {ComponentStage} from "./enums/ComponentStage";
import {AbtStage} from "../../enums/AbtStage";
import {AbtPlot} from "../../_plots/AbtPlot";
import {AdventureV2Interface} from "./interfaces/AdventureV2Interface";
import {AbtPlotInterface} from "../../_plots/interfaces/AbtPlotInterface";
import {ComponentType} from "../../enums/ComponentType";

export class ActV2 extends AbstractComponentV2 implements ActV2Interface {
	public stage: ComponentStage = ComponentStage.Plot;

	public get adventure(): AdventureV2Interface {
		const response = this.databaseV2.readSingle<AdventureV2Interface>(ComponentType.Adventure, this.id);
		if (response === undefined) throw new Error('');

		return response;
	}

	public get nextAct(): ActV2Interface | null {
		return this._adjacentAct(true);
	}

	public get previousAct(): ActV2Interface | null {
		return this._adjacentAct(false);
	}

	get abtPlot(): AbtPlotInterface {
		return new AbtPlot(this.metadata.abt);
	}

	public get abtStage(): AbtStage | undefined {
		return (this.metadata.abtStage);
	}

	private _adjacentAct(
		next: boolean,
	): ActV2Interface | null {
		const actId = this.id.actId;
		if (actId === undefined) return null;

		const response = this.databaseV2.read<ActV2Interface>((act: ActV2Interface) =>
			act.id.type === ComponentType.Act &&
			act.id.campaignId === this.id.campaignId &&
			act.id.actId === (next ? actId + 1 : actId -1)
		);

		return response[0] ?? null;
	}
}
