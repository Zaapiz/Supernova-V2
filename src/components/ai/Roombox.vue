<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue';

import room from "./AiRoom.vue"

const props = defineProps({
  rooms: Object,
});

console.log(props.rooms)

const stuff = reactive({
  text: '',
  error: '',
  isSending: false as string | boolean,
  rooms: props.rooms as { roomid: string; name: string }[],
  chats: [] as { ai: boolean; text: string }[],
});
</script>

<template>
  <div class="w-80 border-l-2 border-black bg-gray-600">
    <div class="p-4 bg-gray-600 border-b-2 border-black">
      <h2 class="text-2xl font-semibold text-white">
        Chat Rooms:
      </h2>
    </div>
    <div class="overflow-y-auto h-full">
      <room v-for="item in stuff.rooms" :key="item.roomid" :id="item.roomid" :name="item.name" />
      <room :id="null" name="Empty Room" />
    </div>
  </div>
</template>