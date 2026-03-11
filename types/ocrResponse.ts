export interface IPlanholder{
    idType: string;
    idNumber: string;
    birthDate: string;  
    lastName: string;
    firstName: string;
    middleName: string;
    addressLine: string;
}
export interface IAPIResponse {
    description: string;
    response: IPlanholder;
}