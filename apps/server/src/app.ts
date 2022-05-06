import fastify from 'fastify'
import { container } from './container'
import { static as serveStatic, json, default as express } from 'express'
import cors from 'cors'
import queue from 'express-queue'
import * as path from 'path'

const { PASSWORD = 'VerySecure' } = process.env

const app = express()
  .use(serveStatic(path.resolve(__dirname, '../dist-client')))
  .use(json())
  .use(
    cors({
      origin: '*',
    }),
  )
  .get('/', (req, res) => {
    console.log('hello')
    res.send('hello')
  })

  .use((req, res, next) => {
    const userPassword = req.headers.authorization

    if (userPassword !== PASSWORD) {
      res.status(401)
      return next(new Error('Not authorized'))
    }

    next()
  })
  // for /state and /channels create a queue
  .use(queue({ activeLimit: 1, queuedLimit: -1 }))
  .post('/state', async (req, res, next) => {
    try {
      console.log('state')
      const result = await container.cradle.setState(req.body as any)

      res.json(result)
    } catch (e) {
      next(e)
    }
  })
  .get('/channels', async (req, res, next) => {
    try {
      console.log('channels')
      const result = await container.cradle.getChannels(
        req.query.channel1,
        req.query.channel2,
      )

      res.json(result)
    } catch (e) {
      next(e)
    }
  })
  .get('/auth', async (req, res, next) => {
    res.json(true)
  })
  .use((err, req, res, next) => {
    res.status(res.statusCode || 500)
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV !== 'production' && err.stack,
    })
  })

export { app }
