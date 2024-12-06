<script setup>
import { defineProps, defineEmits } from 'vue'

let props = defineProps(['message', 'show_footer'])

defineEmits(['close_popup'])

</script>

<template>
    <div id="main_footer" v-if="show_footer">
        <div class="background_images">
            <img src="../assets/drop-avec-brillance.png" id="background-image1" />
            <img src="../assets/drop-avec-brillance.png" id="background-image2" />
        </div>
        <div class = "footer_component">
            <div class="line-separator"></div>
            <div class="text_footer"> 
                <p class="footer_content"> 
                    {{ message }}
                </p>
            </div>
    
            <button @click="$emit('close_popup')">
               <p> C'est parti ! </p>
            </button>
        </div>
    </div>
</template>

<style scoped>

#main_footer {
    background-color: #080E1E;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    color: #EBEBEB;
}

.line-separator {
    margin-top: 10px;
    height: 3px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    background-color: #0064A8;
}

#background-image1 {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
}

#footer_component {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}
#background-image2 {
    position: absolute;
    bottom: 40;
    left: 10;
    right: 0;
    width: 50%;
    height: 100%;
    z-index: -2;
    object-fit: cover;
}

button {
    background-color: #ffffff00;
    color: white;
    border-color: #EBEBEB;
    border-radius: 15px;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 15px 2px;
    cursor: pointer;
    transition: background-color 0.5s ease;
}

button:hover {
    background-color: #EBEBEBFF;
}



</style>