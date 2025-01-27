import { z } from "zod";

export const createFamilySchema = z.object({
  wardNo: z.number().min(1, "Ward number is required"),
  areaCode: z.string().optional(),
  houseTokenNumber: z.string().optional(),
  familySymbolNo: z.string().optional(),
  locality: z.string().optional(),
  devOrg: z.string().optional(),
  location: z.string().optional(),
  gps: z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()]),
  }).optional(),
  altitude: z.number().optional(),
  gpsAccuracy: z.number().optional(),
  
  headName: z.string().optional(),
  headPhone: z.string().optional(),
  totalMembers: z.number().optional(),
  isSanitized: z.boolean().optional(),
  
  surveyAudioRecording: z.string().optional(),
  familyImage: z.string().optional(),
  enumeratorSelfie: z.string().optional(),
  
  houseOwnership: z.string().optional(),
  houseOwnershipOther: z.string().optional(),
  feels_safe: z.string().optional(),
  waterSource: z.array(z.string()).optional(),
  waterSourceOther: z.string().optional(),
  waterPurificationMethods: z.array(z.string()).optional(),
  toiletType: z.string().optional(),
  solidWaste: z.string().optional(),
  solidWasteOther: z.string().optional(),
  
  primaryCookingFuel: z.string().optional(),
  primaryEnergySource: z.string().optional(),
  primaryEnergySourceOther: z.string().optional(),
  facilities: z.array(z.string()).optional(),
  
  femaleProperties: z.string().optional(),
  loanedOrganizations: z.array(z.string()).optional(),
  loanUse: z.string().optional(),
  hasBank: z.string().optional(),
  hasInsurance: z.string().optional(),
  healthOrg: z.string().optional(),
  healthOrgOther: z.string().optional(),
  incomeSources: z.array(z.string()).optional(),
  municipalSuggestions: z.string().optional(),
  municipalSuggestionsOther: z.string().optional(),
  
  hasRemittance: z.boolean().optional(),
  remittanceExpenses: z.array(z.string()).optional(),
});

export const updateFamilySchema = z.object({
  id: z.string().min(1, "Family ID is required"),
}).merge(createFamilySchema.partial());

export type CreateFamilyInput = z.infer<typeof createFamilySchema>;
export type UpdateFamilyInput = z.infer<typeof updateFamilySchema>;
