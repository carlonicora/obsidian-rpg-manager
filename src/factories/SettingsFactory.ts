import {Setting} from "obsidian";
import {RpgManagerInterface} from "../interfaces/RpgManagerInterface";
import {SettingType} from "../enums/SettingType";
import {SettingInterface} from "../interfaces/SettingsInterface";

export class SettingsFactory {
	constructor(
		private plugin: RpgManagerInterface,
		private map: Map<SettingType, SettingInterface>,
		private containerEl: HTMLElement,
	) {
	}

	private generateFragment(
		text: string,
	): DocumentFragment {
		const lines = text.split('\n');

		return createFragment(fragment => {
			lines.forEach((content: string) => {
				fragment.appendText(content);
				fragment.createEl('br');
			});
			fragment.appendText(' ');
		});
	}

	public createHeader(
		text: string,
		level=2,
		additionalText: string|undefined=undefined,
	): void {
		const elementType = 'h' + level.toString();
		this.containerEl.createEl(elementType as keyof HTMLElementTagNameMap, {text: text});
		if (additionalText !== undefined){
			this.containerEl.createEl('span', {text: this.generateFragment(additionalText)});
		}
	}

	public createWarning(
		text: string,
	): void {
		this.containerEl.createEl('p', {text: text}).style.color = 'var(--text-error)';
	}

	public createTextSetting(
		type: SettingType,
		description: string,
	): Setting {
		const settings = this.map.get(type);

		if (settings === undefined) throw new Error('Setting type not found');

		return new Setting(this.containerEl)
			.setName(settings.title)
			.setDesc(this.generateFragment(description))
			.addText(text =>
				text.setPlaceholder(settings.placeholder ?? '')
					.setValue(settings.value)
					.onChange((value: string) => {settings.value = value;})
			);
	}

	public createDropdownSetting(
		type: SettingType,
		description: string,
		options: Map<string, string>,
	): Setting {
		const settings = this.map.get(type);

		if (settings === undefined) throw new Error('Setting type not found');

		return new Setting(this.containerEl)
			.setName(settings.title)
			.setDesc(this.generateFragment(description))
			.addDropdown(dropdown => {
				dropdown.addOption('', '');
				options.forEach((value: string, display: string) => {
					dropdown.addOption(value, display);
				});
				dropdown.setValue(settings.value);
				dropdown.onChange(async value => {
					switch (type) {
						case SettingType.templateFolder:
							await this.plugin.updateSettings({templateFolder: value});
							settings.value = value;
							break;
					}
				})
			});
	}

	public createToggleSetting(
		type: SettingType,
		description: string,
	): Setting {
		const settings = this.map.get(type);

		if (settings === undefined) throw new Error('Setting type not found');

		return new Setting(this.containerEl)
			.setName(settings.title)
			.setDesc(this.generateFragment(description))
			.addToggle(toggle =>
				toggle
					.setValue(settings.value)
					.onChange(async value => {
						switch (type){
							case SettingType.automaticMove:
								await this.plugin.updateSettings({ automaticMove: value })
								settings.value = value;
								break;
						}
					})
			);
	}
}
