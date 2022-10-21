import {AbstractRpgManager} from "../../../abstracts/AbstractRpgManager";
import {fuzzySearch, SearchResult, TFile} from "obsidian";
import {SearchResultInterface} from "../interfaces/SearchResultInterface";

export abstract class AbstractSearchWorker extends AbstractRpgManager {
	protected setFancyName(
		text: string,
		fuzzySearchResult: SearchResult|null,
		isTitle = true,
	): HTMLDivElement {
		const response = document.createElement('div');
		response.addClass(isTitle ? 'suggestion-title' : 'suggestion-note');

		if (fuzzySearchResult == null || fuzzySearchResult.matches == null) {
			response.textContent = text;
			return response;
		}

		let currentTextIndex = 0;
		for(let index=0; index<fuzzySearchResult.matches.length; index++){
			const matchingPart: Array<number> = fuzzySearchResult.matches[index];
			const start = matchingPart[0];
			const end = matchingPart[1];

			if (start > currentTextIndex)
				response.appendChild(document.createTextNode(text.substring(currentTextIndex, start)));

			const responseSpanEl = document.createElement('span');
			responseSpanEl.addClass('suggestion-highlight');
			responseSpanEl.textContent = text.substring(start, end);
			response.appendChild(responseSpanEl as Node)

			currentTextIndex = end;
		}

		if (text.length > currentTextIndex)
			response.appendChild(document.createTextNode(text.substring(currentTextIndex)));

		return response;
	}
}
