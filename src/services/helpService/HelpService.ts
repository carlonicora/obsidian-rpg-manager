import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {HelpServiceInterface} from "./interfaces/HelpServiceInterface";
import {Component, MarkdownRenderer} from "obsidian";

export class HelpService extends AbstractService implements ServiceInterface, HelpServiceInterface {
	public async add(
		containerEl: HTMLDivElement,
		description: string,
	): Promise<void> {
		const helpIconEl: HTMLSpanElement = containerEl.createSpan({cls: 'rpg-manager-help', text: '?'});


		const descriptionContainerEl: HTMLDivElement = document.createElement('div');
		descriptionContainerEl.addClass('rpg-manager-help-content-container');

		const descriptionContentEl: HTMLDivElement = descriptionContainerEl.createDiv({cls: 'rpg-manager-help-content'})

		MarkdownRenderer.renderMarkdown(
			description,
			descriptionContentEl,
			'',
			null as unknown as Component,
		);

		helpIconEl.addEventListener('mouseover', () => {
			descriptionContainerEl.style.left = helpIconEl.getBoundingClientRect().left.toString() + 'px';
			descriptionContainerEl.style.top = (helpIconEl.getBoundingClientRect().top + helpIconEl.offsetHeight).toString() + 'px';

			document.body.append(descriptionContainerEl as Node);
		});

		helpIconEl.addEventListener('mouseout', () => {
			const descriptionEls: HTMLCollectionOf<Element> = document.getElementsByClassName('rpg-manager-help-content-container');
			for (let index=0; index<descriptionEls.length; index++){
				if (descriptionEls[index].hasClass('rpg-manager-help-content-container'))
					descriptionEls[index].remove();

			}
		});
	}
}
