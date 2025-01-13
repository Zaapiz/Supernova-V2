<script setup lang="ts">
import { reactive, onMounted, computed, ref } from "vue";
const searchInput = ref(null);

const DEFAULT_PARAMS = {
  search: '',
  page: '1'
};

const items = reactive({
  search: "",
  inputFocused: false,
  dropdown: false,
  urlParams: {
    search: DEFAULT_PARAMS.search,
    page: parseInt(DEFAULT_PARAMS.page)
  },
})

const dropdown = computed(() => {
  return filteredResults.value.length && (items.inputFocused || items.dropdown);
});

function setParams(search: string, page: number) {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('page', page.toString());
  urlParams.set('search', search);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
  items.urlParams = {
    search: search,
    page: page
  };
}

function handleEnterKey() {
  page(0)
  items.dropdown = false
  if (searchInput.value !== null) {
    (searchInput.value as HTMLInputElement).blur();
  }
}

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  items.urlParams = {
    search: urlParams.get('search') || DEFAULT_PARAMS.search,
    page: parseInt(urlParams.get('page') || DEFAULT_PARAMS.page)
  };
});
</script>

<template>
  <div class="flex justify-center m-6">
    <div class="relative w-96 sm:w-textw">
      <input v-model="items.search" class="w-full rounded-3xl outline-none transition-all h-12 text-center text-2xl"
        ref="searchInput" :class="{
          'rounded-t-md rounded-b-none': dropdown,
          'focus:rounded-md': !dropdown,
        }" placeholder="Search Games" type="text" @keyup.enter="handleEnterKey" @focus="items.inputFocused = true"
        @blur="items.inputFocused = false" />
      <Transition name="slide">
        <div v-if="dropdown"
          class="absolute top-full left-0 w-full bg-white rounded-b-lg z-10 max-h-96 overflow-x-clip overflow-y-scroll shadow-lg"
          @mouseenter="items.dropdown = true" @mouseleave="items.dropdown = false">
          <ul class="list-none text-center">
            <li v-for="game in filteredResults" :key="game.file" class="p-2 hover:bg-gray-200 cursor-pointer"
              @click="select(game.file, game.root)">
              {{ game.name }}
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>


<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: top;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
