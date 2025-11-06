
export enum LoginType {
  BMMU = "BMMU",
  DMMU = "DMMU",
  SMMU = "SMMU",
  ADMIN = "State IT Manager",
}

export interface User {
  id: string;
  type: LoginType;
  name: string;
  districtName?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, rememberMe: boolean) => void;
  logout: () => void;
  loading: boolean;
}

export interface Beneficiary {
  id: number;
  state: string;
  district: string;
  block: string;
  gramPanchayat: string;
  village: string;
  shgCode: string;
  shgName: string;
  dateOfFormation: string;
  memberCode: string;
  memberName: string;
  dateOfBirth: string;
  dateOfJoiningInSHG: string;
  designationInSHG: string;
  socialCategory: string;
  pvtg: string;
  religion: string;
  education: string;
  gender: string;
  maritalStatus: string;
  insurance: string;
  disability: string;
  disabilityType: string;
  isHeadOfFamily: string;
  fatherMotherSpouseName: string;
  relation: string;
  accountNumber: string;
  ifsc: string;
  branchName: string;
  bankName: string;
  accountOpeningDate: string;
  accountType: string;
  mobileNo: string;
  aadhaarKYC: string;
  eKYC: string;
  cadres: string;
  primaryLivelihoods: string;
  secondaryLivelihoods: string;
  tertiaryLivelihoods: string;
  nregaJobCardNumber: string;
  pmaygId: string;
  seccTin: string;
  nrlmMisId: string;
  stateMisId: string;
  ebkId: string;
  ebkName: string;
  bkMobileNo: string;
  approvalStatus: string;
  firstTimeApprovalDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  inactiveRejectDate: string;
  inactiveRejectReason: string;
  migratedLokos: string;
}