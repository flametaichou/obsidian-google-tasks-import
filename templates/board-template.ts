import { Tasks } from "model/tasks";
import { Template } from "model/template";

export const BOARD_TEMPLATE: Template = new Template((
    list: Tasks, 
    needsActionItems: string[],
    completedItems: string[],
    listFolderPath: string
) => 
`---
kanban-plugin: board
title: ${list.title}
date: ${list.updated}
modify_date: ${list.updated}
---
## Needs Action

${needsActionItems.map((i) => `- [ ] [[${i}]]\n`).join('')}

## Completed

**Complete**
${completedItems.map((i) => `- [x] [[${i}]]\n`).join('')}


%% kanban:settings
\`\`\`
{"kanban-plugin":"board","new-note-folder":"${listFolderPath}","show-checkboxes":true}
\`\`\`
%%
`
);