<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  name: String,
  id: String
});

const roomname = ref(props.name)
const edit = ref(false)
const activeroomid = ref(null)

const emit = defineEmits(['roomSelected'])
function selectRoom() {

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

  } catch (error) {
    console.error('Failed to rename room:', error);
  }
}
</script>

<template>
  <div class="p-2 m-3 cursor-pointer transition-colors border-black rounded-lg flex justify-between" :class="{
    'hover:bg-gray-500 hover:border': activeroomid !== id,
    'bg-blue-500': activeroomid === id
  }" @click="selectRoom">
    <input v-if="edit === true" v-model="roomname" class="rounded-md" type="text" @click.stop @keydown.enter="rename">
    <p v-if="edit === false" class="text-xl text-gray-100">
      {{ roomname || "Unnamed Room" }}
    </p>
    <span v-if="id !== null" class="material-symbols-outlined" @click="editName">
      edit
    </span>
  </div>
</template>
