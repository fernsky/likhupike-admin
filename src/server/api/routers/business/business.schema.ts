import { z } from "zod";

export const createBusinessSchema = z.object({
  // Enumerator Information
  enumeratorName: z.string().optional(),
  phone: z.string().optional(),

  // Business Basic Information
  businessName: z.string().min(1, "Business name is required"),
  wardNo: z.number().optional(),
  areaCode: z.number().optional(),
  businessNo: z.string().optional(),
  locality: z.string().optional(),

  // Operator Details
  operatorName: z.string().optional(),
  operatorPhone: z.string().optional(),
  operatorAge: z.number().optional(),
  operatorGender: z.string().optional(),
  operatorEducation: z.string().optional(),

  // Business Classification
  businessNature: z.string().optional(),
  businessNatureOther: z.string().optional(),
  businessType: z.string().optional(),
  businessTypeOther: z.string().optional(),

  // Media
  surveyAudioRecording: z.string().optional(),
  gps: z.any().optional(), // You might want to create a specific geometry type validator
  altitude: z.number().optional(),
  gpsAccuracy: z.number().optional(),
  businessImage: z.string().optional(),
  enumeratorSelfie: z.string().optional(),

  // Registration and Legal Information
  registrationStatus: z.string().optional(),
  registeredBodies: z.array(z.string()).optional(),
  registeredBodiesOther: z.string().optional(),
  statutoryStatus: z.string().optional(),
  statutoryStatusOther: z.string().optional(),
  panStatus: z.string().optional(),
  panNumber: z.string().optional(),

  // Financial and Property Information
  investmentAmount: z.number().optional(),
  businessLocationOwnership: z.string().optional(),
  businessLocationOwnershipOther: z.string().optional(),

  // Employee Information
  hasPartners: z.string().optional(),
  totalPartners: z.number().optional(),
  nepaliMalePartners: z.number().optional(),
  nepaliFemalePartners: z.number().optional(),
  hasForeignPartners: z.string().optional(),
  foreignMalePartners: z.number().optional(),
  foreignFemalePartners: z.number().optional(),

  hasInvolvedFamily: z.string().optional(),
  totalInvolvedFamily: z.number().optional(),
  maleInvolvedFamily: z.number().optional(),
  femaleInvolvedFamily: z.number().optional(),

  hasPermanentEmployees: z.string().optional(),
  totalPermanentEmployees: z.number().optional(),
  nepaliMalePermanentEmployees: z.number().optional(),
  nepaliFemalePermanentEmployees: z.number().optional(),
  hasForeignPermanentEmployees: z.string().optional(),
  foreignMalePermanentEmployees: z.number().optional(),
  foreignFemalePermanentEmployees: z.number().optional(),

  hasTemporaryEmployees: z.string().optional(),
  totalTemporaryEmployees: z.number().optional(),
  nepaliMaleTemporaryEmployees: z.number().optional(),
  nepaliFemaleTemporaryEmployees: z.number().optional(),
  hasForeignTemporaryEmployees: z.string().optional(),
  foreignMaleTemporaryEmployees: z.number().optional(),
  foreignFemaleTemporaryEmployees: z.number().optional(),

  // Aquaculture Information
  aquacultureWardNo: z.number().optional(),
  pondCount: z.number().optional(),
  pondArea: z.number().optional(),
  fishProduction: z.number().optional(),
  fingerlingNumber: z.number().optional(),
  totalInvestment: z.number().optional(),
  annualIncome: z.number().optional(),
  employmentCount: z.number().optional(),

  // Apiculture Information
  apicultureWardNo: z.number().optional(),
  hiveCount: z.number().optional(),
  honeyProduction: z.number().optional(),
  hasApiculture: z.string().optional(),
});

export const updateBusinessSchema = createBusinessSchema.extend({
  id: z.string().min(1, "Business ID is required"),
}).partial();

export type CreateBusinessInput = z.infer<typeof createBusinessSchema>;
export type UpdateBusinessInput = z.infer<typeof updateBusinessSchema>;
