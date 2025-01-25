export interface Task {
    kind: string;
    created: string;
    id: string;
    title: string;
    task_type: string;
    updated: string;
    selfLink: string;
    status: 'completed' | 'needsAction';
}