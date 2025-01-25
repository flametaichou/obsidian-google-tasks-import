import { Tasks } from "./tasks";

export interface TaskLists {
    kind: string;
    items: Tasks[];
}