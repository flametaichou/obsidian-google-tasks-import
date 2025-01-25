import { GoogleTasksImporter } from 'model/google-tasks-importer';
import { App, Modal, Notice, Setting } from 'obsidian';

export class ImportModal extends Modal {
  uploadInput: HTMLInputElement;
  selectedFile: File | undefined;
  folderName: string;

  constructor(app: App, onSubmit: (result: string) => void) {
    super(app);
    this.setTitle('Import Google Tasks');

    const uploadSettingItem = this.contentEl.createDiv({
      attr: {
        class: 'setting-item'
      }
    });

    const uploadSettingItemInfo = uploadSettingItem.createDiv({
      attr: {
        class: 'setting-item-info'
      }
    });

    const uploadSettingItemName = uploadSettingItemInfo.createDiv({
      attr: {
        class: 'setting-item-name'
      }
    });
    uploadSettingItemName.textContent = 'Pick a file';

    const uploadSettingItemDesc = uploadSettingItemInfo.createDiv({
      attr: {
        class: 'setting-item-description'
      }
    });
    uploadSettingItemDesc.textContent = 'Specify the path to the Tasks.json file';

    const uploadSettingItemCtrl = uploadSettingItem.createDiv({
      attr: {
        class: 'setting-item-control'
      }
    });

    this.uploadInput = uploadSettingItemCtrl.createEl('input', {
      type: 'file',
      attr: {
        'multiple': false,
        'accept': 'application/json'
      }
    });
    this.uploadInput.addEventListener('change', () => {
      this.selectedFile = this.uploadInput.files ? this.uploadInput.files[0] : undefined;
    });

    new Setting(this.contentEl)
      .setName('Target folder path')
      .setDesc('Define the target path inside the Vault to import. For example: Import/Google Tasks')
      .addText((text) =>
        text.onChange((value) => {
          this.folderName = value;
        }));

    new Setting(this.contentEl)
      .addButton((btn) =>
        btn
          .setButtonText('Import')
          .setCta()
          .onClick(async () => {
            btn.setDisabled(true);

            try {
              if (!this.selectedFile) {
                throw new Error('JSON is not picked!');
              }

              if (!this.folderName) {
                throw new Error('Target directory is not defined!');
              }

              const importer: GoogleTasksImporter = new GoogleTasksImporter(this.selectedFile, this.app.vault, this.folderName);
              await importer.import();

              new Notice('Success!');
              this.close();

            } catch (e: unknown) {
              new Notice('An error occurred during import: ' + (e as Error).message);
              btn.setDisabled(false);
            }
          }));
  }
}