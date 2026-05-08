export interface Task {
    id: string;
    number: number;
    title: string;
    description?: string;
    status: Status;
    groupId?: string;
}

export interface TaskGroup {
    id: string;
    name: string;
    color: string;
}

export interface Status {
    name: string;
    bgColor: string;
    color: string;
}
