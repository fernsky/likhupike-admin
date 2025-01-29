import { pgTable, text, integer } from "drizzle-orm/pg-core";

const likhupikeIndividual = pgTable("likhupike_individual", {
  id: text("id").primaryKey().notNull(),
  tenantId: text("tenant_id").default("likhupike"),
  parentId: text("parent_id").notNull(),
  wardNo: integer("ward_no").notNull(),
  deviceId: text("device_id"),
  name: text("name").notNull(),
  gender: text("gender").notNull(),
  age: integer("age"),
  familyRole: text("family_role"),
  citizenOf: text("citizen_of"),
  citizenOfOther: text("citizen_of_other"),
  caste: text("caste"),
  casteOther: text("caste_other"),
  ancestorLanguage: text("ancestor_language"),
  ancestorLanguageOther: text("ancestor_language_other"),
  primaryMotherTongue: text("primary_mother_tongue"),
  primaryMotherTongueOther: text("primary_mother_tongue_other"),
  religion: text("religion"),
  religionOther: text("religion_other"),
  maritalStatus: text("marital_status"),
  marriedAge: integer("married_age"),
  hasChronicDisease: text("has_chronic_disease"),
  primaryChronicDisease: text("primary_chronic_disease"),
  isSanitized: text("is_sanitized"),
  isDisabled: text("is_disabled"),
  disabilityType: text("disability_type"),
  disabilityTypeOther: text("disability_type_other"),
  disabilityCause: text("disability_cause"),
  hasBirthCertificate: text("has_birth_certificate"),
  gaveLiveBirth: text("gave_live_birth"),
  aliveSons: integer("alive_sons"),
  aliveDaughters: integer("alive_daughters"),
  totalBornChildren: integer("total_born_children"),
  hasDeadChildren: text("has_dead_children"),
  deadSons: integer("dead_sons"),
  deadDaughters: integer("dead_daughters"),
  totalDeadChildren: integer("total_dead_children"),
  gaveRecentLiveBirth: text("gave_recent_live_birth"),
  recentBornSons: integer("recent_born_sons"),
  recentBornDaughters: integer("recent_born_daughters"),
  totalRecentChildren: integer("total_recent_children"),
  recentDeliveryLocation: text("recent_delivery_location"),
  prenatalCheckups: integer("prenatal_checkups"),
  firstDeliveryAge: integer("first_delivery_age"),
  isPresent: text("is_present"),
  absenteeAge: integer("absentee_age"),
  absenteeEducationalLevel: text("absentee_educational_level"),
  absenceReason: text("absence_reason"),
  absenteeLocation: text("absentee_location"),
  absenteeProvince: text("absentee_province"),
  absenteeDistrict: text("absentee_district"),
  absenteeCountry: text("absentee_country"),
  absenteeHasSentCash: text("absentee_has_sent_cash"),
  absenteeCashAmount: integer("absentee_cash_amount"),
  literacyStatus: text("literacy_status"),
  schoolPresenceStatus: text("school_presence_status"),
  educationalLevel: text("educational_level"),
  primarySubject: text("primary_subject"),
  goesSchool: text("goes_school"),
  schoolBarrier: text("school_barrier"),
  hasTraining: text("has_training"),
  training: text("training"),
  monthsTrained: integer("months_trained"),
  primarySkill: text("primary_skill"),
  hasInternetAccess: text("has_internet_access"),
  financialWorkDuration: text("financial_work_duration"),
  primaryOccupation: text("primary_occupation"),
  workBarrier: text("work_barrier"),
  workAvailability: text("work_availability"),
});

export default likhupikeIndividual;

export type Individual = typeof likhupikeIndividual.$inferSelect;
export type IndividualUpdate = typeof likhupikeIndividual.$inferInsert;
