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
export interface IOcrValue {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  birthDate?: string;
  idType?: string;
  addressLine1?: string;
}