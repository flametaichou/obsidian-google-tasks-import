import { Template } from "model/template";
import { Task } from "model/task";

export const NOTE_TEMPLATE: Template = new Template((item: Task) => 
`---
date: ${item.created}
modify_date: ${item.updated}
---
${item.title}
`
);