import { Task } from "./task";

export interface Tasks {
    kind: string;
    id: string;
    title: string;
    updated: string;
    items: Task[];
    selfLink: string;
}