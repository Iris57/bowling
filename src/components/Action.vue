<template>
    <v-card class="elevation-10">
        <v-toolbar class="bg-indigo">
            <v-toolbar-title>
                <span class="text-subheading">ROLL</span>
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-slider color="indigo" v-model="input" min="0" :max="maxInput" :step="1" />
            <v-row class="mb-4" justify="space-between">
                <v-col class="text-left">
                    <span class="text-h2 font-weight-light">{{ input }}</span>
                    <span class="subheading font-weight-light ml-1">Pins</span>

                </v-col>
                <v-col class="text-right">
                    <v-btn v-if="isGameOver" theme="dark" color="indigo" elevation="0" @click="reset">
                        <v-icon start icon="mdi-cancel"></v-icon>
                        Game over: RESET
                    </v-btn>
                    <v-btn v-else theme="dark" color="indigo" icon elevation="0" @click="roll">
                        <v-icon size="large" icon="mdi-play"></v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { useGame } from '@/utils/use-game';


const { input, maxInput, roll, isGameOver, reset } = useGame()
</script>