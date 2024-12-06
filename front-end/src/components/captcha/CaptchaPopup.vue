<template>
    <div v-if="showPopup" class="captcha-popup-overlay">
        <div class="captcha-popup">
            <div class="captcha-popup-header">
                <h2>Vérification humaine</h2>
                <button class="close-button" @click="closePopup">Fermer</button>
            </div>
            <div class="captcha-popup-body">
                <Game style="width: 60vmin; height: 60vmin;" @captcha-validated="$emit('captcha-validated')"/>
            </div>
        </div>
    </div>
</template>

<script>
import Game from './Game.vue';

export default {
    name: "CaptchaPopup",
    components: {
        Game,
    },
    props: {
        showPopup: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        closePopup() {
            this.$emit('close');

        },
    },
};
</script>

<style>
.captcha-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.captcha-popup {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    gap: 10px;
    max-width: 90%;
}

.captcha-popup-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #0077b2;
    color: #ffffff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.close-button {
    padding: 5px 10px;
    background-color: #e9e9e9;
    color: #0077b2;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.close-button:hover {
    background-color: #ffffff;
}

.captcha-popup-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    padding: 0px;
}
</style>