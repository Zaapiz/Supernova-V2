<script setup lang="ts">
import { items } from "./store"
import type { PropType } from 'vue'
import room from "./AiRoom.vue"

const props = defineProps({
  rooms: Array as PropType<{ roomid: string; name: string }[]>,
});

items.rooms = props.rooms || []
</script>

<template>
  <div class="w-80 border-l-2 border-black bg-gray-600">
    <div class="p-4 bg-gray-600 border-b-2 border-black">
      <h2 class="text-2xl font-semibold text-white">
        Chat Rooms:
      </h2>
    </div>
    <div class="overflow-y-auto h-full">
      <room v-for="item in items.rooms" :key="item.roomid" :id="item.roomid" :name="item.name" />
      <room :id="null" name="New Room" />
    </div>
  </div>
</template>