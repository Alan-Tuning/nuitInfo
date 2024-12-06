<template>
    <div class="svg-container">
      <img :src="boatSvg" class="boat-svg" @click="handleBoatClick" alt="Boat SVG" />
      <img v-if="!hideNet" :src="netSvg" class="net-svg" @click="handleNetClick" alt="Net SVG" />
      <img :src="coral1Svg" class="coral1-svg" @click="handleCoral1Click" alt="Coral 1 SVG" />
      <img :src="coral2Svg" class="coral2-svg" @click="handleCoral2Click" alt="Coral 2 SVG" />
    </div>
  </template>
  
  <script>
  import boatSvg from '@/assets/boat.svg';
  import netSvg from '@/assets/net.svg';
  import coral1Svg from '@/assets/cor4.svg';
  import coral2Svg from '@/assets/cor2.svg';
  
  export default {
    data() {
      return {
        boatSvg,
        netSvg,
        coral1Svg,
        coral2Svg,
        clickCoral1: 0,
        clickCoral2: 0,
        hideNet: false
      };
    },
    methods: {
      handleBoatClick(event) {
        console.log('Clicked on the boat', event);
      },
      handleNetClick(event) {
        console.log('Clicked on the net', event);
      },
      handleCoral1Click(event) {
        this.clickCoral1++;
        if (this.clickCoral1 === 2) {
          this.checkHideNet();
        }
      },
      handleCoral2Click(event) {
        this.clickCoral2++;
        if (this.clickCoral2 === 2) {
          this.checkHideNet();
        }
      },
      checkHideNet() {
        if (this.clickCoral1 >= 2 && this.clickCoral2 >= 2) {
          this.hideNet = true;
          const cloudSelectedEvent = new CustomEvent('cloudSelected', {
            detail: -2,
        });
        window.dispatchEvent(cloudSelectedEvent);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .svg-container {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #EBEBEB;
  }
  
  .boat-svg, .net-svg, .coral1-svg, .coral2-svg {
    position: absolute;
    width: 100%;
    height: auto;
  }
  
  .boat-svg, .net-svg {
    background-color: #EBEBEB;
  }
  
  .boat-svg {
    top: 5%;
    left: 0;
  }
  
  .net-svg {
    top: 50%;
    left: 0;
  }
  
  .coral1-svg {
    width: 30%;
    top: 70%;
    left: 20%;
  }
  
  .coral2-svg {
    width: 30%;
    top: 70%;
    left: 60%;
  }
  </style>
  