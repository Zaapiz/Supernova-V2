<script setup lang="ts">
import { ref } from 'vue';
import { store } from '@/assets/store';

const props = defineProps({
  name: String,
  id: String
});

const roomname = ref(props.name)
const edit = ref(false)

const emit = defineEmits(['roomSelected'])
function selectRoom() {
  store.activeroomid = props.id;
  emit('roomSelected');
}

function editName(event: MouseEvent) {
  event.stopPropagation();
  edit.value = true
}

async function rename() {
  edit.value = false;
  try {
    const response = await fetch('/api/renameRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomid: props.id,
        roomname: roomname.value,
      })
    });
    const data = await response.json();
    if (data === "invalid-session") {
      store.username = undefined;
      store.tokens = 0;
    }
  } catch (error) {
    console.error('Failed to rename room:', error);
  }
}
</script>

<template>
  <div class="p-2 m-3 cursor-pointer transition-colors border-black rounded-lg flex justify-between" :class="{
    'hover:bg-gray-500 hover:border': store.activeroomid !== id,
    'bg-blue-500': store.activeroomid === id
  }" @click="selectRoom">
    <input v-if="edit === true" v-model="roomname" class="rounded-md" type="text" @click.stop @keydown.enter="rename">
    <p v-if="edit === false" class="text-xl text-gray-100">
      {{ roomname || "Unnamed Room" }}
    </p>
    <span v-if="id !== undefined" class="material-symbols-outlined" @click="editName">
      edit
    </span>
  </div>
</template>
