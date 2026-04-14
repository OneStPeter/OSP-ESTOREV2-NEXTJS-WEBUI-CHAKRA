export interface IPersonalInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix?: string;
  birthDate: string;
  idType: string;
  idNumber: string;
  height: number;
  weight: number;
  gender: string;
  civilStatus: string;
  nationality: string;
  mobileNumber: string;
  emailAddress: string;
  mailingAddress: string;
  landLineNumber?: string;
  addressLine1?: string;
}
export interface IEmployment{
  occupation?: string;
  employerName?: string;
  employmentStatus?: string;
  officeAddress?: string;
  TIN ?: string;
  SSS ?: string;
  sourceOfIncome?: string;
}

export interface IBeneficiary {
  firstName: string;
  middleInitial: string;
  lastName: string;
  birthDate: string;
  address: string;
  relationship: string;
  beneficiaryClass: string;
}
export interface IAddress{
  lot?: string;
  street?: string;
  barangay?: string;
  city?: string;
  province?: string;
  addressLine?: string;
}

export interface IHealthDeclaration {
  healthDeclaration1: number;
  healthDeclaration2: number;
  healthDeclaration3: number;
}

export interface IApplicationData {
  personalInfo: IPersonalInfo;
  employment: IEmployment;
  address: IAddress;
  beneficiaries: IBeneficiary[];
  principalBeneficiary?: IBeneficiary;
  contingentBeneficiary?: IBeneficiary;
  healthDeclaration: IHealthDeclaration;
}

