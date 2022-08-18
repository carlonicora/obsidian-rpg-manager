import {AbstractListView} from "../abstracts/AbstractListView";
import {Component, MarkdownRenderer} from "obsidian";
import {TimelineDataInterface, TimelineListInterface} from "../data/TimelineData";

export class TimelineView extends AbstractListView {
	async render(
		data: TimelineListInterface
	): Promise<void> {

		const container = this.dv.container.createDiv({cls: 'rpg-container'});

		const header = container.createDiv({cls: 'rpgm-header'});
		if (data.campaign?.imageSrc !== null) {
			header.style.backgroundImage = 'url(\'' + data.campaign?.imageSrc + '\')';
		}

		const overlay = header.createDiv({cls: 'rpgm-header-overlay'});

		overlay.createDiv({cls: 'rpgm-header-title', text: 'Timeline'});
		overlay.createDiv({cls: 'rpgm-campaign-name', text: (data.campaign !== null ? data.campaign.name : "Campaign")});
		overlay.createDiv({cls: 'rpgm-current-date', text: (data.campaign !== null ? this.api.formatDate(data.campaign.currentDate, "long") : "")});

		const timeline = container.createDiv({cls: 'rpgm-timeline'});

		const ul = timeline.createEl('ul');

		data.elements.forEach((timeline: TimelineDataInterface) => {
			const li = ul.createEl('li');

			const timeContainer = li.createDiv({cls: 'event-time-container'});

			timeContainer.createDiv({cls: 'event-time', text: timeline.date + (timeline.time !== '00:00' ? '<br/>' + timeline.time : '')});

			const type = timeContainer.createDiv({cls: 'event-type', text: timeline.type});
			if (timeline.getEventColour() !== ''){
				type.addClass(timeline.getEventColour());
			}

			const bullet = li.createDiv({cls: 'bullet'});
			if (timeline.getEventColour() !== ''){
				bullet.addClass(timeline.getEventColour());
			}

			const details = li.createDiv({cls: 'event-details'});

			const fileLink = details.createEl('h3');
			const synopsis = details.createSpan();

			MarkdownRenderer.renderMarkdown(
				timeline.synopsis,
				synopsis,
				this.dv.currentFilePath,
				null as unknown as Component,
			);

			MarkdownRenderer.renderMarkdown(
				'[[' + timeline.name + ']]',
				fileLink,
				this.dv.currentFilePath,
				null as unknown as Component,
			);
		});
	}
}
