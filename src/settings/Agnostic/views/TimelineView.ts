import {AbstractView} from "../../../abstracts/AbstractView";
import {TimelineElementResponseInterface} from "../../../interfaces/response/TimelineElementResponseInterface";
import {TimelineResponseInterface} from "../../../interfaces/response/TimelineResponseInterface";
import {Component, MarkdownRenderer} from "obsidian";

export class TimelineView extends AbstractView {
	render(
		container: HTMLElement,
		data: TimelineResponseInterface,
	) {
		const timeline = container.createDiv({cls: 'rpgm-timeline'});

		const ul = timeline.createEl('ul');

		data.elements.forEach((timeline: TimelineElementResponseInterface) => {
			const li = ul.createEl('li');

			const timeContainer = li.createDiv({cls: 'event-time-container'});
			timeContainer.createDiv({cls: 'event-time', text: timeline.date + (timeline.time !== '00:00' ? '\n' + timeline.time : '')});

			const type = timeContainer.createDiv({cls: 'event-type', text: timeline.type});
			const bullet = li.createDiv({cls: 'bullet'});

			switch (timeline.type){
				case "birth":
					type.addClass('green');
					bullet.addClass('green');
					break;
				case "death":
					type.addClass('red');
					bullet.addClass('red');
					break;
				case "session":
					type.addClass('blue');
					bullet.addClass('blue');
					break;
				case "clue":
					type.addClass('purple');
					bullet.addClass('purple');
					break;
			}

			const details = li.createDiv({cls: 'event-details'});

			const fileLink = details.createEl('h3');
			const synopsis = details.createSpan();

			MarkdownRenderer.renderMarkdown(
				timeline.synopsis,
				synopsis,
				this.sourcePath,
				null as unknown as Component,
			);

			MarkdownRenderer.renderMarkdown(
				timeline.link.toString(),
				fileLink,
				this.sourcePath,
				null as unknown as Component,
			);
		});
	}
}
