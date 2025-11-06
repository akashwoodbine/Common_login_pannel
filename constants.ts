
export const SMMU_DATA = [
  { name: "Farm LH", id: "SMM_FARMLH" },
  { name: "FNHW", id: "SMM_FNHW" },
  { name: "M&E", id: "SMM_ME" },
  { name: "MCLF", id: "SMM_MCLF" },
  { name: "MF&FI", id: "SMM_MF" },
  { name: "Non Farm", id: "SMM_NONFARM" },
  { name: "NONFARM LH", id: "SMM_NONFARHLH" },
  { name: "SISD", id: "SMM_SISD" },
  { name: "SMCB", id: "SMM_SMCB" },
  { name: "TNCB", id: "SMM_TNCB" },
  { name: "Fishery", id: "SMM_FISHERY" },
  { name: "ADMIN", id: "SMM_ADMIN" },
];

export const DMMU_DATA = [
  { name: "Agra", id: "DMM_AGRA" },
  { name: "Firozabad", id: "DMM_FIROZABAD" },
];

export const BMMU_DATA = [
  { name: "Achhnera", id: "BMM_ACHHNERA" },
  { name: "Akola", id: "BMM_AKOLA" },
  { name: "Bah", id: "BMM_BAH" },
  { name: "Barauli Ahir", id: "BMM_BARAULI" },
  { name: "Bichpuri", id: "BMM_BICHPURI" },
  { name: "Etmadpur", id: "BMM_Etmadpur" },
  { name: "Fatehabad", id: "BMM_Fatehabad" },
  { name: "Fatehpur Sikri", id: "BMM_FatehpurSikri" },
  { name: "Jagner", id: "BMM_Jagner" },
  { name: "Jaitpur Kalan", id: "BMM_JaitpurKalan" },
  { name: "Khandauli", id: "BMM_Khandauli" },
  { name: "Kheragarh", id: "BMM_Kheragarh" },
  { name: "Pinahat", id: "BMM_Pinahat" },
  { name: "Saiyan", id: "BMM_Saiyan" },
  { name: "Shamsabad", id: "BMM_Shamsabad" },
  { name: "Araon", id: "BMM_Araon" },
  { name: "Eka", id: "BMM_Eka" },
  { name: "Firozabad", id: "BMM_Firozabad" },
  { name: "Hathwant", id: "BMM_Hathwant" },
  { name: "Jasrana", id: "BMM_Jasrana" },
  { name: "Madanpur", id: "BMM_Madanpur" },
  { name: "Narkhi", id: "BMM_Narkhi" },
  { name: "Shikohabad", id: "BMM_Shikohabad" },
  { name: "Tundla", id: "BMM_Tundla" },
];

export const DISTRICT_BLOCK_MAP: { [key: string]: { name: string; blocks: { name: string; id: string }[] } } = {
  "DMM_AGRA": {
    name: "Agra",
    blocks: [
      { name: "Achhnera", id: "BMM_ACHHNERA" },
      { name: "Akola", id: "BMM_AKOLA" },
      { name: "Bah", id: "BMM_BAH" },
      { name: "Barauli Ahir", id: "BMM_BARAULI" },
      { name: "Bichpuri", id: "BMM_BICHPURI" },
      { name: "Etmadpur", id: "BMM_ETMADPUR" },
      { name: "Fatehabad", id: "BMM_FATEHABAD" },
      { name: "Fatehpur Sikri", id: "BMM_FATEHPURSIKRI" },
      { name: "Jagner", id: "BMM_JAGNER" },
      { name: "Jaitpur Kalan", id: "BMM_JAITPURKALAN" },
      { name: "Khandauli", id: "BMM_KHANDAULI" },
      { name: "Kheragarh", id: "BMM_KHERAGARH" },
      { name: "Pinahat", id: "BMM_PINAHAT" },
      { name: "Saiyan", id: "BMM_SAIYAN" },
      { name: "Shamsabad", id: "BMM_SHAMSABAD" },
    ],
  },
  "DMM_FIROZABAD": {
    name: "Firozabad",
    blocks: [
      { name: "Araon", id: "BMM_ARAON" },
      { name: "Eka", id: "BMM_EKA" },
      { name: "Firozabad", id: "BMM_FIROZABAD" },
      { name: "Hathwant", id: "BMM_HATHWANT" },
      { name: "Jasrana", id: "BMM_JASRANA" },
      { name: "Madanpur", id: "BMM_MADANPUR" },
      { name: "Narkhi", id: "BMM_NARKHI" },
      { name: "Shikohabad", id: "BMM_SHIKOHABAD" },
      { name: "Tundla", id: "BMM_TUNDLA" },
    ],
  },
};


export const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
