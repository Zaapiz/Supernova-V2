<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { scramjet } from '../assets/proxy';

interface App {
  alt: string;
  url: string;
  type: string;
  img: string;
}

const items = ref<App[]>([]);

async function fetchStuff() {
  try {
    const response = await fetch('/cdn/apps.json');
    items.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch apps:', error);
  }
}

function go(url: string, type: string) {
  if (type == "uv") {
    window.location.href = "/Iframe" + __uv$config.prefix + __uv$config.encodeUrl(url);
  } else if (type == "scramjet") {
    window.location.href = "/Iframe" + scramjet.encodeUrl(url);
  } else {
    window.location.href = "/Iframe" + url;
  }
}

onMounted(() => {
  fetchStuff();
});
</script>

<template>
  <div>
    <h1 class="font-rubik text-center text-title-blue text-7xl p-16">
      Apps
    </h1>
    <div class="flex flex-wrap justify-center">
      <div v-for="app in items" :key="app.alt" class="p-2">
        <button @click="go(app.url, app.type)">
          <img class="w-60 h-60 rounded-3xl" :src="app.img" :alt="app.alt">
        </button>
      </div>
    </div>
  </div>
</template>
