<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white q-pt-xl" height-hint="98">
      <q-toolbar class="q-pt-safe">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="q-ml-sm">
          <q-img
            :ratio="21 / 9"
            style="max-width: 150px"
            fit="contain"
            src="../assets/LogoEscrutadoHorizontal.png"
          >
          </q-img>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      class="q-pt-xl"
      behavior="mobile"
      elevated
    >
      <AppMenu />
      <div class="text-caption text-grey-6 flex justify-center q-mt-lg">
        Desarrollado por Matías Díaz
      </div>
    </q-drawer>

    <q-page-container class="q-pb-safe">
      <router-view />
      <div
        class="text-caption text-grey-6 flex justify-center"
        style="transform: translateY(-50px)"
      >
        Desarrollado por Matías Díaz
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import AppMenu from '../components/AppMenu.vue'

export default {
  components: {
    AppMenu,
  },
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
}
</script>
