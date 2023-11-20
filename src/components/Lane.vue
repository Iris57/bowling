<template>
    <div class="lane" v-if="show" @click="roll">
        <div class="lane_allpins">
            <div v-for="n in 10" class="lane_pin" :class="`lane_pin${n}`">
                <div class="lane_pin_top"></div>
                <div class="lane_pin_bottom"></div>
            </div>
        </div>
        <div id="lastball" class="ball">
            <div id="dot1" class="ball_dot1"></div>
            <div id="dot2" class="ball_dot2"></div>
            <div id="dot3" class="ball_dot3"></div>
            <div id="ball" class="ball_background"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGame } from '@/utils/use-game';
import { ref, watch } from 'vue';
import { unref } from 'vue';
import { Ref, computed } from 'vue'

const { game, roll } = useGame()


const show = ref(true)

// hacky way of replaying animation
watch(game, () => {
    show.value = false
    requestAnimationFrame(() => show.value = true)
}, { deep: true })
</script>

<style lang="scss">
.lane {
    background-color: black;
    position: relative;
    overflow: hidden;
    animation-iteration-count: revert;
    cursor: pointer;

    .ball {
        position: relative;
        border: 1px solid white;
        background-color: gray;
        width: 30px;
        height: 30px;
        left: 370px;
        bottom: 70px;
        display: block;
        border-radius: 50px;
        animation: ball 8s forwards linear;

        &_dot3 {
            height: 5px;
            width: 5px;
            background-color: black;
            ;
            border-radius: 50px;
            position: relative;
            left: 18px;
            z-index: 5;
        }

        &_dot2 {
            height: 5px;
            width: 5px;
            background-color: black;
            border-radius: 50px;
            position: relative;
            top: 10px;
            left: 6px;
            z-index: 5;
        }

        &_dot1 {
            height: 5px;
            width: 5px;
            background-color: black;
            border-radius: 50px;
            position: relative;
            left: 10px;
            top: 5px;
            z-index: 5;
        }
    }


    @keyframes ball {
        33% {
            transform: rotate(1440deg);
            left: 970px;
        }

        66% {
            transform: rotate(2880deg);
            left: 1570px;
        }

        100% {
            transform: rotate(4320deg);
            left: 2170px;
        }
    }




    &_allpins {
        background-color: transparent;
        border: none;
        position: relative;
        left: 1129px;
        width: 200px;
        height: 200px;
    }

    &_pin {
        border: none;
        background-color: transparent;
        height: 70px;
        width: 25px;
        position: relative;

        &_bottom {
            background-color: white;
            height: 50px;
            width: 20px;
            border-radius: 10px/20px;
            border: 1px solid black;
        }

        &_top {
            background-color: white;
            width: 10px;
            height: 10px;
            position: relative;
            left: 5px;
            border-top: 1px solid black;
            border-left: 1px solid black;
            border-right: 1px solid black;
            border-bottom: 3px solid red;
            border-radius: 50px;
        }

        &--fallen {
            background: yellow;
        }
    }

    &_pin10 {
        left: 45px;
        bottom: 570px;
        z-index: 1;
        animation: pin10 2s forwards linear;
        animation-delay: 3.8s;
    }

    @keyframes pin10 {
        50% {
            transform: rotate(-1121deg);
            bottom: 570px;
            left: 500px;
        }

        100% {
            transform: rotate(-1641deg);
            bottom: 595px;
            left: 700px;
        }
    }

    &_pin9 {
        left: 45px;
        bottom: 475px;
        z-index: 2;
        animation: pin9 2s forwards linear;
        animation-delay: 3.8s;
    }

    @keyframes pin9 {
        50% {
            transform: rotate(-641deg);
            bottom: 500px;
            left: 240px;
        }

        100% {
            transform: rotate(-728deg);
            bottom: 652px;
            left: 420px;
        }
    }

    &_pin8 {
        left: 45px;
        bottom: 380px;
        z-index: 4;
        animation: pin8 2s forwards linear;
        animation-delay: 3.8s;
    }

    @keyframes pin8 {
        50% {
            transform: rotate(-641deg);
            bottom: 240px;
            left: 240px;
        }

        100% {
            transform: rotate(-728deg);
            bottom: 210px;
            left: 370px;
        }
    }

    &_pin7 {
        left: 45px;
        bottom: 280px;
        z-index: 5;
        animation: pin7 2s forwards linear;
        animation-delay: 3.8s;
    }

    @keyframes pin7 {
        50% {
            transform: rotate(-321deg);
            bottom: 240px;
            left: 150px;
        }

        100% {
            transform: rotate(-612deg);
            bottom: 210px;
            left: 220px;
        }
    }

    &_pin6 {
        left: 30px;
        bottom: 280px;
        z-index: 2;
        animation: pin6 2s forwards linear;
        animation-delay: 3.6s;
    }

    @keyframes pin6 {
        50% {
            transform: rotate(-842deg);
            bottom: 290px;
            left: 150px;
        }

        100% {
            transform: rotate(-931deg);
            bottom: 325px;
            left: 220px;
        }
    }

    &_pin5 {
        left: 30px;
        bottom: 188px;
        z-index: 3;
        animation: pin5 2s forwards linear;
        animation-delay: 3.6s;
    }

    @keyframes pin5 {
        50% {
            transform: rotate(-641deg);
            bottom: 100px;
            left: 200px;
        }

        100% {
            transform: rotate(-1700deg);
            bottom: 200px;
            left: 340px;
        }
    }

    &_pin4 {
        left: 30px;
        bottom: 85px;
        z-index: 5;
        animation: pin4 2s forwards linear;
        animation-delay: 3.6s;
        animation-delay: 3.6s;
    }

    @keyframes pin4 {
        50% {
            transform: rotate(-851deg);
            bottom: 100px;
            left: 200px;
        }

        100% {
            transform: rotate(-1762deg);
            bottom: 200px;
            left: 300px;
        }
    }




    &_pin3 {
        left: 15px;
        bottom: 60px;
        z-index: 3;
        animation: pin3 2s forwards linear;
        animation-delay: 3.4s;
        animation-delay: 3.4s;
    }

    @keyframes pin3 {
        50% {
            transform: rotate(-951deg);
            top: 50px;
            left: 200px;
        }

        100% {
            transform: rotate(-1462deg);
            top: 80px;
            left: 420px;
        }
    }

    &_pin2 {
        top: 35px;
        left: 15px;
        z-index: 5;
        animation: pin2 2s forwards linear;
        animation-delay: 3.4s;
        animation-delay: 3.4s;
    }

    @keyframes pin2 {
        50% {
            transform: rotate(-632deg);
            top: 50px;
            left: 90px;
        }

        100% {
            transform: rotate(-1252deg);
            top: 80px;
            left: 180px;
        }
    }

    &_pin1 {
        top: 90px;
        z-index: 4;
        animation: pin1 2s forwards linear;
        animation-delay: 3.2s;
        animation-delay: 3.2s;
    }

    @keyframes pin1 {
        50% {
            transform: rotate(-720deg);
            top: 25px;
            left: 250px;
        }

        100% {
            transform: rotate(-785deg);
            top: 50px;
            left: 200px;
        }
    }
}
</style>