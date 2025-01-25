import GoogleTasksImportPlugin from "main";
import { PluginSettingTab, App, Setting } from "obsidian";

export class GoogleTasksImportSettingTab extends PluginSettingTab {
    plugin: GoogleTasksImportPlugin;

    constructor(app: App, plugin: GoogleTasksImportPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Test setting')
            .setDesc('This is a test setting')
            .addText(text => text
                .setPlaceholder('Enter setting value')
                .setValue(this.plugin.settings.mySetting)
                .onChange(async (value) => {
                    this.plugin.settings.mySetting = value;
                    await this.plugin.saveSettings();
                }));
    }
}