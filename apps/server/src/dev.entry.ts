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
      .then(res => {
        app.listen(3030, '0.0.0.0', () => {
          console.log('App listening on http://localhost:3030')
        })
      })
  }
})
