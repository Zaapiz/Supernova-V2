<script setup lang="ts">
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps({
  ai: Boolean,
  stuff: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="flex" :class="ai ? 'justify-start' : 'justify-end'">
    <div class="max-w-[70%] rounded-lg px-4 py-2 break-words font-poppins"
      :class="ai ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'"
      v-html="DOMPurify.sanitize(marked.parse(props.stuff) as string)"></div>
  </div>
</template>
