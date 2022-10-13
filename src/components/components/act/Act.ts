import {ActInterface} from "./interfaces/ActInterface";
import {ComponentStage} from "../../enums/ComponentStage";
import {AdventureInterface} from "../adventure/interfaces/AdventureInterface";
import {ComponentType} from "../../enums/ComponentType";
import {ActMetadataInterface} from "./interfaces/ActMetadataInterface";
import {AbstractActData} from "./abstracts/AbstractActData";
import {ComponentNotFoundError} from "../../../errors/ComponentNotFoundError";

export class Act extends AbstractActData implements ActInterface {
	protected metadata: ActMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;

	public validateHierarchy(
	): void {
		super.validateHierarchy();

		try {
			this.adventure.validateHierarchy();
		} catch (e) {
			throw new ComponentNotFoundError(this.app, this.id);
		}
	}

	public get adventure(): AdventureInterface {
		const response = this.database.readSingle<AdventureInterface>(ComponentType.Adventure, this.id);
		if (response === undefined) throw new Error('');

		return response;
	}

	public get nextAct(): ActInterface | null {
		return this._adjacentAct(true);
	}

	public get previousAct(): ActInterface | null {
		return this._adjacentAct(false);
	}

	private _adjacentAct(
		next: boolean,
	): ActInterface | null {
		const actId = this.id.actId;
		if (actId === undefined) return null;

		const response = this.database.read<ActInterface>((act: ActInterface) =>
			act.id.type === ComponentType.Act &&
			act.id.campaignId === this.id.campaignId &&
			act.id.actId === (next ? actId + 1 : actId -1)
		);

		return response[0] ?? null;
	}
}
