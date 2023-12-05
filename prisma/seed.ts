/* eslint-disable @typescript-eslint/no-empty-function */
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
  //* cleanup the existing database (if any)
  await prisma.playground.deleteMany({}).catch(() => {});

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

  // create 31 more random users
  for (let i = 0; i < 31; i++) {
    const email = `
      ${Math.random().toString(36).substring(2, 15)}@${Math.random()
        .toString(36)
        .substring(2, 15)}.com
    `;
    const hashedPassword = await bcrypt.hash("racheliscool", 10);
    await prisma.user.create({
      data: {
        email,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
      },
    });
  }

  console.log("User created.", user);

  const playgrounds = await csvtojson({
    delimiter: ";",
  }).fromFile("prisma/spielplaetze.csv");
  let i = 0;
  for await (const playground of playgrounds) {
    i++;
    const isBall = playground.Ballspielplatz !== "" ? true : false;
    const isSkater = playground.Skater !== "" ? true : false;
    const isStreetball = playground.Streetball !== "" ? true : false;
    const createdPlayground = await prisma.playground.create({
      data: {
        name: playground.Name.substring(3),
        name2: playground.Name2,
        size: playground.Groesse,
        type: playground.Typ,
        description: playground.Beschreibung,
        area: playground.Bereich,
        ball: isBall,
        skater: isSkater,
        streetball: isStreetball,
        // INFO: THIS IS ON PURPOSE - LAT, LONG ARE REVERSED IN THE CSV
        latitude: playground.Longitude,
        longitude: playground.Latitude,
      },
    });

    // create a report for every 5th playground, split them between users and make createdAt random inbetween noe and 5 days ago
    if (i % 5 === 0) {
      const randomUser = await prisma.user.findFirst({
        skip: Math.floor(Math.random() * 32),
      });
      const randomDate = new Date(
        new Date().getTime() -
          Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000,
      );
      await prisma.report.create({
        data: {
          title: "This is a report",
          description: "This is a report description",
          user: {
            connect: {
              id: randomUser?.id,
            },
          },
          playground: {
            connect: {
              id: createdPlayground.id,
            },
          },
          createdAt: randomDate,
        },
      });
    }
    printProgress(`ℹ️  Imported ${i} of ${playgrounds.length} playgrounds.`);
  }

  //line break
  console.log("\n");

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
