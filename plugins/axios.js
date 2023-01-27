export default function ({ $axios, redirect }, inject) {


  const api = $axios.create({
    baseURL: 'https://za-halyavoi.ru/api'
  })

  api.onError(error => {
    if (error.response.status === 404) {
      redirect("/404")
    }
  })

  inject('api', api)
}
