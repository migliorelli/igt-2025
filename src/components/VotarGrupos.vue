<template>
    <div class="flex flex-col gap-6 w-full relative" ref="parent">
        <h1 class="text-lg text-center">Votação - IGT 2025</h1>

        <div v-if="carregando" class="flex justify-center">
            <IconeCarregando />
        </div>

        <div v-else-if="erro" class="text-center text-rose-500 text-sm">
            <p class="mb-4">{{ erro }}</p>
            <button @click="carregarGrupos" class="btn">Atualizar</button>
        </div>

        <div
            v-else-if="sucessoVoto && votou"
            class="text-center text-green-600 dark:text-green-400 text-sm"
        >
            <p class="mb-4">{{ sucessoVoto }}</p>
            <button @click="carregarGrupos" class="btn">Atualizar</button>
        </div>

        <div v-else class="flex flex-col gap-6">
            <div class="text-center">
                <h2 class="text-xl font-semibold mb-2">
                    {{ modalidadeAberta?.nome }}
                </h2>
                <p class="text-sm text-neutral-600 dark:text-neutral-300">
                    Escolha sua apresentação favorita
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="!votou">
                <VotarCard
                    v-for="grupo in grupos"
                    :key="grupo.apresentacao.cod"
                    :grupo="grupo"
                    :grupo-selecionado="grupoSelecionado"
                    @selecionar-grupo="selecionarGrupo"
                />
            </div>

            <div class="flex flex-col gap-4 items-center">
                <button
                    v-if="!votou && grupoSelecionado"
                    @click="enviarVoto"
                    :disabled="votando || !grupoSelecionado"
                    class="btn px-8 py-3 h-14 text-lg w-full"
                    ref="btn"
                    :class="{
                        relative: !floating,
                        'fixed bottom-4 left-1/2 -translate-x-1/2': floating,
                    }"
                    :style="{ width: btnWidth }"
                >
                    {{ votando ? "Enviando voto..." : "Enviar Voto" }}
                </button>

                <p
                    v-if="erroVoto"
                    class="text-center text-rose-500 text-sm mt-16"
                >
                    {{ erroVoto }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AxiosError } from "axios";
import { onMounted, onUnmounted, ref, useTemplateRef } from "vue";
import http from "../lib/http";
import type { Grupo, Modalidade } from "../types";
import IconeCarregando from "./IconeCarregando.vue";
import VotarCard from "./VotarCard.vue";

interface Props {
    voucher: string;
}

const props = defineProps<Props>();

const carregando = ref(true);
const erro = ref<string | null>(null);
const erroVoto = ref<string | null>(null);
const sucessoVoto = ref<string | null>(null);
const votando = ref(false);
const votou = ref(false);

const grupos = ref<Grupo[]>([]);
const modalidadeAberta = ref<Modalidade | null>(null);
const grupoSelecionado = ref<number | null>(null);

const carregarGrupos = async () => {
    modalidadeAberta.value = null;
    grupoSelecionado.value = null;
    grupos.value = [];

    carregando.value = true;
    erro.value = null;
    votou.value = false;

    try {
        const response = await http.get(
            "/grupo/candidatos?voucher=" + props.voucher,
        );
        grupos.value = response.data;

        if (grupos.value !== null && grupos.value.length > 0) {
            const primeiraModalidade = grupos.value[0].apresentacao.modalidade;
            modalidadeAberta.value = primeiraModalidade;
        }
    } catch (e) {
        const err = e as AxiosError;
        erro.value =
            "Erro ao carregar apresentações: " +
                (err.response?.data as any)?.error || err.message;
    } finally {
        carregando.value = false;
    }
};

const selecionarGrupo = (codApresentacao: number) => {
    grupoSelecionado.value = codApresentacao;
    erroVoto.value = null;
    sucessoVoto.value = null;
};

const enviarVoto = async () => {
    if (!modalidadeAberta.value || !grupoSelecionado.value) return;

    votando.value = true;
    erroVoto.value = null;
    sucessoVoto.value = null;

    try {
        await http.post("/votar", {
            valor_voucher: props.voucher,
            cod_modalidade: modalidadeAberta.value.cod,
            cod_apresentacao: grupoSelecionado.value,
        });

        sucessoVoto.value = "Voto registrado com sucesso!";
        grupoSelecionado.value = null;
        votou.value = true;

        alert(sucessoVoto.value);
    } catch (e) {
        const err = e as AxiosError;
        const data = err.response?.data as any;

        if (err.response?.status === 409) {
            erroVoto.value = "Você já votou nesta modalidade!";
        } else {
            erroVoto.value = data?.error || "Erro ao registrar voto";
        }

        alert(erroVoto.value);
    } finally {
        votando.value = false;
    }
};

const floating = ref(true);
const btn = useTemplateRef("btn");
const parent = useTemplateRef("parent");
const btnWidth = ref("auto");

const handleScroll = () => {
    if (!btn.value) return;

    const floaterH = btn.value.offsetHeight;
    const shouldStop =
        window.scrollY + window.innerHeight <
        document.body.scrollHeight - floaterH - 16;

    floating.value = shouldStop;
};

onMounted(() => {
    carregarGrupos();

    window.addEventListener("scroll", handleScroll);

    if (!parent.value) return;
    btnWidth.value = `${parent.value.offsetWidth - 22}px`;
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>
