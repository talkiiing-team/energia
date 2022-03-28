import fastify from 'fastify'

const app = fastify()

app.get('/', (req, res) => {
  res.send('hello')
})

export { app }
