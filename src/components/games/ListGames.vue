<script setup lang="ts">
import { reactive, onMounted, computed } from "vue";

interface Game {
  name: string;
  file: string;
  root: string;
  img: string;
}

const items = reactive({
  all: [] as Game[],
  page: [] as Game[],
  pagenum: 1,
  itemsperpage: 25,

});

// Initialize URL params in onMounted
onMounted(() => {
  fetchStuff();
});

async function fetchStuff() {
  try {
    const response = await fetch("/cdn/games.json");
    const data = await response.json();
    items.all = data.sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name)
    );
    items.search = items.urlParams.search;

    page(items.urlParams.page);
  } catch (error) {
    console.error('Failed to fetch games:', error);
  }
}

const totalPages = computed(() => {
  if (items.urlParams.search)
    return Math.ceil(lastSearchResultsLength.value / items.itemsperpage);
  return Math.ceil(items.all.length / items.itemsperpage);
});

const lastSearchResultsLength = computed(() => {
  return items.all.filter((game) =>
    game.name.toLowerCase().includes(items.urlParams.search.toLowerCase())
  ).length;
});

const filteredResults = computed(() => {
  if (!items.search) return [];
  return items.all.filter((game) =>
    game.name.toLowerCase().includes(items.search.toLowerCase())
  );
});


function select(file: string, root: string) {
  const path = "/cdn/" + root + "/" + file;
  if (root === "webretro") {
    window.location.href = "/Iframe/cdn/webretro/index.html?core=autodetect&rom=" + file;
  } else {
    window.location.href = "/Iframe" + path;
  }
}

</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 pt-10">
    <div v-for="game in items.page" :key="`${game.root}-${game.file}`"
      class="flex flex-col items-center hover:cursor-pointer" @click="select(game.file, game.root)">
      <div class="flex justify-center items-center w-44 h-44">
        <img class="rounded-3xl m-3 hover:cursor-pointer max-w-full max-h-full"
          :src="'/cdn/' + game.root + '/' + game.img" />
      </div>
      <h2 class="text-white text-center font-poppins text-lg">
        {{ game.name }}
      </h2>
    </div>
  </div>
</template>
