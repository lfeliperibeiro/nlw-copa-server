import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'email@email.com',
      avatarUrl: 'https://github.com/lfeliperib.png',
    },
  })

  const poll = await prisma.poll.create({
    data: {
      title: 'Example Poll',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T23:21:34.538Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-05T23:21:34.538Z',
      firstTeamCountryCode: 'AR',
      secondTeamCountryCode: 'BR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 4,

          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              },
            },
          },
        },
      },
    },
  })
}

main()
