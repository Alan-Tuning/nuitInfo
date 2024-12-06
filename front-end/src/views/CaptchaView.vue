<template>
  <div id="captcha-page" :class="{ blurred: !captchaValidated }">
    <h1>Félicitations, vous êtes un humain!</h1>
  </div>
  <div v-if="!captchaValidated" id="captcha-overlay">
    <h2>Vous devez prouver que vous êtes un humain</h2>
    <button @click="verifyHuman">Vérifier</button>
  </div>
  <CaptchaPopup :showPopup="showPopup" @close="onPopupClose" @captcha-validated="onCaptchaValidated"/>
</template>

<script>
import CaptchaPopup from "@/components/captcha/CaptchaPopup.vue";

export default {
  name: "CaptchaPage",
  components: {
    CaptchaPopup,
  },
  data() {
    return {
      captchaValidated: false,
      showPopup: false,
    };
  },
  methods: {
    verifyHuman() {
      this.showPopup = true;
    },
    onPopupClose() {
      this.showPopup = false;
    },
    onCaptchaValidated() {
      this.captchaValidated = true; // Mark captcha as validated
      this.showPopup = false;
    },
  },
};
</script>

<style>
#captcha-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  transition: filter 0.3s ease;
}

.blurred {
  filter: blur(5px);
}

#captcha-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  padding: 10px 20px;
  background-color: #0077b2;
  color: #ffffff;
  font-size: 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  position: relative;
}

button:hover {
  background-color: #005f8e;
}
</style>
