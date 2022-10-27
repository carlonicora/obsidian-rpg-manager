import {SectionCache} from "obsidian";
import {DatabaseUpdateWorkerInterface} from "./interfaces/DatabaseUpdateWorkerInterface";
import {V1_2_to_1_3_worker} from "./workers/V1_2_to_1_3_worker";
import {V1_3_to_2_0_worker} from "./workers/V1_3_to_2_0_worker";
import {V2_0_to_3_0_worker} from "./workers/V2_0_to_3_0_worker";
import {DatabaseUpdaterReporterInterface} from "./interfaces/DatabaseUpdaterReporterInterface";
import {V3_0_to_3_1_worker} from "./workers/V3_0_to_3_1_worker";
import {RpgManagerApiInterface} from "../api/interfaces/RpgManagerApiInterface";

const versionMap = {
	'1.2': V1_2_to_1_3_worker,
	'1.3': V1_3_to_2_0_worker,
	'2.0': V2_0_to_3_0_worker,
	'3.0': V3_0_to_3_1_worker,
};

interface VersionHistoryElementInterface {
	previousVersion: string,
	nextVersion: string,
}

export class DatabaseUpdater {
	private _versionsHistory: Map<string, VersionHistoryElementInterface>;

	constructor(
		private _api: RpgManagerApiInterface,
		private _previousVersion: string,
		private _currentVersion: string,
	) {
		this._versionsHistory = new Map<string, VersionHistoryElementInterface>();
		this._versionsHistory.set('1.2', {previousVersion: '1.2', nextVersion: '1.3'});
		this._versionsHistory.set('1.3', {previousVersion: '1.3', nextVersion: '2.0'});
		this._versionsHistory.set('2.0', {previousVersion: '2.0', nextVersion: '3.0'});
		this._versionsHistory.set('3.0', {previousVersion: '3.0', nextVersion: '3.1'});
		this._versionsHistory.set('3.1', {previousVersion: '3.1', nextVersion: '3.2'});
	}

	public get newVersion(): string {
		return this._currentVersion;
	}

	public get oldVersion(): string {
		return this._previousVersion;
	}

	public async requiresDatabaseUpdate(
	): Promise<boolean> {
		if (this._previousVersion === '') this._previousVersion = '1.2';

		const previousVersionMajorMinor: string|undefined = this._getMajorMinor(this._previousVersion);
		const currentVersionMajorMinor = this._getMajorMinor(this._currentVersion);

		if (
			previousVersionMajorMinor === undefined ||
			currentVersionMajorMinor === undefined ||
			previousVersionMajorMinor === currentVersionMajorMinor
		) return false;

		if (await this._isVaultEmptyOfRpgManagerComponents()) {
			const currentVersionMajorMinor = this._getMajorMinor(this._currentVersion);
			await this._api.plugin.updateSettings({previousVersion: currentVersionMajorMinor});
			return false;
		}

		if (this._versionsHistory.get(previousVersionMajorMinor) === undefined)
			return false;

		return versionMap[previousVersionMajorMinor as keyof typeof versionMap] !== undefined;
	}

	public async update(
		reporter: DatabaseUpdaterReporterInterface|undefined=undefined,
	): Promise<boolean> {
		let response = false;

		if (this._previousVersion === '') this._previousVersion = '1.2';

		const previousVersionMajorMinor: string|undefined = this._getMajorMinor(this._previousVersion);
		const currentVersionMajorMinor = this._getMajorMinor(this._currentVersion);

		if (
			previousVersionMajorMinor === undefined ||
			currentVersionMajorMinor === undefined ||
			previousVersionMajorMinor === currentVersionMajorMinor
		) return false;

		const empty = await this._isVaultEmptyOfRpgManagerComponents();

		let updater = await this._versionsHistory.get(previousVersionMajorMinor);
		while (updater !== undefined){
			response = true;
			if (!empty) {
				const worker: DatabaseUpdateWorkerInterface = await new versionMap[updater.previousVersion as keyof typeof versionMap](this._api);
				if (reporter !== undefined) reporter.setUpdater(this._previousVersion, this._currentVersion);
				await worker.run(reporter);
			}

			updater = await this._versionsHistory.get(updater.nextVersion);
		}

		await this._api.plugin.updateSettings({previousVersion: currentVersionMajorMinor});

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

		if (versionParts.length < 2) return undefined;

		return versionParts[0] + '.' + versionParts[1];
	}
}
