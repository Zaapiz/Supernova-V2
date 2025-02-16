<script setup lang="ts">
import { ref, onMounted } from 'vue'

const text = ref()

function stuff() {
  localStorage.setItem('title', text.value)
  document.title = text.value
}

function getLocalstorage() {
  text.value = localStorage.getItem('title') || 'Google'
}

onMounted(getLocalstorage)
</script>

<template>
  <div class="flex flex-col justify-center items-center mb-36">
    <h1 class="text-white text-5xl font-semibold pt-12">Title Change</h1>
    <input
      v-model="text"
      class="w-textw h-16 m-3 font-poppins rounded-3xl text-2xl"
      type="input"
      @input="stuff"
    />
  </div>
</template>
