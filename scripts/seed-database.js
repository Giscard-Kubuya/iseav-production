const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create faculties
  const faculty1 = await prisma.faculty.create({
    data: {
      name: 'Faculté des Sciences',
      description: 'Faculté des Sciences et Technologies',
      dean: 'Dr. Ahmed Ben Ali'
    }
  })

  // Create departments
  const department1 = await prisma.department.create({
    data: {
      name: 'Informatique',
      description: 'Département d\'Informatique',
      head: 'Dr. Fatma Trabelsi',
      facultyId: faculty1.id
    }
  })

  // Create programs
  await prisma.program.create({
    data: {
      name: 'Licence en Informatique',
      description: 'Programme de licence en informatique sur 3 ans',
      duration: 3,
      credits: 180,
      departmentId: department1.id
    }
  })

  // Create admin user
  await prisma.user.create({
    data: {
      email: 'admin@iseav-aru.tn',
      firstName: 'Admin',
      lastName: 'System',
      role: 'ADMIN',
      password: 'hashed-password' // In real app, hash this
    }
  })

  console.log('Database seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })