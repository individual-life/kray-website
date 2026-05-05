export interface Task {
    id: string;
    number: number;
    title: string;
    description?: string;
    status: Status;
}


export interface Status {
    name: string;
    bgColor: string;
    color: string;
}
