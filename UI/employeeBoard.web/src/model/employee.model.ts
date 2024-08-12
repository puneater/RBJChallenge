export interface Employee{
    employeeId: string;
    firstName: string;
    lastName: string;
    hiredDate: Date | null;
}
export interface UpdateEmployee{
    firstName: string;
    lastName: string;
    hiredDate: Date | null;
}