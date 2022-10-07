import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {App, Component, MarkdownRenderer} from "obsidian";
import {DatabaseUpdater} from "../databases/updaters/DatabaseUpdater";
import {DatabaseUpdaterReporterInterface} from "../databases/updaters/interfaces/DatabaseUpdaterReporterInterface";

export class UpdaterModal extends AbstractRpgManagerModal implements DatabaseUpdaterReporterInterface {
	private infoEl: HTMLDivElement;

	private versionEl: HTMLDivElement;
	private countEl: HTMLSpanElement;
	private currentEl: HTMLSpanElement;
	private currentCounter = 0;

	constructor(
		app: App,
		private updater: DatabaseUpdater,
	) {
		super(app);
	}

	public onOpen() {
		super.onOpen();

		this.contentEl.createEl('h2', {text: 'RPG Manager Needs to update the data structure'});
		this.infoEl = this.contentEl.createDiv();

		const infoMessage = 'RPG Manager has been updated to version **' + this.updater.newVersion + '**, ' +
			'that requires some updates to the structure of your notes.\n\n' +
			'The process is automatic and has been tested, but there is always the possibility for some of your ' +
			'customisations to have escaped what is believed to be the normal structure of the data.\n\n' +
			'**To avoid any data loss, the update is not automatic, therefore RPG Manager is currently disabled.**\n\n' +
			'It is highly recommended you **create a backup copy of your vault** before you run the updater. ' +
			'Once you have performed a backup of your vault, you can update your data with the button below.\n\n' +
			'In case of any trouble during the update process, you can ' +
			'[ask for support](https://github.com/carlonicora/obsidian-rpg-manager) directly on RPG Manager GitHub' +
			'page.\n\n' +
			'If you have backed up your data (*or if you feel like a curious Kender and prefer to live on the edge*) ' +
			'you can run the data update clicking the button below!';

		const waitMessage = '**Updating your data in progress**.\n\nPlease be patient...';

		const successMessage = 'The data structure of your notes has been updated to the latest version of RPG Manager\n\n' +
			'You can now use the plugin once more. Please don\'t forget to read the ' +
			'[release notes](https://github.com/carlonicora/obsidian-rpg-manager/blob/master/ChangeLog.md) to know ' +
			'what\'s new in RPG Manager.\n\n' +
			'*...oh, and if you like to support or collaborate with us, your help wil be highly appreciated.*';

		this._updateModalDescription(infoMessage);

		const updateButtonEl = this.contentEl.createEl('button', {text: 'Update the data to v' + this.updater.newVersion + ' or RPG Manager'});
		updateButtonEl.addEventListener('click', () => {
			this._updateModalDescription(waitMessage, true);
			updateButtonEl.remove();

			this.updater.update(this)
				.then(() => {
					this.app.plugins.getPlugin('rpg-manager').initialise();
					this._updateModalDescription(successMessage);
					updateButtonEl.remove();
				});
		});
	}

	private async _updateModalDescription(
		content: string,
		addCounters: boolean|undefined = undefined,
	): Promise<void> {
		this.infoEl.empty();
		MarkdownRenderer.renderMarkdown(
			content,
			this.infoEl,
			'',
			null as unknown as Component,
		);

		if (addCounters) {
			const updaterInfoContainerEl = this.infoEl.createDiv();
			this.versionEl = updaterInfoContainerEl.createDiv({text: 'Updating'});
			const countersContainerEl = updaterInfoContainerEl.createDiv();
			this.currentEl = countersContainerEl.createSpan({text: '0'});
			countersContainerEl.createSpan({text: ' out of '});
			this.countEl = countersContainerEl.createSpan({text: '0'});
			countersContainerEl.createSpan({text: ' components updated'});
			this.currentCounter = 0;
		}
	}

	public onClose() {
		const {contentEl} = this;
		contentEl.empty();

		super.onClose();
	}

	public async setUpdater(
		startVersion: string,
		endVersion: string,
	): Promise<void> {
		if (this.versionEl !== undefined) this.versionEl.textContent = 'Updating from version ' + startVersion + ' to ' + endVersion;
	}

	public async setFileCount(
		count: number
	): Promise<void> {
		if (this.countEl !== undefined) this.countEl.textContent = count.toString();
	}

	public async addFileUpdated(
	): Promise<void> {
		this.currentCounter++;
		if (this.currentEl !== undefined) this.currentEl.textContent = this.currentCounter.toString();
	}
}
