import {AbstractView} from "../abstracts/AbstractView";
import {Component, MarkdownRenderer} from "obsidian";
import {TimelineEvent} from "../models/RpgTimelineModel";

export interface TimelineDataInterface {
	events: TimelineEvent[];
	campaign: any|null;
	campaignImage: string;
}

export class TimelineView extends AbstractView {
	async render(
		data: TimelineDataInterface
	): Promise<void> {
		let response : string = this.header(
			data.campaign,
			data.campaignImage,
		);

		for(let eventCount=0; eventCount<data.events.length; eventCount++){
			let fileLink = document.createElement('h3');
			await MarkdownRenderer.renderMarkdown(
				data.events[eventCount].link,
				fileLink,
				this.dv.currentFilePath,
				null as unknown as Component,
			);
			
			let synopsis = document.createElement('span');
			await MarkdownRenderer.renderMarkdown(
				data.events[eventCount].description,
				synopsis,
				this.dv.currentFilePath,
				null as unknown as Component,
			);

			const date = this.functions.formatDate(data.events[eventCount].time, "short");
			const time = this.functions.formatTime(data.events[eventCount].time);
			response += '<li>' +
				'<div class="bullet' + data.events[eventCount].getEventColour() + '"></div>' +
				'<div class="time">' + date + (time !== '00:00' ? '<br/>' + time : '') + '</div>' +
				'<div class="event-type' + data.events[eventCount].getEventColour() + '">' + data.events[eventCount].type + '</div>' +
				'<div class="desc">' +
				fileLink.outerHTML +
				synopsis.outerHTML +
				'</div>' +
				'</li>'
		}

		response += this.footer();

		this.dv.container.innerHTML = response;
	}

	private header(
		campaign: any|null,
		campaignImage: string,
	): string {
		return '<div class="rpgm-container"><div class="rpgm-header"' + campaignImage + '>' +
			'<div class="rpgm-color-overlay">' +
			'<div class="rpgm-day-number">Timeline</div>' +
			'<div class="rpgm-date-right">' +
			'<div class="rpgm-day-name">' + (campaign !== null ? campaign.file.name : "Campaign") + '</div>' +
			'<div class="rpgm-month">' + (campaign !== null ? this.functions.formatDate(campaign.dates.current, "long") : "") + '</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="rpgm-timeline"><ul>';
	}

	private footer(
	): string {
		return '</ul></div></div>';
	}
}
