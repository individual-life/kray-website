export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    progress: {
        current: number;
        total: number;
    };
    dueDate: string;
    members: string[]; 
    comments: number;
    attachments: number;
}

export interface Column {
    id: string;
    title: string;
    tasks: Task[];
}
export interface Status {
    name: string;
    bgColor: string;
    color: string;
}
