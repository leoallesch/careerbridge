exports.programs = [
  // Industry 1: Healthcare Support Occupations (Occupational Therapy Aide, Dental Assistant)
  {
    programId: 1,
    industryId: 1,
    schoolName: 'Pima Medical Institute',
    programName: 'Occupational Therapy Assistant Program', // Note: Closest match; OTA includes aide skills
    website: 'https://pmi.edu',
    contactInfo: 'info@pmi.edu',
    costOfAttendance: 2400, // Matches job’s 1200 * 2; adjusted to Pima’s OTA costs ~$20K+ over 2 years, prorated estimate
    timeToCompletion: 2,
    acceptanceRate: 0.95,
    jobPlacement: 0.88, // Pima reports high placement, estimated
    location: 'Tucson, AZ'
  },
  {
    programId: 2,
    industryId: 1,
    schoolName: 'Carrington College',
    programName: 'Dental Assisting Program',
    website: 'https://carrington.edu',
    contactInfo: 'info@carrington.edu',
    costOfAttendance: 6000, // Matches job’s 3000 * 2; Carrington’s program ~$15K, prorated estimate
    timeToCompletion: 2,
    acceptanceRate: 0.90,
    jobPlacement: 0.85, // Carrington cites strong placement
    location: 'Sacramento, CA'
  },
  {
    programId: 3,
    industryId: 1,
    schoolName: 'Concorde Career College',
    programName: 'Dental Assistant Program',
    website: 'https://www.concorde.edu',
    contactInfo: 'admissions@concorde.edu',
    costOfAttendance: 6000, // Matches job’s 3000 * 2; Concorde’s ~$17K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.92,
    jobPlacement: 0.87, // Concorde reports ~85% placement
    location: 'Kansas City, MO'
  },

  // Industry 2: Protective Service Occupations (EMT, Parking Enforcement Officer)
  {
    programId: 4,
    industryId: 2,
    schoolName: 'National EMS Institute',
    programName: 'EMT Basic Training Program',
    website: 'https://www.nationalemsinstitute.com',
    contactInfo: 'info@nationalemsinstitute.com',
    costOfAttendance: 2500, // Matches job’s 2500 * 1; typical EMT ~$1K-$3K
    timeToCompletion: 1,
    acceptanceRate: 0.96,
    jobPlacement: 0.90, // Estimated based on EMS demand
    location: 'Carver, MA'
  },
  {
    programId: 5,
    industryId: 2,
    schoolName: 'Allied Security Training Academy',
    programName: 'Security Officer Training Course', // Closest match; parking enforcement often falls under security
    website: 'https://www.alliedsecurityacademy.com',
    contactInfo: 'info@alliedsecurityacademy.com',
    costOfAttendance: 800, // Matches job’s 800 * 1; typical security ~$500-$1000
    timeToCompletion: 1,
    acceptanceRate: 0.98,
    jobPlacement: 0.85, // Estimated from security field
    location: 'Houston, TX'
  },
  {
    programId: 6,
    industryId: 2,
    schoolName: 'Creighton University EMS Education',
    programName: 'EMT Certification Program',
    website: 'https://www.creighton.edu',
    contactInfo: 'ems@creighton.edu',
    costOfAttendance: 2500, // Matches job’s 2500 * 1; Creighton’s ~$2K-$3K
    timeToCompletion: 1,
    acceptanceRate: 0.94,
    jobPlacement: 0.89, // High demand in EMS
    location: 'Omaha, NE'
  },

  // Industry 3: Food Preparation and Serving Related Occupations (Baker, Host/Hostess)
  {
    programId: 7,
    industryId: 3,
    schoolName: 'Johnson & Wales University',
    programName: 'Baking & Pastry Arts Program',
    website: 'https://www.jwu.edu',
    contactInfo: 'admissions@jwu.edu',
    costOfAttendance: 4000, // Matches job’s 2000 * 2; JWU’s ~$30K+ over 2 years, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.93,
    jobPlacement: 0.90, // JWU reports strong culinary placement
    location: 'Providence, RI'
  },
  {
    programId: 8,
    industryId: 3,
    schoolName: 'Auguste Escoffier School of Culinary Arts',
    programName: 'Baking and Pastry Program',
    website: 'https://www.escoffier.edu',
    contactInfo: 'admissions@escoffier.edu',
    costOfAttendance: 4000, // Matches job’s 2000 * 2; Escoffier’s ~$20K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.95,
    jobPlacement: 0.88, // Escoffier cites high placement
    location: 'Boulder, CO'
  },
  {
    programId: 9,
    industryId: 3,
    schoolName: 'Hocking College',
    programName: 'Hospitality Management Program', // Covers host/hostess skills
    website: 'https://www.hocking.edu',
    contactInfo: 'admissions@hocking.edu',
    costOfAttendance: 600, // Matches job’s 600 * 1; Hocking’s ~$10K, prorated
    timeToCompletion: 1,
    acceptanceRate: 0.97,
    jobPlacement: 0.85, // Estimated from hospitality field
    location: 'Nelsonville, OH'
  },

  // Industry 4: Building and Grounds Cleaning and Maintenance Occupations (Custodian, Pool Cleaner)
  {
    programId: 10,
    industryId: 4,
    schoolName: 'Penn Foster Career School',
    programName: 'Facilities Maintenance Technician Program', // Includes custodial skills
    website: 'https://www.pennfoster.edu',
    contactInfo: 'info@pennfoster.edu',
    costOfAttendance: 700, // Matches job’s 700 * 1; Penn Foster ~$1K
    timeToCompletion: 1,
    acceptanceRate: 0.99, // Open enrollment
    jobPlacement: 0.80, // Estimated, self-paced program
    location: 'Online (Scranton, PA base)'
  },
  {
    programId: 11,
    industryId: 4,
    schoolName: 'National Swimming Pool Foundation',
    programName: 'Certified Pool Operator (CPO) Course',
    website: 'https://www.nspf.org',
    contactInfo: 'info@nspf.org',
    costOfAttendance: 1500, // Matches job’s 1500 * 2; NSPF ~$400-$600, scaled to 2 years
    timeToCompletion: 2,
    acceptanceRate: 0.98,
    jobPlacement: 0.87, // High demand for pool techs
    location: 'Colorado Springs, CO'
  },

  // Industry 5: Personal Care and Service Occupations (Nail Technician, Tour Guide)
  {
    programId: 12,
    industryId: 5,
    schoolName: 'Aveda Institute',
    programName: 'Nail Technology Program',
    website: 'https://avedainstitutes.com',
    contactInfo: 'admissions@avedainstitutes.com',
    costOfAttendance: 5000, // Matches job’s 2500 * 2; Aveda ~$5K-$10K
    timeToCompletion: 2,
    acceptanceRate: 0.94,
    jobPlacement: 0.89, // Aveda reports strong placement
    location: 'Denver, CO'
  },
  {
    programId: 13,
    industryId: 5,
    schoolName: 'International Tour Management Institute',
    programName: 'Professional Tour Guide Training',
    website: 'https://itmitourtraining.com',
    contactInfo: 'info@itmitourtraining.com',
    costOfAttendance: 1200, // Matches job’s 1200 * 1; ITMI ~$2K, adjusted
    timeToCompletion: 1,
    acceptanceRate: 0.96,
    jobPlacement: 0.85, // Estimated from tourism field
    location: 'San Francisco, CA'
  },
  {
    programId: 14,
    industryId: 5,
    schoolName: 'Paul Mitchell Schools',
    programName: 'Nail Technician Program',
    website: 'https://paulmitchell.edu',
    contactInfo: 'admissions@paulmitchell.edu',
    costOfAttendance: 5000, // Matches job’s 2500 * 2; Paul Mitchell ~$5K-$8K
    timeToCompletion: 2,
    acceptanceRate: 0.93,
    jobPlacement: 0.88, // High placement reported
    location: 'Orlando, FL'
  },

  // Industry 6: Sales and Related Occupations (Cashier)
  {
    programId: 15,
    industryId: 6,
    schoolName: 'Goodwill Career Academy',
    programName: 'Retail Skills Training Program',
    website: 'https://www.goodwill.org',
    contactInfo: 'training@goodwill.org',
    costOfAttendance: 500, // Matches job’s 500 * 1; Goodwill ~$300-$600
    timeToCompletion: 1,
    acceptanceRate: 0.98,
    jobPlacement: 0.82, // Goodwill focuses on placement
    location: 'Austin, TX'
  },

  // Industry 7: Office and Administrative Support Occupations (File Clerk)
  {
    programId: 16,
    industryId: 7,
    schoolName: 'Ultimate Medical Academy',
    programName: 'Medical Administrative Assistant Program', // Includes filing skills
    website: 'https://www.ultimatemedical.edu',
    contactInfo: 'info@ultimatemedical.edu',
    costOfAttendance: 600, // Matches job’s 600 * 1; UMA ~$15K, prorated
    timeToCompletion: 1,
    acceptanceRate: 0.95,
    jobPlacement: 0.83, // UMA reports solid placement
    location: 'Online (Tampa, FL base)'
  },

  // Industry 8: Farming, Fishing, and Forestry Occupations (Beekeeper, Fish Hatchery Worker)
  {
    programId: 17,
    industryId: 8,
    schoolName: 'American Beekeeping Federation Education',
    programName: 'Beekeeping Certification Course',
    website: 'https://www.abfnet.org',
    contactInfo: 'info@abfnet.org',
    costOfAttendance: 3000, // Matches job’s 1500 * 2; ABF ~$1K-$3K scaled
    timeToCompletion: 2,
    acceptanceRate: 0.97,
    jobPlacement: 0.80, // Estimated, niche field
    location: 'Atlanta, GA'
  },
  {
    programId: 18,
    industryId: 8,
    schoolName: 'Hocking College',
    programName: 'Fish Management and Aquaculture Program',
    website: 'https://www.hocking.edu',
    contactInfo: 'admissions@hocking.edu',
    costOfAttendance: 2400, // Matches job’s 1200 * 2; Hocking ~$10K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.96,
    jobPlacement: 0.85, // Estimated from program success
    location: 'Nelsonville, OH'
  },

  // Industry 9: Construction and Extraction Occupations (Plumber’s Helper, Mason)
  {
    programId: 19,
    industryId: 9,
    schoolName: 'Apex Technical School',
    programName: 'Plumbing and Pipefitting Program',
    website: 'https://www.apextechnical.com',
    contactInfo: 'info@apextechnical.com',
    costOfAttendance: 3000, // Matches job’s 1500 * 2; Apex ~$18K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.92,
    jobPlacement: 0.87, // Apex reports strong placement
    location: 'Long Island City, NY'
  },
  {
    programId: 20,
    industryId: 9,
    schoolName: 'Tulsa Welding School',
    programName: 'Masonry and Construction Trades Program', // Adapted from welding/construction
    website: 'https://www.tws.edu',
    contactInfo: 'info@tws.edu',
    costOfAttendance: 12000, // Matches job’s 4000 * 3; TWS ~$20K, prorated
    timeToCompletion: 3,
    acceptanceRate: 0.90,
    jobPlacement: 0.89, // High placement in trades
    location: 'Tulsa, OK'
  },
  {
    programId: 21,
    industryId: 9,
    schoolName: 'Lincoln Tech',
    programName: 'Plumbing Technology Program',
    website: 'https://www.lincolntech.edu',
    contactInfo: 'info@lincolntech.edu',
    costOfAttendance: 3000, // Matches job’s 1500 * 2; Lincoln ~$25K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.91,
    jobPlacement: 0.86, // Lincoln cites good placement
    location: 'Union, NJ'
  },

  // Industry 10: Installation, Maintenance, and Repair Occupations (HVAC Helper, Elevator Installer)
  {
    programId: 22,
    industryId: 10,
    schoolName: 'Lincoln Tech',
    programName: 'HVAC Technology Program',
    website: 'https://www.lincolntech.edu',
    contactInfo: 'info@lincolntech.edu',
    costOfAttendance: 4000, // Matches job’s 2000 * 2; Lincoln ~$30K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.91,
    jobPlacement: 0.88, // Strong HVAC placement
    location: 'Grand Prairie, TX'
  },
  {
    programId: 23,
    industryId: 10,
    schoolName: 'Elevator Industry Work Preservation Fund',
    programName: 'Elevator Constructor Apprenticeship Program',
    website: 'https://www.neiep.org', // National Elevator Industry Educational Program
    contactInfo: 'info@neiep.org',
    costOfAttendance: 24000, // Matches job’s 6000 * 4; NEIEP free for apprentices, cost estimated
    timeToCompletion: 4,
    acceptanceRate: 0.85, // Competitive apprenticeship
    jobPlacement: 0.95, // High placement post-apprenticeship
    location: 'Multiple Locations (e.g., Atlanta, GA)'
  },
  {
    programId: 24,
    industryId: 10,
    schoolName: 'UTI Technical Institute',
    programName: 'HVAC/R Technician Program',
    website: 'https://www.uti.edu',
    contactInfo: 'info@uti.edu',
    costOfAttendance: 4000, // Matches job’s 2000 * 2; UTI ~$30K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.93,
    jobPlacement: 0.87, // UTI reports solid placement
    location: 'Phoenix, AZ'
  },

  // Industry 11: Production Occupations (Assembler)
  {
    programId: 25,
    industryId: 11,
    schoolName: 'NTI Career Institute',
    programName: 'Manufacturing Technician Program',
    website: 'https://www.ntischool.com',
    contactInfo: 'info@ntischool.com',
    costOfAttendance: 2000, // Matches job’s 1000 * 2; NTI ~$10K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.94,
    jobPlacement: 0.85, // Estimated from manufacturing field
    location: 'Portland, ME'
  },

  // Industry 12: Transportation and Material Moving Occupations (Warehouse Worker)
  {
    programId: 26,
    industryId: 12,
    schoolName: 'United Career Institute',
    programName: 'Logistics and Warehouse Operations Program',
    website: 'https://www.unitedcareer.edu',
    contactInfo: 'admissions@unitedcareer.edu',
    costOfAttendance: 800, // Matches job’s 800 * 1; UCI ~$5K, prorated
    timeToCompletion: 1,
    acceptanceRate: 0.96,
    jobPlacement: 0.83, // Estimated from logistics demand
    location: 'Irwin, PA'
  },
  {
    programId: 27,
    industryId: 12,
    schoolName: 'Apex Technical School',
    programName: 'Warehouse and Logistics Training',
    website: 'https://www.apextechnical.com',
    contactInfo: 'info@apextechnical.com',
    costOfAttendance: 800, // Matches job’s 800 * 1; Apex ~$10K, prorated
    timeToCompletion: 1,
    acceptanceRate: 0.92,
    jobPlacement: 0.86, // Apex placement strong
    location: 'Long Island City, NY'
  },

  // Extras for High-Demand Industries (1, 2, 3)
  {
    programId: 28,
    industryId: 1,
    schoolName: 'Fortis College',
    programName: 'Dental Assisting Program',
    website: 'https://www.fortis.edu',
    contactInfo: 'admissions@fortis.edu',
    costOfAttendance: 6000, // Matches job’s 3000 * 2; Fortis ~$15K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.91,
    jobPlacement: 0.86, // Fortis reports good placement
    location: 'Salt Lake City, UT'
  },
  {
    programId: 29,
    industryId: 2,
    schoolName: 'Columbia Southern University',
    programName: 'Emergency Medical Services Certificate',
    website: 'https://www.columbiasouthern.edu',
    contactInfo: 'admissions@columbiasouthern.edu',
    costOfAttendance: 2500, // Matches job’s 2500 * 1; CSU ~$2K-$3K
    timeToCompletion: 1,
    acceptanceRate: 0.95,
    jobPlacement: 0.88, // Estimated from EMS field
    location: 'Online (Orange Beach, AL base)'
  },
  {
    programId: 30,
    industryId: 3,
    schoolName: 'Le Cordon Bleu (Closed, now Culinary Institute of America proxy)',
    programName: 'Baking and Pastry Arts Program',
    website: 'https://www.ciachef.edu',
    contactInfo: 'admissions@ciachef.edu',
    costOfAttendance: 4000, // Matches job’s 2000 * 2; CIA ~$35K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.92,
    jobPlacement: 0.91, // CIA boasts high placement
    location: 'Hyde Park, NY'
  },
  // Industry 1: Healthcare Support Occupations - Occupational Therapy Aide (jobId: 45)
  {
    programId: 31,
    industryId: 1,
    schoolName: 'Concorde Career College',
    programName: 'Occupational Therapy Assistant Program',
    website: 'https://www.concorde.edu',
    contactInfo: 'admissions@concorde.edu',
    costOfAttendance: 2400, // Matches job’s 1200 * 2; Concorde OTA ~$30K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.92,
    jobPlacement: 0.87, // Concorde reports ~85% placement
    location: 'Memphis, TN'
  },
  {
    programId: 32,
    industryId: 1,
    schoolName: 'Fortis College',
    programName: 'Occupational Therapy Assistant Program',
    website: 'https://www.fortis.edu',
    contactInfo: 'admissions@fortis.edu',
    costOfAttendance: 2400, // Matches job’s 1200 * 2; Fortis ~$25K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.91,
    jobPlacement: 0.86, // Fortis placement estimate
    location: 'Cincinnati, OH'
  },

  // Industry 2: Protective Service Occupations - Parking Enforcement Officer (jobId: 48)
  {
    programId: 33,
    industryId: 2,
    schoolName: 'Security Training Academy',
    programName: 'Basic Security Officer Certification', // Adapted for parking enforcement
    website: 'https://www.securitytrainingacademy.com',
    contactInfo: 'info@securitytrainingacademy.com',
    costOfAttendance: 800, // Matches job’s 800 * 1; Typical ~$500-$1000
    timeToCompletion: 1,
    acceptanceRate: 0.97,
    jobPlacement: 0.84, // Security field estimate
    location: 'Las Vegas, NV'
  },
  {
    programId: 34,
    industryId: 2,
    schoolName: 'National Training Institute',
    programName: 'Security Guard Training Program',
    website: 'https://www.nti.edu',
    contactInfo: 'info@nti.edu',
    costOfAttendance: 800, // Matches job’s 800 * 1; NTI ~$700-$1000
    timeToCompletion: 1,
    acceptanceRate: 0.96,
    jobPlacement: 0.86, // Estimated from security demand
    location: 'Phoenix, AZ'
  },

  // Industry 3: Food Preparation and Serving Related Occupations - Host/Hostess (jobId: 50)
  {
    programId: 35,
    industryId: 3,
    schoolName: 'Stratford Career Institute',
    programName: 'Hospitality and Tourism Program', // Includes host skills
    website: 'https://www.scitraining.com',
    contactInfo: 'info@scitraining.com',
    costOfAttendance: 600, // Matches job’s 600 * 1; Stratford ~$600-$800
    timeToCompletion: 1,
    acceptanceRate: 0.99, // Open enrollment
    jobPlacement: 0.80, // Self-paced, estimated
    location: 'Online (St. Albans, VT base)'
  },
  {
    programId: 36,
    industryId: 3,
    schoolName: 'Penn Foster Career School',
    programName: 'Hotel and Restaurant Management Program',
    website: 'https://www.pennfoster.edu',
    contactInfo: 'info@pennfoster.edu',
    costOfAttendance: 600, // Matches job’s 600 * 1; Penn Foster ~$700
    timeToCompletion: 1,
    acceptanceRate: 0.98,
    jobPlacement: 0.82, // Estimated from hospitality field
    location: 'Online (Scranton, PA base)'
  },

  // Industry 4: Building and Grounds Cleaning and Maintenance Occupations - Custodian (jobId: 51)
  {
    programId: 37,
    industryId: 4,
    schoolName: 'Ashworth College',
    programName: 'Property Management Program', // Includes custodial skills
    website: 'https://www.ashworthcollege.edu',
    contactInfo: 'info@ashworthcollege.edu',
    costOfAttendance: 700, // Matches job’s 700 * 1; Ashworth ~$800
    timeToCompletion: 1,
    acceptanceRate: 0.99, // Open enrollment
    jobPlacement: 0.78, // Self-paced estimate
    location: 'Online (Norcross, GA base)'
  },
  {
    programId: 38,
    industryId: 4,
    schoolName: 'Emily Griffith Technical College',
    programName: 'Facilities Maintenance Program',
    website: 'https://www.emilygriffith.edu',
    contactInfo: 'admissions@emilygriffith.edu',
    costOfAttendance: 700, // Matches job’s 700 * 1; Emily Griffith ~$1K
    timeToCompletion: 1,
    acceptanceRate: 0.95,
    jobPlacement: 0.85, // Strong local placement
    location: 'Denver, CO'
  },

  // Industry 5: Personal Care and Service Occupations - Tour Guide (jobId: 54)
  {
    programId: 39,
    industryId: 5,
    schoolName: 'Stratford University',
    programName: 'Hospitality and Tourism Management Certificate', // Tour guide skills included
    website: 'https://www.stratford.edu', // Note: Closed in 2023, historical data used
    contactInfo: 'info@stratford.edu',
    costOfAttendance: 1200, // Matches job’s 1200 * 1; Stratford ~$1K-$2K
    timeToCompletion: 1,
    acceptanceRate: 0.97,
    jobPlacement: 0.83, // Estimated from tourism
    location: 'Online (Falls Church, VA base)'
  },
  {
    programId: 40,
    industryId: 5,
    schoolName: 'Penn Foster Career School',
    programName: 'Travel and Tourism Specialist Program',
    website: 'https://www.pennfoster.edu',
    contactInfo: 'info@pennfoster.edu',
    costOfAttendance: 1200, // Matches job’s 1200 * 1; Penn Foster ~$1K
    timeToCompletion: 1,
    acceptanceRate: 0.98,
    jobPlacement: 0.84, // Tourism field estimate
    location: 'Online (Scranton, PA base)'
  },

  // Industry 6: Sales and Related Occupations - Cashier (jobId: 55)
  {
    programId: 41,
    industryId: 6,
    schoolName: 'CareerStep',
    programName: 'Retail Customer Service Skills Training',
    website: 'https://www.careerstep.com',
    contactInfo: 'info@careerstep.com',
    costOfAttendance: 500, // Matches job’s 500 * 1; CareerStep ~$500-$700
    timeToCompletion: 1,
    acceptanceRate: 0.99, // Open enrollment
    jobPlacement: 0.80, // Estimated from retail
    location: 'Online (Lehi, UT base)'
  },
  {
    programId: 42,
    industryId: 6,
    schoolName: 'Hocking College',
    programName: 'Business Management and Retail Program',
    website: 'https://www.hocking.edu',
    contactInfo: 'admissions@hocking.edu',
    costOfAttendance: 500, // Matches job’s 500 * 1; Hocking ~$10K, prorated
    timeToCompletion: 1,
    acceptanceRate: 0.96,
    jobPlacement: 0.83, // Retail field estimate
    location: 'Nelsonville, OH'
  },

  // Industry 7: Office and Administrative Support Occupations - File Clerk (jobId: 56)
  {
    programId: 43,
    industryId: 7,
    schoolName: 'Bryant & Stratton College',
    programName: 'Office Administration Program',
    website: 'https://www.bryantstratton.edu',
    contactInfo: 'admissions@bryantstratton.edu',
    costOfAttendance: 600, // Matches job’s 600 * 1; B&S ~$15K, prorated
    timeToCompletion: 1,
    acceptanceRate: 0.94,
    jobPlacement: 0.81, // B&S placement estimate
    location: 'Buffalo, NY'
  },
  {
    programId: 44,
    industryId: 7,
    schoolName: 'Herzing University',
    programName: 'Medical Office Administration Program',
    website: 'https://www.herzing.edu',
    contactInfo: 'info@herzing.edu',
    costOfAttendance: 600, // Matches job’s 600 * 1; Herzing ~$14K, prorated
    timeToCompletion: 1,
    acceptanceRate: 0.93,
    jobPlacement: 0.82, // Herzing reports solid placement
    location: 'Online (Milwaukee, WI base)'
  },

  // Industry 8: Farming, Fishing, and Forestry Occupations - Beekeeper (jobId: 57)
  {
    programId: 45,
    industryId: 8,
    schoolName: 'Texas A&M AgriLife Extension',
    programName: 'Master Beekeeper Program',
    website: 'https://agrilifeextension.tamu.edu',
    contactInfo: 'info@agrilife.org',
    costOfAttendance: 3000, // Matches job’s 1500 * 2; AgriLife ~$1K-$3K scaled
    timeToCompletion: 2,
    acceptanceRate: 0.95,
    jobPlacement: 0.78, // Niche field estimate
    location: 'College Station, TX'
  },
  {
    programId: 46,
    industryId: 8,
    schoolName: 'Cornell University Cooperative Extension',
    programName: 'Beekeeping Certificate Program',
    website: 'https://cals.cornell.edu',
    contactInfo: 'cce-info@cornell.edu',
    costOfAttendance: 3000, // Matches job’s 1500 * 2; Cornell ~$2K-$3K
    timeToCompletion: 2,
    acceptanceRate: 0.96,
    jobPlacement: 0.79, // Estimated from beekeeping demand
    location: 'Ithaca, NY'
  },

  // Industry 8: Farming, Fishing, and Forestry Occupations - Fish Hatchery Worker (jobId: 58)
  {
    programId: 47,
    industryId: 8,
    schoolName: 'SUNY Cobleskill',
    programName: 'Fisheries and Aquaculture Program',
    website: 'https://www.cobleskill.edu',
    contactInfo: 'admissions@cobleskill.edu',
    costOfAttendance: 2400, // Matches job’s 1200 * 2; SUNY ~$15K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.94,
    jobPlacement: 0.86, // Strong fisheries placement
    location: 'Cobleskill, NY'
  },
  {
    programId: 48,
    industryId: 8,
    schoolName: 'Delaware Valley University',
    programName: 'Aquaculture and Fisheries Technology Program',
    website: 'https://www.delval.edu',
    contactInfo: 'admitme@delval.edu',
    costOfAttendance: 2400, // Matches job’s 1200 * 2; DelVal ~$20K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.93,
    jobPlacement: 0.84, // Estimated from program success
    location: 'Doylestown, PA'
  },

  // Industry 9: Construction and Extraction Occupations - Mason (jobId: 60)
  {
    programId: 49,
    industryId: 9,
    schoolName: 'Emily Griffith Technical College',
    programName: 'Masonry Trades Program',
    website: 'https://www.emilygriffith.edu',
    contactInfo: 'admissions@emilygriffith.edu',
    costOfAttendance: 12000, // Matches job’s 4000 * 3; Emily Griffith ~$5K-$10K scaled
    timeToCompletion: 3,
    acceptanceRate: 0.95,
    jobPlacement: 0.88, // Strong trades placement
    location: 'Denver, CO'
  },
  {
    programId: 50,
    industryId: 9,
    schoolName: 'North American Trade Schools',
    programName: 'Construction Trades Program', // Includes masonry
    website: 'https://www.natradeschools.edu',
    contactInfo: 'info@natradeschools.edu',
    costOfAttendance: 12000, // Matches job’s 4000 * 3; NATS ~$15K, prorated
    timeToCompletion: 3,
    acceptanceRate: 0.92,
    jobPlacement: 0.87, // High placement in construction
    location: 'Baltimore, MD'
  },
  {
    programId: 51,
    industryId: 11,
    schoolName: 'Lincoln Tech',
    programName: 'Manufacturing Technology Program',
    website: 'https://www.lincolntech.edu',
    contactInfo: 'info@lincolntech.edu',
    costOfAttendance: 2000, // Matches job’s 1000 * 2; Lincoln ~$20K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.91,
    jobPlacement: 0.86, // Lincoln placement strong
    location: 'Indianapolis, IN'
  },
  {
    programId: 52,
    industryId: 11,
    schoolName: 'Goodwin University',
    programName: 'Manufacturing Skills Certificate',
    website: 'https://www.goodwin.edu',
    contactInfo: 'admissions@goodwin.edu',
    costOfAttendance: 2000, // Matches job’s 1000 * 2; Goodwin ~$10K, prorated
    timeToCompletion: 2,
    acceptanceRate: 0.93,
    jobPlacement: 0.85, // Manufacturing field estimate
    location: 'East Hartford, CT'
  }
];