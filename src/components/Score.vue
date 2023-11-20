<template>
    <v-card class="elevation-10">
        <v-toolbar class="bg-indigo">
            <v-toolbar-title>
                <span class="text-subheading">SCORES</span>
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-row>
                <v-col v-for="(frame) in game.frames" :key="`frame${frame.frameNumber}`">
                    <v-card>
                        <v-toolbar class="bg-indigo-lighten-4">
                            <v-toolbar-title>{{ frame.frameNumber + 1 }}</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text class="px-0 py-0">
                            <div class="rolls" :class="frame.rolls.length <= 1 ? 'rolls--single' : ''">
                                <div v-if="frame.rolls.length === 0" class="roll"></div>
                                <div v-else v-for="(roll, rollIndex) in frame.rolls" class="roll"
                                    :key="`frame${frame.frameNumber}_roll${rollIndex}`">
                                    {{ rollText(roll, rollIndex, frame) }}</div>
                            </div>
                            <div class="pt-4 score text-h6">{{ frame.score }}</div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { FrameInterface } from '@/models/frame';
import { RollInterface } from '@/models/roll';
import { useGame } from '@/utils/use-game';


const { game } = useGame()

function rollText(roll: RollInterface, rollIndex: number, frame: FrameInterface) {
    return roll.isStrike ? 'x' : (roll.isMiss ? '-' : (roll.isSpare ? '/' : roll.score))
}
</script>

<style lang="scss">
.rolls {
    display: flex;
    justify-content: space-between;

    &--single {
        justify-content: end;
    }
}

.score {
    min-width: 80px;
    min-height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.roll {
    min-width: 40px;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
}
</style>