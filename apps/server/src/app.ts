import fastify from 'fastify'
import cors from 'fastify-cors'
import { container } from './container'
const app = fastify()
  .register(cors, {
    origin: '*',
  })
  .get('/', (req, res) => {
    console.log('hello')
    res.send('hello')
  })
  .post('/state', async (req, res) => {
    console.log('state')
    const result = await container.cradle.setState(req.body as any)

    res.send(result)
  })
  .get('/channels', async (req, res) => {
    console.log('channels')
    const result = await container.cradle.getChannels(
      req.query.channel1,
      req.query.channel2,
    )

    res.send(result)
  })

export { app }
