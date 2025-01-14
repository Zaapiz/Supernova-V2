<script setup lang="ts">
import { reactive } from 'vue';
import { store } from '@/assets/store';

const stuff = reactive({
  email: '',
  username: '',
  password: '',
  header: 'Login',
  button: 'Sign Up',
  respond: null as string | null,
});

let select = "login"

function toggle(idk: string) {
  stuff.respond = null;
  const isSignUp = idk === "Sign Up";
  stuff.header = isSignUp ? "Sign Up" : "Login";
  stuff.button = isSignUp ? "Login" : "Sign Up";
  select = isSignUp ? "signup" : "login";
}

async function post() {
  try {
    const response = await fetch(`/api/${select}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: stuff.email,
        username: stuff.username,
        password: stuff.password
      })
    });
    const data = await response.json();
    if (data.status === "successful") {
      store.username = data.username;
      store.tokens = data.tokens || 0;
    } else {
      stuff.respond = data.message;
    }
  } catch (error) {
    stuff.respond = "Network error occurred";
    console.error('Login/Signup failed:', error);
  }
}
</script>

<template>
  <div class="flex justify-center items-center fixed z-10 inset-0 bg-black bg-opacity-40 flex-col">
    <div class="bg-nav-bg p-2 py-0 rounded-xl">
      <div>
        <h1 class="text-5xl m-6 text-darker-blue text-center font-poppins">
          {{ stuff.header }}
        </h1>
        <h2 v-if="stuff.respond" class="text-red-600 m-2 text-center">
          {{ stuff.respond }}
        </h2>
      </div>
      <form @submit.prevent="post">
        <div>
          <input v-if="stuff.header === 'Sign Up'" v-model="stuff.email"
            class="rounded-xl m-2 w-buttonr h-12 text-3xl outline-blue-500 outline-8 text-center" placeholder="Email"
            required maxlength="1000">
        </div>
        <div>
          <input v-model="stuff.username"
            class="rounded-xl m-2 w-buttonr h-12 text-3xl outline-blue-500 outline-8 text-center" placeholder="Username"
            required maxlength="50">
        </div>
        <div>
          <input v-model="stuff.password"
            class="rounded-xl m-2 w-buttonr h-12 text-3xl outline-blue-500 outline-8 text-center" placeholder="Password"
            type="password" required maxlength="1000">
        </div>
        <button type="submit"
          class="rounded-xl m-2 bg-darker-blue font-rubik text-4xl text-center text-white w-buttonr h-12  hover:bg-darkerer-blue">
          Submit
        </button>
      </form>
      <button class="text-white hover:text-blue-600 m-2" @click="toggle(stuff.button)">
        {{ stuff.button }}
      </button>
    </div>
  </div>
</template>
