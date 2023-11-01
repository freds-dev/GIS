import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import csvtojson from "csvtojson";

const prisma = new PrismaClient();

function printProgress(text: string) {
  if (process.stdout.cursorTo) {
    process.stdout.cursorTo(0);
  }
  process.stdout.write(text);
}

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const playgrounds = await csvtojson({
    delimiter: ";",
  }).fromFile("prisma/spielplaetze.csv");
  let i = 0;
  for await (const playground of playgrounds) {
    i++;
    await prisma.playground.create({
      data: {
        name: playground.Name,
        name2: playground.Name2,
        size: playground.Groesse,
        type: playground.Typ,
        description: playground.Beschreibung,
        area: playground.Bereich,
        ball: playground.Ballspielplatz,
        skater: playground.Skater,
        streetball: playground.Streetball,
        latitude: playground.Latitude,
        longitude: playground.Longitude,
      },
    });
    printProgress(`ℹ️  Imported ${i} of ${playgrounds.length} playgrounds.`);
  }

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
