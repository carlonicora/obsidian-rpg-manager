import { RpgManagerInterface } from "@/RpgManagerInterface";
import MarkdownComponent from "@/components/markdowns/MarkdownComponent";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { RpgManagerSettingsInterface } from "@/settings/RpgManagerSettings";
import { App, Plugin } from "obsidian";
import * as React from "react";
import { UpdaterService } from "../UpdaterService";

function Upgrading(): React.ReactElement {
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const [total, setTotal] = React.useState<number | undefined>(0);
	const [processed, setProcessed] = React.useState<number | undefined>(0);
	const [process, setProcess] = React.useState<string | undefined>(undefined);
	const [message, setMessage] = React.useState<string | undefined>(undefined);

	const updateViewRef = React.useRef<(total: number, processed: number, process: string) => void>();
	updateViewRef.current = (total, processed, process) => {
		setTotal(total);
		setProcessed(processed);
		setProcess(process);
	};

	React.useEffect(() => {
		const updateView = (total: number, processed: number, process: string) => {
			updateViewRef.current?.(total, processed, process);
		};

		const updater = new UpdaterService(app, updateView);
		updater.updateVault().then(() => {
			const settings: RpgManagerSettingsInterface = {
				chatGptKey: undefined,
				templatesFolder: (api.settings as any).templateFolder,
				assetsFolder: (api.settings as any).imagesFolder,
				automaticMove: false,
				useSceneAnalyser: true,
				version: api.version,
				customAttributes: [],
			};
			(api as unknown as Plugin).saveData(settings);

			setTotal(undefined);
			setProcessed(undefined);
			setProcess(undefined);
			setMessage(
				"**Upgrade completed**.\n\nObsidian is currently re-indexing your vault.\n\nPlease wait a minute then restart Obsidian to enjoy the new RPG Manager!"
			);
		});
	}, []);

	return (
		<div>
			{total && <div>total: {total}</div>}
			{processed && <div>processed: {processed}</div>}
			{process && <div>process: {process}</div>}
			{message && (
				<div>
					<MarkdownComponent value={message} />
				</div>
			)}
		</div>
	);
}

export default function UpdaterComponent(): React.ReactElement {
	const [upgrading, setUpgrading] = React.useState(false);

	return (
		<div className="relative">
			<div className="flex flex-col m-3">
				<h1 className="text-[--text-error] text-4xl font-bold mt-3 mb-3">RPG Manager WARNING!</h1>
				<p className="mt-2 mb-2">
					RPG Manager has been updated to <strong>Version 4.0</strong> that is <strong>incompatible</strong> with the
					version previously installed in your vault!
				</p>
				<p className="mt-2 mb-2">Previous versions are not supported any longer</p>
				<p className="mt-2 mb-2">Currently, your campaigns have been disabled.</p>
				<h2 className="text-3xl mt-3 mb-3">What can you do?</h2>
				<p className="mt-2 mb-2">Currently you have two options to proceed:</p>
				<ol className="list-decimal list-inside">
					<li>Revert to Version 3</li>
					<li>Upgrade your campaigns to Version 4</li>
				</ol>
				<h3 className="text-2xl mt-3 mb-3">Revert to Version 3</h3>
				<p className="mt-2 mb-2">
					Reverting RPG Manager to version 3 is possible through the BRAT plugin. If you decide to go down this route,
					you will be able to use RPG Manager as always. You will not receive any further updates, but your campaigns
					will work and look as they always have.
				</p>
				<p className="mt-2 mb-2">If you decide to revert to Version 3, you will have to:</p>
				<ol className="list-decimal list-inside">
					<li>
						<strong>Install BRAT</strong>: To install the BRAT plugin, open "<em>Obsidian Preferences</em>"", head to "
						<em>Community Plugins</em>" and click "<em>Browse</em>". Search for "<em>Obsidian42 - BRAT</em>", install it
						and enable it.
					</li>
					<li>
						<strong>Add Beta plugin with frozen version</strong>: Once BRAT is installed and active, go in the
						Obsidian42 - BRAT Options and click the button "<em>Add Beta plugin with frozen version</em>".
					</li>
					<li>
						<strong>Add version 3.4.5 of RPG Manager</strong>: In the field "<em>Github repository for beta plugin</em>"
						add "<strong>carlonicora/obsidian-rpg-manager</strong>" and in the field "
						<em>Specify the release version tag</em>" add "<strong>3.4.5</strong>".
					</li>
					<li>
						<strong>Restart Obsidian</strong>
					</li>
				</ol>
				<p className="mt-2 mb-2">
					This procedure will install Version 3.4.5 of RPG Manager and will instruct Obsidian not to upgrade to version
					4.
				</p>
				<p>
					If, in the future, you'd like to upgrade to Version 4, Open the BRAT Settings and remove RPG Manager from the
					plugins. Go on the Community Plugins and upgrade RPG Manager.
				</p>
				<h3 className="text-2xl mt-3 mb-3">Upgrade your campaigns to Version 4</h3>
				<p className="mt-2 mb-2">
					Upgrading your campaigns to Version 4 of RPG Manager will align your campaigns to the new RPG Manager, you
					will have access to the new data strucure and user interface; however, you will have to run through the update
					process for your data. The update process may change some of the information in your campaigns, and it is
					never a bug-free solution.
				</p>
				<p>
					<em>
						Please keep in mind that RPG Manager comes as-is, with no guarantee of bug-free upgrade proces. Upgrade at
						your own risk, especially if you skip #1
					</em>
				</p>
				<p className="mt-2 mb-2">If you decide to upgrade your campaigns, you will have to:</p>
				<ol className="list-decimal list-inside">
					<li>
						<strong>Backup your current vault</strong>: Please keep in mind this is a vital step to avoid any data loss.
						Just go in your filesystem and make a copy of your current vault. If anything go south, you can restore your
						backup!
					</li>
					<li>
						Start the upgrade process by clicking on the <strong>Upgrade</strong> button below
					</li>
				</ol>
				<p className="mt-2 mb-2">
					The process might take some time to complete, depending on the size of your vault. Once completed, you will
					have to restart Obsidian for your campaigns to be loaded.
				</p>
				<button className="rpgm-danger" onClick={() => setUpgrading(true)}>
					I am ready! I have backed up my vault! upgrade my vault to Version 4
				</button>
			</div>
			{upgrading && (
				<>
					<div className="fixed inset-0 bg-gray-900 bg-opacity-75"></div>
					<div className="fixed inset-0 flex justify-center items-center">
						<div className="bg-white p-10 rounded-lg">
							<Upgrading />
						</div>
					</div>
				</>
			)}
		</div>
	);
}
