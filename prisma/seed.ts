/* eslint-disable @typescript-eslint/no-empty-function */
import { PrismaClient, Status } from "@prisma/client";
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

  // cleanup the existing database (if any)
  await prisma.user.deleteMany({}).catch(() => {});
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

    // create a report, split them between users and make createdAt random inbetween now and 5 days ago also give them a random status (PENDING, IN_PROGRESS, DONE), make some playgrounds have no reports and 
    const randomUser = await prisma.user.findFirst({
      skip: Math.floor(Math.random() * 32),
    });
    const randomDate = new Date(
      new Date().getTime() -
        Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000,
    );
    const randomStatus: Status = ["PENDING", "IN_PROGRESS", "DONE"][
      Math.floor(Math.random() * 3)
    ] as Status;
    await prisma.report.create({
      data: {
        title: "This is a report",
        description: "This is a report description",
        status: randomStatus,
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
    printProgress(`ℹ️  Imported ${i} of ${playgrounds.length} playgrounds.`);
  }

  // now add more random reports, always use the same user for that
  for (let i = 0; i < 1000; i++) {
    const randomPlayground = await prisma.playground.findFirst({
      skip: Math.floor(Math.random() * 100),
    });
    const randomDate = new Date(
      new Date().getTime() -
        Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000,
    );
    const randomStatus: Status = ["PENDING", "IN_PROGRESS", "DONE"][
      Math.floor(Math.random() * 3)
    ] as Status;
    await prisma.report.create({
      data: {
        title: "This is a report",
        description: "This is a report description",
        status: randomStatus,
        user: {
          connect: {
            id: user.id,
          },
        },
        playground: {
          connect: {
            id: randomPlayground?.id,
          },
        },
        createdAt: randomDate,
      },
    });
    printProgress(`ℹ️  Imported ${i} of 1000 random reports.`);
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
