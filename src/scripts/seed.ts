const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient()

async function main() {
  try {
    await database.category.createMany({
      data: [
        {name: "Web Development"},
        {name: "Computer Science"},
        {name: "Photography"},
        {name: "Music"},
        {name: "Engineering"},
        {name: "Accounting"},
        {name: "Fitness"},
        {name: "Trading"},
        {name: "Science"},
        {name: "Mathematics"},
      ]
    })
    console.log("Seeded database categories")
  } catch (error) {
    console.error("Failed seeding database categories",error)
  } finally {
    await database.$disconnect()
  }
}

main()