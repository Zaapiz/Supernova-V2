<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue';
import { actions } from 'astro:actions';
// import { dotSpinner } from 'ldrs'

import chat from "./AiChat.vue"
// import room from './AiRoom.vue'

// dotSpinner.register()

const stuff = reactive({
  text: '',
  error: '',
  isSending: false as string | boolean,
  rooms: [] as { roomid: string; name: string }[],
  chats: [] as { ai: boolean; text: string }[],
});

async function enter(event: KeyboardEvent) {
  if (!event.shiftKey) {
    event.preventDefault();
    if (stuff.text && stuff.text.trim()) {
      const response = await actions.aiActions.ask({
        text: stuff.text
      })
      console.log(response)
      console.log("send")
    }
  }
}
</script>

<template>
  <div class="flex-1 flex flex-col overflow-x-hidden">
    <div class="flex-1 p-4 space-y-4 overflow-y-auto">
      <chat v-for="(message, index) in stuff.chats" :key="index" :ai="message.ai" :stuff="message.text" />
      <div v-if="stuff.chats.length === 0" class="flex justify-center">
        <div class="text-3xl font-poppins rounded-lg px-4 py-2 break-words bg-blue-600 text-white">
          Enter a Prompt
        </div>
      </div>
      <div v-if="stuff.isSending" class="flex justify-start">
        <div class="bg-blue-600 rounded-lg px-12 py-2">
          <l-dot-spinner size="30" speed="1" color="white" />
        </div>
      </div>
    </div>

    <div class="flex gap-2 p-4 py-6 items-center relative">
      <span class="text-white absolute top-0 left-4">Tokens: 5</span>
      <span v-if="stuff.error" class="text-red-500 absolute top-0 left-1/2">{{ stuff.error }}</span>
      <textarea v-model="stuff.text" placeholder="Type your message"
        class="flex-1 px-4 py-4 rounded-lg focus:outline-none resize-none" @keydown.enter="enter" />
      <!-- <button @click="post" class="px-10 py-4 bg-title-blue text-white rounded-lg hover:bg-blue-600 transition-colors">
            Send
          </button> -->
    </div>
  </div>
</template>
