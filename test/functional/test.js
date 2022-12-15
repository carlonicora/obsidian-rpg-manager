const { assert } = require("chai");
const fs = require("fs");

// Note: Supported keyboard key names can be found here:
// https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions

async function sleep(seconds) {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

describe("Plugin", function () {
	this.timeout(60 * 1000);

	this.beforeAll(async function () {
		await browser;

		// These steps are from
		// https://github.com/trashhalo/obsidian-plugin-e2e-test/blob/master/test/spec.js :

		// Open the vaults, avoiding working with a File Chooser modal:
		await browser.execute(
			"require('electron').ipcRenderer.sendSync('vaultOpen', 'test/functional/vaults/empty_vault', false)"
		);
		await sleep(2);

		// Disable safemode and enable the plugin:
		await browser.execute(
			"app.plugins.setEnable(true);app.plugins.enablePlugin('obsidian-carry-forward')"
		);

		// Dismiss warning model:
		await browser.$(".modal-button-container button:last-child").click();
		await sleep(0.5);

		// Change the default settings text:
		await (await browser.$$('.vertical-tab-header-group')[1]).$('.vertical-tab-nav-item').click();
		await browser.$('.setting-item-control').click();
		await browser.keys('here');
		await sleep(1);

		// Exit settings:
		await browser.$(".modal-close-button").click();
	})

	beforeEach(async function () {
		await browser;
		// Create a new file:
		await browser.$('.workspace').keys(['Control', 'n']);
	});

	afterEach(async function () {
		await browser;
		await browser.keys(['Escape']);  // Close any open dialog box.
		await sleep(0.5);
		await browser.keys(['Control', 'p']);  // Open the Command Palette
		await sleep(0.5);
		await browser.$(".prompt-input").keys("Delete current file");
		await sleep(0.5);
		await browser.$(".suggestion-item.is-selected").click();
		await sleep(1);
		await browser.$$('.mod-warning')[1].click();
		await sleep(1);
	});

	it("try something", async function () {
		await browser.$('.view-content').click();

		assert(true === true, `Error Message`);
	});
});
