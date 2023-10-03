const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Stem Education" },
        { name: "Humanities and Arts" },
        { name: "Social Sciences" },
        { name: "Health Sciences" },
        { name: "Technology and IT" },
        { name: "Environmental Studies" },
        { name: "Education and Pedagogy" },
        { name: "Law and Legal Studies" },
        { name: "Communication and Media" },
        { name: "Economics and Finance" },
        { name: "Science and Technology Ethics" },
      ],
    });
    console.log("Seeded database categories");
  } catch (error) {
    console.error("Failed seeding database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
