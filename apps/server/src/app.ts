import fastify from 'fastify'
import { container } from './container'
import express from 'express'
import cors from 'cors'
import queue from 'express-queue'
const app = express()
  .use(express.json())
  .use(
    cors({
      origin: '*',
    }),
  )
  .get('/', (req, res) => {
    console.log('hello')
    res.send('hello')
  })
  .use(queue({ activeLimit: 1, queuedLimit: -1 }))
  .post('/state', async (req, res) => {
    console.log('state')
    const result = await container.cradle.setState(req.body as any)

    res.json(result)
  })
  .get('/channels', async (req, res) => {
    console.log('channels')
    const result = await container.cradle.getChannels(
      req.query.channel1,
      req.query.channel2,
    )

    res.json(result)
  })

export { app }
