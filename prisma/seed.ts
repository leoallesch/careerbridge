const {PrismaClient}=require('@prisma/client');
const {industries}=require('./data/industries');
const {interests}=require('./data/interests');
const {jobs}=require('./data/jobs');
const {programs}=require('./data/programs');

const prisma=new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.userSavedIndustry.deleteMany();
  await prisma.userSavedInterest.deleteMany();
  await prisma.userSavedProgram.deleteMany();
  await prisma.userSavedJob.deleteMany();
  await prisma.interest.deleteMany();
  await prisma.program.deleteMany();
  await prisma.job.deleteMany();
  await prisma.industry.deleteMany();

  // Seed data
  await prisma.industry.createMany({data: industries});
  await prisma.interest.createMany({data: interests});
  await prisma.job.createMany({data: jobs});
  await prisma.program.createMany({data: programs});

  console.log('Database seeded successfully with skilled trades data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });