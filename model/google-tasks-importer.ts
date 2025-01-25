import { DataWriteOptions, Vault } from "obsidian";
import { BOARD_TEMPLATE } from "templates/board-template";
import { NOTE_TEMPLATE } from "templates/note-template";
import { TaskLists } from "./task-lists";

const SEPARATOR = '/';
const MAX_FILENAME_CHARACTERS = 54;

// File name cannot contain any of the following characters: \/:
const escape = function (name: string): string {
  return name.replace(/[/\\:\n|]/g, '');
}

export class GoogleTasksImporter {
  file: File;
  targetVault: Vault;
  targetFolderName: string;

  constructor(file: File, vault: Vault, folderName: string) {
    this.file = file;
    this.targetVault = vault;
    this.targetFolderName = folderName;
  }


  buildPath(path: string, name: string, extension?: string): string {
    if (!extension) {
      extension = '';
    }
    const title = escape(name).substring(0, MAX_FILENAME_CHARACTERS).trim();
    let notePath = path + SEPARATOR + title + extension;

    let counter = 0;
    while (this.targetVault.getFileByPath(notePath)) {
      if (counter > 100) {
        throw new Error(`Too many paths with the same name "${name}"`);
      }

      const ending = ` (${counter})`;
      const newTitle = title + ending;
      notePath = path + SEPARATOR + newTitle + extension;
      counter++;
    }

    return notePath;
  }

  async import(): Promise<void> {
    const json: string = await this.file.text();
    let taskLists: TaskLists;

    try {
      taskLists = JSON.parse(json) as TaskLists;

    } catch (e: unknown) {
      throw new Error('Invalid file format!');
    }

    if (!this.targetVault.getFolderByPath(this.targetFolderName)) {
      await this.targetVault.createFolder(this.targetFolderName);

      for (const list of taskLists.items) {
        const listFolderPath = this.buildPath(this.targetFolderName, list.title);
        await this.targetVault.createFolder(listFolderPath);

        const needsActionItems: string[] = [];
        const completedItems: string[] = [];

        for (const item of list.items) {
          // TODO: correctly insert duplicates into board note
          const notePath = this.buildPath(listFolderPath, item.title, '.md');
          const content = NOTE_TEMPLATE.compile(item);
          const options = {} as DataWriteOptions;

          try {
            await this.targetVault.create(
              notePath,
              content,
              options
            );
          } catch (e: unknown) {
            console.error(e);
            throw new Error(`Error on saving note ${item.title}`);
          }

          const pathParts = notePath.split(SEPARATOR);
          const itemTitle = pathParts[pathParts.length - 1].replace('.md', '');

          switch (item.status) {
            case 'needsAction':
              needsActionItems.push(itemTitle);
              break;

            case 'completed':
              completedItems.push(itemTitle);
              break;

            default:
              throw new Error(`Unknown status: ${item.status}`)
          }
        }

        const boardPath = this.buildPath(this.targetFolderName, list.title, '.md');
        const boardContent = BOARD_TEMPLATE.compile(list, needsActionItems, completedItems, listFolderPath);
        const boardOptions = {} as DataWriteOptions;
        await this.targetVault.create(
          boardPath,
          boardContent,
          boardOptions
        );
      }

    } else {
      throw new Error(`Folder ${this.targetFolderName} already exists!`);
    }
  }
}