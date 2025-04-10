<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { setTransportStorage, setProxy, defaultConfig } from '../../assets/stuff'

const proxy = ref()
const transport = ref()

function getLocalstorage() {
  proxy.value = localStorage.getItem('proxy') || defaultConfig.proxy
  transport.value = localStorage.getItem('transport') || defaultConfig.transport
}

onMounted(getLocalstorage)
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-white text-5xl font-semibold p-10 pb-4">Proxy:</h1>
    <div class="flex space-x-10">
      <div class="flex flex-col">
        <h2 class="text-white">Transport:</h2>
        <select
          v-model="transport"
          class="w-56 h-12 text-2xl text-center rounded-lg hover:cursor-pointer"
          @change="setTransportStorage(transport)"
        >
          <option value="epoxy">Epoxy</option>
          <option value="libcurl">Libcurl</option>
          <option value="bare">Bare</option>
        </select>
      </div>
      <div class="flex flex-col">
        <h2 class="text-white">Proxy:</h2>
        <select
          v-model="proxy"
          class="w-56 h-12 text-2xl text-center rounded-lg hover:cursor-pointer"
          @change="setProxy(proxy)"
        >
          <option value="uv">Ultraviolet</option>
          <option value="scramjet">Scramjet</option>
        </select>
      </div>
    </div>
  </div>
</template>
