<template>
  <div class="q-pa-md" style="max-width: 100%">
    <q-img src="../assets/LogoEscrutado.png" :ratio="4 / 3" />
    <q-list padding class="rounded-borders text-primary">
      <q-separator spaced />
      <q-item
        clickable
        v-ripple
        :active="link === 'votos'"
        @click="link = 'votos'"
        active-class="my-menu-link"
        to="/"
      >
        <q-item-section avatar>
          <q-icon name="how_to_vote" />
        </q-item-section>

        <q-item-section>Votos</q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item
        clickable
        v-ripple
        :active="link === 'escrutinio'"
        @click="link = 'escrutinio'"
        active-class="my-menu-link"
        to="escrutinioPage"
      >
        <q-item-section avatar>
          <q-icon name="ballot" />
        </q-item-section>

        <q-item-section>Escrutinio</q-item-section>
      </q-item>
      <q-separator spaced />

      <q-item
        clickable
        v-ripple
        :active="link === 'resultados'"
        @click="link = 'resultados'"
        active-class="my-menu-link"
        to="ResultadosPage"
      >
        <q-item-section avatar>
          <q-icon name="poll" />
        </q-item-section>

        <q-item-section>Resultados</q-item-section>
      </q-item>

      <q-separator spaced />
    </q-list>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppMenu',
  setup() {
    return {
      link: ref('votos'),
    }
  },
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>
