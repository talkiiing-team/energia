import { defineStore } from 'pinia'

export const authStore = defineStore('circuit', () => {
  const authorize = (token: string) => {
    // cookies.set('energiatoken', token)
    document.cookie = 'energiatoken=' + token
  }

  return {
    authorize,
  }
})
