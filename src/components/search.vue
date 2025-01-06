<script setup lang="ts">
import { reactive } from "vue";
import { scramjet } from "../assets/proxy.ts";
import { search, defaultConfig } from "../assets/stuff.ts";

const props = defineProps({
  uvimg: String,
  sjimg: String,
});

const data = reactive({
  text: "",
});

const proxy = localStorage.getItem("proxy") || defaultConfig.proxy;

function go() {
  const url = search(data.text);
  if (proxy === "uv") {
    window.location.href = "/Iframe" + __uv$config.prefix + __uv$config.encodeUrl(url);
  } else if (proxy === "scramjet") {
    window.location.href = "/Iframe" + scramjet.encodeUrl(url);
  } else {
    window.location.href = "/Iframe" + url;
  }
}
</script>
<template>
  <div>
    <div class="flex justify-center p-5">
      <img v-if="proxy === 'uv'" :src="props.uvimg" alt="uv logo" style="width: 20%; height: 20%" />
      <img v-if="proxy === 'scramjet'" :src="props.sjimg" alt="scramjet logo" style="width: 30%; height: 30%" />
    </div>
    <div class="flex justify-center">
      <form @submit.prevent="go">
        <input v-model="data.text" type="text"
          class="w-96 sm:w-textw h-16 m-2 font-poppins rounded-3xl text-2xl placeholder:text-gray-500"
          placeholder="Search the web freely" />
      </form>
    </div>
  </div>
</template>
