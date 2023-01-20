<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-8" ref="hot">
      <fa icon="fire" class="text-primary" />
      Горячие скидки
    </h1>

    <div class="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-8 mb-8" >
      <m-vertical-card
        v-for="post in posts"
        :key="post.uin"
        :post="post"
        @like="likePost($event)"
      />
    </div>
    <m-pagination
      v-model="pagination.current_page"
      :pageCount="pagination.total_pages"
       class="flex justify-center mb-10"
    />
    <div class="prose lg:prose-xl prose-stone mb-10 max-w-none">
      <h2>Сайты с промокодами – экономить легко!</h2>
      <p>
        Возможность сэкономить и найти товар или услугу по скидке – это отличный способ спасти бюджет от лишних расходов. Купонные распродажи появились не так давно – в 2008 году появился первый сайт с горячими скидками, и сервис тут же приобрел популярность.
      </p>

      <p>
        Широкий ассортимент продукции и услуг на сайтах с промокодами и скидками позволяет выгодно приобрести бытовую технику, косметику, товары для автомобиля или сада и огорода, а также посетить аквапарки, парки развлечений. На сайтах можно найти купоны, чтобы сделать маникюр или прическу дешевле в несколько раз или полететь всей семьей в отпуск.
      </p>

      <p>
        Для получения скидки иногда необходимо оплатить купон, в других случаях достаточно просто выбрать заинтересовавшее предложение. Купон может предоставлять скидку на услугу или товар при его использовании, либо вообще полностью покрывает стоимость.
      </p>

      <p>
        При выборе купона стоит учитывать, что акции ограничены по времени проведения, купон необходимо использовать до истечения определенного срока. Иногда на акции выставляется ограничение, и каждому посетителю сайта в руки можно получить только один купон.
      </p>

      <p>
        При использовании купона важно обратить внимание, что он может распространяться на определенные часы работы или дни (например, скидки на аквапарки по будним дням), или только на некоторые услуги.
      </p>

      <h2>Преимущества сайтов с промокодами и скидками</h2>
      <p>Система работы сайтов со скидками очень простая, все участники программы имеют свои плюсы:</p>

      <ul>
        <li>выгодные предложения и экономия для посетителей сайтов;</li>
        <li>реклама и привлечение новых клиентов для продавца;</li>
        <li>сайты с промокодами и скидками играют роль посредников между клиентам и продавцом, поэтому получают свою долю прибыли от продажи купонов или проценты за размещение на сайте.</li>
      </ul>

      <p>
        Как и во многих сервисах, при обращении к сайту следует внимательно прочитать все условия, чтобы избежать недобросовестных продавцов и выбирать только проверенные сервисы.
      </p>

      <h2>Где найти самые лучшие скидки?</h2>

      <p>
        Сайт https://za-halyavoi.ru/ - это огромный каталог скидок и промокодов на широчайший ассортимент товаров и услуг.
      </p>

      <p>
        Сотрудники сервиса тщательно анализируют рынок и отбирают только самые полезные и выгодные промокоды для максимальной прибыли клиентов. С нашим сервисом вы сможете не только приобрести нужные товары, но и сохранить бюджет для приятных подарков себе и своим близким.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {PostModel} from "~/models/post.model";

export default {
  layout: 'default',
  data() {
    return {
      posts: [] as PostModel[],
      count: 0 as number,
      page: 1,
      pagination: {} as object
    }
  },
  head():any {
    return {
      // @ts-ignore
      title: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: `Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. го za халявой!`
        },
        {
          hid: 'keywords',
          name: 'keywords',
          // @ts-ignore
          content: `сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${this.$store.state.seo.month}`
        }
      ],
      link: [
        {
          rel: 'canonical',
          // @ts-ignore
          href: 'https://za-halyavoi.ru/'
        }
      ]
    }
  },
  async asyncData({ $api, route }:any) {
    const page = route.query.page || 1

    const postRes = await $api.get(`/post?page=${page}`)

    const pagination:object = {
      current_page: route.query.page || 1,
      total_elements: postRes.data.count,
      total_pages: Math.ceil(postRes.data.count / 15)
    };

    return { pagination, page, posts: postRes.data.rows, count: postRes.data.count }
  },
  methods: {
    async fetchPosts(page=0 as number) {
      // @ts-ignore
      const postRes = await this.$api.get(`/post?page=${page}`)

      // @ts-ignore
      this.posts = postRes.data.rows
      // @ts-ignore
      this.pagination = {
        current_page: page || 1,
        total_elements: postRes.data.count,
        total_pages: postRes.data.count / 15
      }
    },
    async likePost(uin:string) {
      // @ts-ignore
      const likes = this.$cookies.get('likes')
      if (!likes) {
        // @ts-ignore
        await this.$api.get(`/post/like/${uin}`)
        // @ts-ignore
        this.$cookies.set('likes', [uin])
        // @ts-ignore
        this.posts.forEach((i:any) => {
          if (i.uin === uin) {
            i.rating = i.rating + 1
          }
        })
      } else {
        const findLike = likes.find((i:any) => i === uin)
        if (!findLike) {
          likes.push(uin)
          // @ts-ignore
          await this.$api.get(`/post/like/${uin}`)
          // @ts-ignore
          this.$cookies.set('likes', likes)
          // @ts-ignore
          this.posts.forEach((i:any) => {
            if (i.uin === uin) {
              i.rating = i.rating + 1
            }
          })
        }
      }
    }
  },
  watch: {
    async 'pagination.current_page'(query: string | number) {
      // @ts-ignore
      this.$router.push({query: { page: this.pagination.current_page.toString() }})

      // @ts-ignore
      const postRes = await this.$api.get(`/post?page=${query}`)

      // @ts-ignore
      this.posts = postRes.data.rows
      // @ts-ignore
      this.$refs.hot.scrollIntoView({block: 'start', behavior: 'smooth'})
    }
  }
}
</script>
