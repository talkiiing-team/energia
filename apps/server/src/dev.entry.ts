import { INITIAL_STATE } from '@energia/common'
import { app } from './app'
import { container } from './container'

container.cradle.port.open(err => {
  if (err) {
    console.log(err)
  } else {
    container.cradle.atService
      .sendAtCommand('ate1')
      .then(() => container.cradle.setState(INITIAL_STATE))
      .then(() => {
        app.listen(container.cradle.serverPort, '0.0.0.0', () => {
          console.log(
            'Backend listening on http://localhost:' +
              container.cradle.serverPort,
          )
        })
      })
  }
})
