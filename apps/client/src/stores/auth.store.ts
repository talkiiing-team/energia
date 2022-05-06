import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'


const BASE_URL = import.meta.env.PROD ? '' : `${window.location.protocol}//${window.location.hostname}:3030`


export const authStore = defineStore('auth', () => {


  const token = ref(localStorage.getItem('token'))

  axios.defaults.headers.common['authorization'] = token.value ?? ''

  watch(token, async (val) => {
    console.log('token changed')
    localStorage.setItem('token', val ?? '')
    axios.defaults.headers.common['authorization'] = val ?? ''

    try {
      await axios.get(`${BASE_URL}/auth`)
      isAuthorized.value = true
    } catch (e) {
      console.log('неправильна(')
    }
  })

  const isAuthorized = ref(!!token)

  axios.interceptors.response.use((response) => {
    return response;
  }, (err) => {
    if (err.response.status === 401) {
      console.log('неправильна(')
      isAuthorized.value = false
    }
    return err
  })

  return {
    token,
    isAuthorized,
  }
})
