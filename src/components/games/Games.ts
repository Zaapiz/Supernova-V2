import { reactive, computed } from 'vue'

interface Game {
  name: string
  file: string
  root: string
  img: string
}

const DEFAULT_PARAMS = {
  search: '',
  page: '1',
}

export const items = reactive({
  all: [] as Game[],
  page: [] as Game[],
  pagenum: 1,
  itemsperpage: 25,
  search: '',
  inputFocused: false,
  dropdown: false,
  urlParams: {
    search: DEFAULT_PARAMS.search,
    page: parseInt(DEFAULT_PARAMS.page),
  },
})

// Initialize URL params in onMounted
export function mounted() {
  const urlParams = new URLSearchParams(window.location.search)
  items.urlParams = {
    search: urlParams.get('search') || DEFAULT_PARAMS.search,
    page: parseInt(urlParams.get('page') || DEFAULT_PARAMS.page),
  }
  fetchStuff()
}

async function fetchStuff() {
  try {
    const response = await fetch('/cdn/games.json')
    const data = await response.json()
    items.all = data.sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name),
    )
    items.search = items.urlParams.search
    page(items.urlParams.page)
  } catch (error) {
    console.error('Failed to fetch games:', error)
  }
}

export const totalPages = computed(() => {
  if (items.urlParams.search) return Math.ceil(lastSearchResultsLength.value / items.itemsperpage)
  return Math.ceil(items.all.length / items.itemsperpage)
})

const lastSearchResultsLength = computed(() => {
  return items.all.filter((game) =>
    game.name.toLowerCase().includes(items.urlParams.search.toLowerCase()),
  ).length
})

export const filteredResults = computed(() => {
  if (!items.search) return []
  return items.all.filter((game) => game.name.toLowerCase().includes(items.search.toLowerCase()))
})

export const dropdown = computed(() => {
  return filteredResults.value.length && (items.inputFocused || items.dropdown)
})

function setParams(search: string, page: number) {
  if (typeof window === 'undefined') return

  const urlParams = new URLSearchParams(window.location.search)
  urlParams.set('page', page.toString())
  urlParams.set('search', search)
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`)
  items.urlParams = {
    search: search,
    page: page,
  }
}

export function select(file: string, root: string) {
  const path = '/cdn/' + root + '/' + file
  if (root === 'webretro') {
    window.location.href = '/Iframe/cdn/webretro/index.html?core=autodetect&rom=' + file
  } else {
    window.location.href = '/Iframe' + path
  }
}

export function page(num: number) {
  if (num > totalPages.value) num = totalPages.value
  if (num < 1) num = 1
  items.pagenum = num
  if (!items.search) {
    setParams('', num)
    items.page = items.all.slice((num - 1) * items.itemsperpage, num * items.itemsperpage)
  } else {
    setParams(items.search, num)
    items.page = filteredResults.value.slice(
      (num - 1) * items.itemsperpage,
      num * items.itemsperpage,
    )
  }
}
