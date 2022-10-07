import {App} from "obsidian";
import {DatabaseUpdateWorkerInterface} from "./interfaces/DatabaseUpdateWorkerInterface";
import {V1_2_to_1_3_worker} from "./workers/V1_2_to_1_3_worker";
import {RpgManagerInterface} from "../../interfaces/RpgManagerInterface";
import {V1_3_to_2_0_worker} from "./workers/V1_3_to_2_0_worker";
import {V2_0_to_3_0_worker} from "./workers/V2_0_to_3_0_worker";

const VersionMap = {
	'1.2': V1_2_to_1_3_worker,
	'1.3': V1_3_to_2_0_worker,
	'2.0': V2_0_to_3_0_worker,
}

interface VersionHistoryElementInterface {
	previousVersion: string,
	nextVersion: string,
}

export class DatabaseUpdater {
	private versionsHistory: Map<string, VersionHistoryElementInterface>;

	constructor(
		private app: App,
		private rpgManager: RpgManagerInterface,
		private previousVersion: string,
		private currentVersion: string,
	) {
		this.versionsHistory = new Map<string, VersionHistoryElementInterface>();
		this.versionsHistory.set('1.2', {previousVersion: '1.2', nextVersion: '1.3'});
		this.versionsHistory.set('1.3', {previousVersion: '1.3', nextVersion: '2.0'});
		this.versionsHistory.set('2.0', {previousVersion: '2.0', nextVersion: '3.0'});
	}

	public get newVersion(): string {
		return this.currentVersion;
	}

	public get oldVersion(): string {
		return this.previousVersion;
	}

	public requiresDatabaseUpdate(
	): boolean {
		if (this.previousVersion === '') this.previousVersion = '1.2';

		const previousVersionMajorMinor: string|undefined = this.getMajorMinor(this.previousVersion);
		const currentVersionMajorMinor = this.getMajorMinor(this.currentVersion);

		if (
			previousVersionMajorMinor === undefined ||
			currentVersionMajorMinor === undefined ||
			previousVersionMajorMinor === currentVersionMajorMinor
		) return false;

		return this.versionsHistory.get(previousVersionMajorMinor) !== undefined;
	}

	public async update(
	): Promise<boolean> {
		let response = false;

		if (this.previousVersion === '') this.previousVersion = '1.2';

		const previousVersionMajorMinor: string|undefined = this.getMajorMinor(this.previousVersion);
		const currentVersionMajorMinor = this.getMajorMinor(this.currentVersion);

		if (
			previousVersionMajorMinor === undefined ||
			currentVersionMajorMinor === undefined ||
			previousVersionMajorMinor === currentVersionMajorMinor
		) return false;

		let updater = await this.versionsHistory.get(previousVersionMajorMinor);
		while (updater !== undefined){
			response = true;
			const worker: DatabaseUpdateWorkerInterface = await new VersionMap[updater.previousVersion as keyof typeof VersionMap](this.app);
			await worker.run();

			updater = await this.versionsHistory.get(updater.nextVersion);
		}

		await this.rpgManager.updateSettings({previousVersion: currentVersionMajorMinor});

		return response;
	}

	private getMajorMinor(
		version: string,
	): string|undefined {
		const versionParts = version.split('.');

		if (versionParts.length < 2) return undefined;

		return versionParts[0] + '.' + versionParts[1];
	}
}
