import {SectionCache} from "obsidian";
import {DatabaseUpdateWorkerInterface} from "./interfaces/DatabaseUpdateWorkerInterface";
import {DatabaseUpdaterReporterInterface} from "./interfaces/DatabaseUpdaterReporterInterface";
import {V3_0_to_3_1_worker} from "./workers/V3_0_to_3_1_worker";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {V3_1_to_3_4_worker} from "./workers/V3_1_to_3_4_worker";

const versionMap = {
	30: V3_0_to_3_1_worker,
	33: V3_1_to_3_4_worker,
};

export class DatabaseUpdater {
	private _updaters: DatabaseUpdateWorkerInterface[];

	constructor(
		private _api: RpgManagerApiInterface,
		private _previousVersion: string,
		private _currentVersion: string,
	) {
		this._updaters = [];
	}

	public get newVersion(): string {
		return this._currentVersion;
	}

	public get oldVersion(): string {
		return this._previousVersion;
	}

	private _loadUpdaters(
	): void {
		if (this._previousVersion === '')
			this._previousVersion = '3.0';

		const previousVersionMajorMinor: string|undefined = this._getMajorMinor(this._previousVersion);
		const currentVersionMajorMinor = this._getMajorMinor(this._currentVersion);

		if (
			previousVersionMajorMinor === undefined ||
			currentVersionMajorMinor === undefined ||
			previousVersionMajorMinor === currentVersionMajorMinor
		) return;

		let currentVersion: number = +previousVersionMajorMinor*10;
		const maxVersion: number = +currentVersionMajorMinor*10;

		while (currentVersion < maxVersion){
			const updaterInterface = versionMap[currentVersion as keyof typeof versionMap];
			if (updaterInterface !== undefined)
				this._updaters.push(new updaterInterface(this._api));

			currentVersion++;
		}
	}

	public async requiresDatabaseUpdate(
	): Promise<boolean> {
		await this._loadUpdaters();

		if (await this._isVaultEmptyOfRpgManagerComponents()) {
			const currentVersionMajorMinor = this._getMajorMinor(this._currentVersion);
			await this._api.plugin.updateSettings({previousVersion: currentVersionMajorMinor});
			this._updaters = [];
			return false;
		}

		return this._updaters.length !== 0;
	}

	public async update(
		reporter: DatabaseUpdaterReporterInterface|undefined=undefined,
	): Promise<boolean> {
		let response = false;

		if (this._updaters.length > 0) {
			response = true;

			let worker: DatabaseUpdateWorkerInterface|undefined;

			for (let index = 0; index < this._updaters.length; index++) {
				worker = this._updaters[index];

				if (worker !== undefined) {
					if (reporter !== undefined)
						reporter.setUpdater(worker.from, worker.to);

					await worker.run(reporter);
				}
			}

			if (worker !== undefined)
				await this._api.plugin.updateSettings({previousVersion: worker.to});

		}



		return response;
	}

	private async _isVaultEmptyOfRpgManagerComponents(
	): Promise<boolean> {
		const everyMarkdown = this._api.app.vault.getMarkdownFiles();

		for (let index=0; index<everyMarkdown.length; index++){
			const cache = this._api.app.metadataCache.getFileCache(everyMarkdown[index]);
			if (cache === undefined || cache?.sections == undefined) continue;

			const validSections = cache.sections.filter((section: SectionCache) => section.type === 'code');
			for (let sectionIndex=0; sectionIndex<validSections.length; sectionIndex++) {
				const fileContent = await this._api.app.vault.read(everyMarkdown[index]);
				const fileArray = fileContent.split('\n');
				if (fileArray[validSections[sectionIndex].position.start.line].startsWith('```RpgManager')) return false;
			}
		}

		return true;
	}

	private _getMajorMinor(
		version: string,
	): string|undefined {
		const versionParts = version.split('.');

		if (versionParts.length < 2)
			return undefined;

		return versionParts[0] + '.' + versionParts[1];
	}
}
