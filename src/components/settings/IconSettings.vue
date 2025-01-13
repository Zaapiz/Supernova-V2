<script setup lang="ts">
import { ref, onMounted } from "vue";
import { setFavicon } from "../../assets/stuff";

const props = defineProps({
  classroomimg: String,
  driveimg: String,
  gmailimg: String,
  googleimg: String,
});

const iconurl = ref();

function stuff(idk: string) {
  localStorage.setItem("icon", idk);
  setFavicon(idk);
  iconurl.value = idk;
}

function getLocalstorage() {
  iconurl.value = localStorage.getItem("icon") || "/pics/favicon/google.png"
}

onMounted(getLocalstorage)
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-white text-5xl font-semibold p-10">Icon Select</h1>
    <div class="flex justify-center space-x-5">
      <img class="w-60 h-60 hover:cursor-pointer" :src="props.classroomimg" @click="stuff('/pics/favicon/classroom.png')" />
      <img class="w-60 h-60 hover:cursor-pointer" :src="props.driveimg" @click="stuff('/pics/favicon/drive.png')" />
      <img class="w-60 h-60 hover:cursor-pointer" :src="props.gmailimg" @click="stuff('/pics/favicon/gmail.ico')" />
      <img class="w-60 h-60 hover:cursor-pointer" :src="props.googleimg" @click="stuff('/pics/favicon/google.ico')" />
    </div>
  </div>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-white text-5xl font-semibold pt-12">Custom Icon</h1>
    <input v-model="iconurl" class="w-textw h-16 m-3 font-poppins rounded-3xl text-2xl" type="input"
      @keyup.enter="iconurl && stuff(iconurl)" />
  </div>
</template>