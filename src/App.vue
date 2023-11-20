<template>
  <v-app>
    <v-main>
      <v-container>
        <v-responsive class="text-center">
          <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
          <h1 class="text-h2 font-weight-bold">Bowling</h1>
          <div class="py-4" />
          <Score />
          <div class="py-4" />
          <Action />
          <div class="py-4" />
          <Lane />
        </v-responsive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Lane from './components/Lane.vue'
import Action from './components//Action.vue'
import Score from './components/Score.vue'
import { useGame } from '@/utils/use-game'

const { reset } = useGame()
reset()

</script>
