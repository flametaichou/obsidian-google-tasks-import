import { ImportModal } from 'modals/import-modal';
import { GoogleTasksImportSettingTab } from 'modals/settings-tab';
import { Plugin } from 'obsidian';

interface GoogleTasksImportPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: GoogleTasksImportPluginSettings = {
	mySetting: 'default'
}

export default class GoogleTasksImportPlugin extends Plugin {
	settings: GoogleTasksImportPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('import', 'Google Tasks Import', (evt: MouseEvent) => {
			new ImportModal(this.app, () => {}).open();
		});

		this.addCommand({
			id: 'open-google-tasks-import-modal',
			name: 'Open Google Tasks Import modal',
			callback: () => {
				new ImportModal(this.app, () => {}).open();
			}
		});

		this.addSettingTab(new GoogleTasksImportSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
