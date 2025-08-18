<template>
    <Base>
        <Container class="flex flex-col gap-6 items-center">
            <Logo class="animate-fade-in-up" />
            <template v-if="carregando">
                <IconeCarregando class="animate-fade-in-up" />
            </template>
            <template v-else-if="!carregando && erro">
                <div class="text-center text-rose-500 text-sm">{{ erro }}</div>
            </template>
            <template v-else>
                <CadastroApresentacao v-if="fase === 0" @prox="prox" />
                <CadastroParticipantes
                    v-if="fase === 1"
                    @anterior="anterior"
                    @prox="prox"
                />
                <CadastroSucesso v-if="fase === 2" />
            </template>
        </Container>
        <TextoBaixo />
    </Base>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Base from "../components/Base.vue";
import CadastroApresentacao from "../components/CadastroApresentacao.vue";
import CadastroParticipantes from "../components/CadastroParticipantes.vue";
import CadastroSucesso from "../components/CadastroSucesso.vue";
import Container from "../components/Container.vue";
import IconeCarregando from "../components/IconeCarregando.vue";
import Logo from "../components/Logo.vue";
import TextoBaixo from "../components/TextoBaixo.vue";
import useCadastroStore from "../store/cadastro-store.ts";

const cadastro = useCadastroStore();
const carregando = computed(() => cadastro.carregando);
const erro = computed(() => cadastro.erro);

const fase = ref(0);

const anterior = () => {
    if (fase.value === 1) fase.value--;
};

const prox = () => {
    if (fase.value < 2) fase.value++;
};

onMounted(cadastro.carregarDados);
</script>
