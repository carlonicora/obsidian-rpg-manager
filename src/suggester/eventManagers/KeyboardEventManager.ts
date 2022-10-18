export class KeyboardEventManager {
	public listener: EventListener;

	constructor(
	) {
		this.listener = (evt: KeyboardEvent) => this._handleKeyPress(evt);
	}

	private _handleKeyPress(
		evt: KeyboardEvent,
	) {
		console.log('aaa')
		if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown' || evt.key === 'Enter' || evt.key === 'Escape') {
			evt.preventDefault();
			console.log(evt.key);
		}
	}

	/*
	private _handleKeyPress(evt: KeyboardEvent) {
		if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown' || evt.key === 'Enter' || evt.key === 'Escape') {
			evt.preventDefault();
			switch (evt.key) {
				case "ArrowDown":
					if (this._currentlySelectedSearchResult === undefined) return;
					if (this._currentlySelectedSearchResult === this._results.length) return;
					(<HTMLDivElement>this._suggestionEl.childNodes[this._currentlySelectedSearchResult]).removeClass('is-selected');
					this._currentlySelectedSearchResult++;
					(<HTMLDivElement>this._suggestionEl.childNodes[this._currentlySelectedSearchResult]).addClass('is-selected');
					break;
				case "ArrowUp":
					if (this._currentlySelectedSearchResult === undefined) return;
					if (this._currentlySelectedSearchResult === 0) return;
					(<HTMLDivElement>this._suggestionEl.childNodes[this._currentlySelectedSearchResult]).removeClass('is-selected');
					this._currentlySelectedSearchResult--;
					(<HTMLDivElement>this._suggestionEl.childNodes[this._currentlySelectedSearchResult]).addClass('is-selected');
					break;
				case "Enter":
					if (this._currentlySelectedSearchResult === undefined) return;
					if (this._containerEl.selectionStart == null) return;

					const selectedResult = this._results[this._currentlySelectedSearchResult];

					const currentText = this._containerEl.value.substring(0, this._containerEl.selectionStart);
					const indexOfLastStart = currentText.lastIndexOf('[[');
					const replace = this._containerEl.value.substring(indexOfLastStart, this._containerEl.selectionStart - indexOfLastStart);

					if (selectedResult.title !== selectedResult.file.basename) {
						this._containerEl.value = this._containerEl.value.replace(replace, '[[' + selectedResult.file.basename + '|' + selectedResult.title + ']]');
					} else {
						this._containerEl.value = this._containerEl.value.replace(replace,'[[' + selectedResult.file.basename + ']]');
					}

					this._removeSearchResults();
					break;
				case "Escape":
					this._removeSearchResults();
					break;
			}
		}
	}
	*/
}
