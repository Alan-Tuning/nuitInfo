<script setup>
import { ref } from 'vue';

const isBottomSectionVisible = ref(true);
const isSvgSectionVisible = ref(false);
const isfinish = ref(false);
const nb_on = ref(0)

const toggleBottomSection1 = () => {
	isBottomSectionVisible.value = false;
	setTimeout(() => {
		isSvgSectionVisible.value = true;
	}, 500); // Delay to match the transition duration
};

const toggleBottomSection2 = () => {
	isSvgSectionVisible.value = false;
	setTimeout(() => {
		isfinish.value = true;
	}, 500); // Delay to match the transition duration
};

const isWinFunc = () => {
	if (currentIcon1.value === on
		&& currentIcon2.value === on
		&& currentIcon3.value === on
		&& currentIcon4.value === on
	) {
		isfinish.value = true;
		toggleBottomSection2();
	}
}

import on from '@/assets/on.svg';
import off from '@/assets/off.svg';

import facto from '@/assets/f1.svg';
import facto2 from '@/assets/f2.svg';
import facto3 from '@/assets/f3.svg';
import facto4 from '@/assets/f4.svg';

const currentFacto = ref(facto);
const currentFacto2 = ref(facto2);
const currentFacto3 = ref(facto3);
const currentFacto4 = ref(facto4);


const currentIcon1 = ref(off);
const currentIcon2 = ref(off);
const currentIcon3 = ref(off);
const currentIcon4 = ref(off);

function changefacto(nb_on) {
	if (nb_on.value == 1) {
		currentFacto.value = currentFacto2.value
	}
	if (nb_on.value == 2) {
		currentFacto.value = currentFacto3.value
	}
	if (nb_on.value == 3) {
		currentFacto.value = currentFacto4.value
	}

}

const toggleIcon1 = () => {
	currentIcon1.value = currentIcon1.value === off ? on : off;
	nb_on.value = nb_on.value + 1
	changefacto(nb_on)

	isWinFunc()
}
const toggleIcon2 = () => {
	currentIcon2.value = currentIcon2.value === off ? on : off;
	nb_on.value = nb_on.value + 1
	changefacto(nb_on)
	isWinFunc()
}
const toggleIcon3 = () => {
	currentIcon3.value = currentIcon3.value === off ? on : off;
	nb_on.value = nb_on.value + 1
	changefacto(nb_on)
	isWinFunc()
}
const toggleIcon4 = () => {
	currentIcon4.value = currentIcon4.value === off ? on : off;
	nb_on.value = nb_on.value + 1
	changefacto(nb_on)
	isWinFunc()
}
</script>

<template>
	<div class="container">
		<div class="top-section"></div>
		<transition name="fade">
			<div v-if="isBottomSectionVisible" class="bottom-section">
				<button @click="toggleBottomSection1" class="firstbutton">
					<p> Tout comme la fièvre peut indiquer un dysfonctionnement dans le corps humain, la fonte des glaciers est un
						indicateur préoccupant du réchauffement climatique, un problème global qui menace notre planète et ses
						écosystèmes. L’industrialisation massive à l’origine de ce réchauffement doit être contrôlée.</p>
				</button>
			</div>
		</transition>
		<transition name="fade">
			<div v-if="isSvgSectionVisible" class="svg-section">
				<img src="@/assets/melting-iceberg.svg" alt="Iceberg" class="iceberg" />
				<img :src="currentFacto" alt="factories" class="factory" />
				<img src="@/assets/droplet.svg" alt="droplet" class="drop1" />
				<img src="@/assets/droplet.svg" alt="droplet" class="drop2" />
				<img src="@/assets/droplet.svg" alt="droplet" class="drop3" />
				<button @click="toggleIcon1" class="icon-button">
					<img :src="currentIcon1" alt="off" class="b1" />
				</button>
				<button @click="toggleIcon2" class="icon-button">
					<img :src="currentIcon2" alt="off" class="b2" />
				</button>
				<button @click="toggleIcon3" class="icon-button">
					<img :src="currentIcon3" alt="off" class="b3" />
				</button>
				<button @click="toggleIcon4" class="icon-button">
					<img :src="currentIcon4" alt="off" class="b4" />
				</button>
			</div>
		</transition>
		<transition name="fade">
			<div v-if="isfinish" class="finish-section">
				<H1 class="finish"> Bravo, vous avez soigner la fièvre ! </H1>
			</div>
		</transition>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.top-section {
	flex: 1;
	background-color: #EBEBEB;
}

.icon-button {
	background: none;
	/* Pas de fond */
	border: none;
	/* Pas de bordure */
}

.icon-button:hover {
	background: none;
	/* Pas de fond */
}

.b1 {
	position: absolute;
	width: 10%;
	bottom: 4%;
	left: 15%;
}

.b2 {
	position: absolute;
	width: 10%;
	bottom: 8%;
	left: 40%;
}

.b3 {
	position: absolute;
	width: 10%;
	bottom: 10%;
	left: 60%;
}

.b4 {
	position: absolute;
	width: 10%;
	bottom: 5%;
	left: 75%;
}

.bottom-section {
	background-color: #080E1E;
	color: white;
	padding: 20px;
	text-align: center;
}

.firstbutton {
	margin-top: 20px;
	padding: 10px 20px;
	background-color: #080E1E;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.firstbutton:hover {
	background-color: #172751;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}


.svg-section {
	position: absolute;
	top: 10%;
	left: 50%;
	transform: translateX(-50%);
	width: 90%;
	height: 90%;
	background-color: #080E1E;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.finish-section {
	position: absolute;
	top: 10%;
	left: 50%;
	transform: translateX(-50%);
	width: 90%;
	height: 90%;
	background-color: #080E1E;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.finish {
	position: absolute;
	color: white;
	top: 50%;

}

.iceberg {
	position: absolute;
	top: 10%;
	width: 50%;
}

.drop1 {
	position: absolute;
	width: 15%;
	top: 25%;
	left: 30%;
}

.drop2 {
	position: absolute;
	width: 18%;
	top: 30%;
	left: 45%;
}

.drop3 {
	position: absolute;
	width: 20%;
	top: 25%;
	left: 55%;
}

.factory {
	position: absolute;
	bottom: 0%;
	width: 80%;
}


@media (min-width: 1024px) {
	.iceberg {
		width: 20%;
	}

	.drop1 {
		position: absolute;
		width: 1;
		top: 40%;
		left: 35%;
	}

	.drop2 {
		position: absolute;
		width: 1;
		left: 42%;
		top: 40%;
	}

	.drop3 {
		position: absolute;
		width: 1;
		left: 46%;
		top: 30%;
	}

	.factory {
		width: 20%;
	}


	.b1 {
		position: absolute;
		width: 2%;
		bottom: 4%;
		left: 41%;
	}

	.b2 {
		position: absolute;
		width: 2%;
		bottom: 8%;
		left: 47.5%;
	}

	.b3 {
		position: absolute;
		width: 2%;
		bottom: 10%;
		left: 52%;
	}

	.b4 {
		position: absolute;
		width: 2%;
		bottom: 5%;
		left: 56%;
	}

}
</style>