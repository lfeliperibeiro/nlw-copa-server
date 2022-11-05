import { prisma } from '../lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

export async function pollRoutes(fastify: FastifyInstance) {
  fastify.get('/poll/count', async () => {
    const count = await prisma.poll.count()

    return { count }
  })

  fastify.post('/poll', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
    })
    const { title } = createPollBody.parse(request.body)

    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase()
    await prisma.poll.create({
      data: {
        title,
        code,
      },
    })

    return reply.status(201).send({ code })
  })
}
