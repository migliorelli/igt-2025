<template>
    <Base>
        <Container class="flex flex-col gap-6 items-center">
            <Logo />
            <CadastroApresentacao v-if="fase === 0" @prox="prox" />
            <CadastroParticipantes v-if="fase === 1" @anterior="anterior" />
        </Container>
    </Base>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Base from "../components/Base.vue";
import CadastroApresentacao from "../components/CadastroApresentacao.vue";
import CadastroParticipantes from "../components/CadastroParticipantes.vue";
import Container from "../components/Container.vue";
import Logo from "../components/Logo.vue";

const fase = ref(0);

const anterior = () => {
    if (fase.value === 1) fase.value--;
};

const prox = () => {
    if (fase.value === 0) fase.value++;
};
</script>
