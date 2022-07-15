export default function ({ $axios }, inject) {


  const api = $axios.create({
    baseURL: 'https://za-halyavoi.ru/api'
  })

  inject('api', api)
}
