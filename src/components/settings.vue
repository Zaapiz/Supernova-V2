<script setup lang="ts">
import { ref, onMounted } from "vue";
import { setTransportStorage, setProxy, defaultConfig } from "../assets/stuff";
import { setFavicon } from "../assets/stuff";

const props = defineProps({
  classroomimg: String,
  driveimg: String,
  gmailimg: String,
  googleimg: String,
});

const iconurl = ref();
const text = ref();
const proxy = ref();
const transport = ref();

function stuff() {
  localStorage.setItem("title", text.value);
  document.title = text.value;
}
function stuff2(idk: string) {
  localStorage.setItem("icon", idk);
  setFavicon(idk);
  iconurl.value = idk;
}

function getLocalstorage() {
  iconurl.value = localStorage.getItem("icon") || "/pics/favicon/google.png"
  text.value = localStorage.getItem("title") || "Google"
  proxy.value = localStorage.getItem("proxy") || defaultConfig.proxy
  transport.value = localStorage.getItem("transport") || defaultConfig.transport
}

onMounted(getLocalstorage)
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-white text-5xl font-semibold p-10 pb-4">Proxy:</h1>
    <div class="flex space-x-10">
      <div class="flex flex-col">
        <h2 class="text-white">Transport:</h2>
        <select v-model="transport" class="w-56 h-12 text-2xl text-center rounded-lg"
          @change="setTransportStorage(transport);">
          <option value="epoxy">Epoxy</option>
          <option value="libcurl">Libcurl</option>
          <option value="bare">Bare</option>
        </select>
      </div>
      <div class="flex flex-col">
        <h2 class="text-white">Proxy:</h2>
        <select v-model="proxy" class="w-56 h-12 text-2xl text-center rounded-lg" @change="setProxy(proxy);
        ">
          <option value="uv">Ultraviolet</option>
          <option value="scramjet">Scramjet</option>
        </select>
      </div>
    </div>
  </div>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-white text-5xl font-semibold p-10">Icon Select</h1>
    <div class="flex justify-center space-x-5">
      <img class="w-60 h-60" :src="props.classroomimg" @click="stuff2('/pics/favicon/classroom.png')" />
      <img class="w-60 h-60" :src="props.driveimg" @click="stuff2('/pics/favicon/drive.png')" />
      <img class="w-60 h-60" :src="props.gmailimg" @click="stuff2('/pics/favicon/gmail.ico')" />
      <img class="w-60 h-60" :src="props.googleimg" @click="stuff2('/pics/favicon/google.ico')" />
    </div>
  </div>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-white text-5xl font-semibold pt-12">Custom Icon</h1>
    <input v-model="iconurl" class="w-textw h-16 m-3 font-poppins rounded-3xl text-2xl" type="input"
      @keyup.enter="iconurl && stuff2(iconurl)" />
  </div>
  <div class="flex flex-col justify-center items-center mb-36">
    <h1 class="text-white text-5xl font-semibold pt-12">Title Change</h1>
    <input v-model="text" class="w-textw h-16 m-3 font-poppins rounded-3xl text-2xl" type="input" @input="stuff" />
  </div>
</template>
