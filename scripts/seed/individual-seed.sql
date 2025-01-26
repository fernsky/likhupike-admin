INSERT INTO likhupike_individual (
  id,
  tenant_id,
  parent_id,
  ward_no,
  device_id,
  name,
  gender,
  age,
  family_role,
  citizen_of,
  citizen_of_other,
  caste,
  caste_other,
  ancestor_language,
  ancestor_language_other,
  primary_mother_tongue,
  primary_mother_tongue_other,
  religion,
  religion_other,
  marital_status,
  married_age,
  has_chronic_disease,
  primary_chronic_disease,
  is_sanitized,
  is_disabled,
  disability_type,
  disability_type_other,
  disability_cause,
  has_birth_certificate,
  gave_live_birth,
  alive_sons,
  alive_daughters,
  total_born_children,
  has_dead_children,
  dead_sons,
  dead_daughters,
  total_dead_children,
  gave_recent_live_birth,
  recent_born_sons,
  recent_born_daughters,
  total_recent_children,
  recent_delivery_location,
  prenatal_checkups,
  first_delivery_age,
  is_present,
  absentee_age,
  absentee_educational_level,
  absence_reason,
  absentee_location,
  absentee_province,
  absentee_district,
  absentee_country,
  absentee_has_sent_cash,
  absentee_cash_amount,
  literacy_status,
  school_presence_status,
  educational_level,
  primary_subject,
  goes_school,
  school_barrier,
  has_training,
  training,
  months_trained,
  primary_skill,
  has_internet_access,
  financial_work_duration,
  primary_occupation,
  work_barrier,
  work_availability
) VALUES (
  'ind_01',                    -- id
  'khajura',                   -- tenant_id
  'household_01',              -- parent_id
  5,                          -- ward_no
  'device_123',               -- device_id
  'Ram Bahadur Thapa',        -- name
  'MALE',                     -- gender
  35,                         -- age
  'HEAD',                     -- family_role
  'NEPALI',                   -- citizen_of
  NULL,                       -- citizen_of_other
  'BRAHMIN',                  -- caste
  NULL,                       -- caste_other
  'NEPALI',                   -- ancestor_language
  NULL,                       -- ancestor_language_other
  'NEPALI',                   -- primary_mother_tongue
  NULL,                       -- primary_mother_tongue_other
  'HINDU',                    -- religion
  NULL,                       -- religion_other
  'MARRIED',                  -- marital_status
  25,                         -- married_age
  'NO',                       -- has_chronic_disease
  NULL,                       -- primary_chronic_disease
  'YES',                      -- is_sanitized
  'NO',                       -- is_disabled
  NULL,                       -- disability_type
  NULL,                       -- disability_type_other
  NULL,                       -- disability_cause
  'YES',                      -- has_birth_certificate
  'NO',                       -- gave_live_birth
  2,                          -- alive_sons
  1,                          -- alive_daughters
  3,                          -- total_born_children
  'NO',                       -- has_dead_children
  0,                          -- dead_sons
  0,                          -- dead_daughters
  0,                          -- total_dead_children
  'NO',                       -- gave_recent_live_birth
  0,                          -- recent_born_sons
  0,                          -- recent_born_daughters
  0,                          -- total_recent_children
  NULL,                       -- recent_delivery_location
  NULL,                       -- prenatal_checkups
  NULL,                       -- first_delivery_age
  'YES',                      -- is_present
  NULL,                       -- absentee_age
  NULL,                       -- absentee_educational_level
  NULL,                       -- absence_reason
  NULL,                       -- absentee_location
  NULL,                       -- absentee_province
  NULL,                       -- absentee_district
  NULL,                       -- absentee_country
  NULL,                       -- absentee_has_sent_cash
  NULL,                       -- absentee_cash_amount
  'LITERATE',                 -- literacy_status
  'GRADUATED',                -- school_presence_status
  'BACHELOR',                 -- educational_level
  'MANAGEMENT',               -- primary_subject
  'NO',                       -- goes_school
  NULL,                       -- school_barrier
  'YES',                      -- has_training
  'COMPUTER',                 -- training
  6,                          -- months_trained
  'COMPUTER_OPERATOR',        -- primary_skill
  'YES',                      -- has_internet_access
  'FULL_TIME',               -- financial_work_duration
  'PRIVATE_JOB',             -- primary_occupation
  NULL,                       -- work_barrier
  'EMPLOYED'                  -- work_availability
);
