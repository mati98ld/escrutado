<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white q-pt-lg" height-hint="98">
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
        <div class="flex-column">
          <span>Desarrollado por Matías Díaz</span>
          <div class="row items-center justify-center">
            <FontAwesomeIcon :icon="faInstagram" class="q-ml-sm" />
            <span>mati.diiaz</span>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="q-pb-safe">
      <router-view />
      <div
        class="text-caption text-grey-6 flex items-center justify-center"
        style="transform: translateY(-50px)"
      >
        <div class="flex-column">
          <span>Desarrollado por Matías Díaz</span>
          <div class="row items-center justify-center">
            <FontAwesomeIcon :icon="faInstagram" class="q-ml-sm" />
            <span>mati.diiaz</span>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import AppMenu from '../components/AppMenu.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import the specific icon definition directly
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

export default {
  components: {
    AppMenu,
    FontAwesomeIcon,
  },
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      // expose the imported icon to the template
      faInstagram,
    }
  },
}
</script>
