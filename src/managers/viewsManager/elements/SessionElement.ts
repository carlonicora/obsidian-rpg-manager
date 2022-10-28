import {AbstractElement} from "../abstracts/AbstractElement";
import {SessionElementDataInterface} from "./interfaces/SessionElementDataInterface";
import {SessionInterface} from "../../../components/session/interfaces/SessionInterface";
import {Component, MarkdownRenderer, TAbstractFile} from "obsidian";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";

export class SessionElement extends AbstractElement {
	render(
		data: SessionElementDataInterface,
		containerEl: HTMLElement,
	) {
		let selectedSession: SessionInterface|undefined = undefined;

		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});

		this.createTitle(data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});
		const sessionSelectorEl = contentEl.createEl("select");
		sessionSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		data.values.sessions.forEach((session: SessionInterface) => {
			const sessionOptionEl = sessionSelectorEl.createEl("option", {
				text: session.file.basename,
				value: session.file.path,
			});

			if (data.values.sessionId !== undefined && data.values.sessionId.toString() === session.id.sessionId?.toString()) {
				selectedSession = session;
				sessionOptionEl.selected = true;
			}

		});

		sessionSelectorEl.addEventListener("change", (e) => {
			const file: TAbstractFile|null = this.api.app.vault.getAbstractFileByPath(sessionSelectorEl.value);

			if (file == null)
				return;

			const selectedSession: SessionInterface|undefined = this.api.database.readByPath<SessionInterface>(sessionSelectorEl.value);
			if (selectedSession === undefined)
				return;

			this.api.service(CodeblockService).addOrUpdate('data.sessionId', selectedSession.id.sessionId);

			this._addSessionLink(selectedSession, contentEl);
		});

		if (selectedSession !== undefined)
			this._addSessionLink(selectedSession, contentEl);

	}

	private _addSessionLink(
		session: SessionInterface,
		containerEl: HTMLElement,
	): void {
		const linkContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content-link'});

		MarkdownRenderer.renderMarkdown(
			session.link,
			linkContainerEl,
			'',
			null as unknown as Component,
		);
	}
}
