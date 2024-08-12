export interface Task {
    taskId: string;
    taskName: string;
    startDate: Date;
    dueDate: Date | null;
    employee?: string;
}
export interface UpdateTaskDTO {
    taskName: string;
    startDate: Date;
    dueDate: Date | null;
    employee?: string;
}