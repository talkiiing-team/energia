import { config } from 'dotenv'
import path from 'path'

const output = config({
  path: path.resolve(__dirname, import.meta.env.PROD ? '../.env' : '../../../.env')
})

console.log(output)

import { INITIAL_STATE } from '@energia/common'
import { app } from './app'
import { container } from './container'

const { PORT = '3030' } = process.env

container.cradle.port.open(err => {
  if (err) {
    console.log(err)
  } else {
    container.cradle.atService
      .sendAtCommand('ate1')
      .then(() => container.cradle.setState(INITIAL_STATE))
      .then(res => {
        app.listen(parseInt(PORT), '0.0.0.0', () => {
          console.log('App listening on http://localhost:' + PORT)
        })
      })
  }
})
