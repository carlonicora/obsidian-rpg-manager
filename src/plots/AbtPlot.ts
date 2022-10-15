import {AbtInterface} from "./interfaces/AbtInterface";
import {AbtPlotMetadataInterface} from "./interfaces/AbtPlotMetadataInterface";

export class AbtPlot implements AbtInterface {
	constructor(
		private _metadata: AbtPlotMetadataInterface
	) {
	}

	get and(): string {
		return this._metadata.plot?.abt?.and ?? '';
	}

	get but(): string {
		return this._metadata.plot?.abt?.but ?? '';
	}

	get isEmpty(): boolean {
		return this.need === '' &&
			this.and === '' &&
			this.but === '' &&
			this.therefore === '';


	}

	get need(): string {
		return this._metadata.plot?.abt?.need ?? '';
	}

	get therefore(): string {
		return this._metadata.plot?.abt?.therefore ?? '';
	}

}
