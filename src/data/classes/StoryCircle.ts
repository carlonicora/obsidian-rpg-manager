import { StoryCircleInterface } from "../interfaces/StoryCircleInterface";

export class StoryCircle implements StoryCircleInterface {
	constructor(private _data: any | undefined) {}

	get you(): string | undefined {
		return this._data?.you;
	}

	get need(): string | undefined {
		return this._data?.need;
	}

	get go(): string | undefined {
		return this._data?.go;
	}

	get search(): string | undefined {
		return this._data?.search;
	}

	get find(): string | undefined {
		return this._data?.find;
	}

	get take(): string | undefined {
		return this._data?.take;
	}

	get return(): string | undefined {
		return this._data?.return;
	}

	get change(): string | undefined {
		return this._data?.change;
	}
}
