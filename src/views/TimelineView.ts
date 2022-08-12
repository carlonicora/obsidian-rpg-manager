import {AbstractListView} from "../abstracts/AbstractListView";
import {Component, MarkdownRenderer} from "obsidian";
import {TimelineDataInterface, TimelineListInterface} from "../data/TimelineData";
import {CampaignDataInterface} from "../data/CampaignData";

export class TimelineView extends AbstractListView {
	async render(
		data: TimelineListInterface
	): Promise<void> {
		let response : string = this.header(
			data.campaign,
		);

		data.elements.forEach((timeline: TimelineDataInterface) => {
			const fileLink = document.createElement('h3');
			const synopsis = document.createElement('span');

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

			response += '<li>' +
				'<div class="bullet' + timeline.getEventColour() + '"></div>' +
				'<div class="event-time">' + timeline.date + (timeline.time !== '00:00' ? '<br/>' + timeline.time : '') + '</div>' +
				'<div class="event-type' + timeline.getEventColour() + '">' + timeline.type + '</div>' +
				'<div class="event-details">' +
				fileLink.outerHTML +
				synopsis.outerHTML +
				'</div>' +
				'</li>'
		});

		response += this.footer();

		this.dv.container.innerHTML = response;
	}

	private header(
		campaign: CampaignDataInterface|null,
	): string {
		const campaignImage = (campaign?.imageSrc != null ? 'style="background-image: url(\'' + campaign.imageSrc + '\');"' : '');

		return '<div class="rpgm-container">' +
			'<div class="rpgm-header"' + campaignImage + '>' +
			'<div class="rpgm-header-overlay">' +
			'<div class="rpgm-header-title">Timeline</div>' +
			'<div class="rpgm-campaign-name">' + (campaign !== null ? campaign.name : "Campaign") + '</div>' +
			'<div class="rpgm-current-date">' + (campaign !== null ? this.functions.formatDate(campaign.currentDate, "long") : "") + '</div>' +
			'</div>' +
			'</div>' +
			'<div class="rpgm-timeline"><ul>';
	}

	private footer(
	): string {
		return '</ul></div></div>';
	}
}
