<script setup lang="ts">
import { items, select } from "./Games"


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
