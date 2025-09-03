<template>
    <div
        @click="click"
        class="bg-white dark:bg-neutral-800 rounded-lg p-4 border-2 border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
        :class="{
            'border-primary-500 bg-primary-50 dark:bg-primary-900/20':
                grupoSelecionado === grupo.apresentacao.cod,
            'hover:border-primary-300':
                grupoSelecionado !== grupo.apresentacao.cod,
        }"
    >
        <div class="flex flex-col gap-3">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <h3 class="font-semibold text-lg">
                        {{ grupo.apresentacao.nome }}
                    </h3>
                </div>
                <div
                    v-if="grupoSelecionado === grupo.apresentacao.cod"
                    class="ml-2 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center"
                >
                    <svg
                        class="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </div>
            </div>

            <div v-if="grupo.candidatos.length > 0">
                <h4 class="text-sm font-medium mb-2">Participantes:</h4>
                <div class="flex flex-wrap gap-2">
                    <span
                        v-for="candidato in grupo.candidatos"
                        :key="candidato.cod"
                        class="inline-flex items-center px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs"
                    >
                        {{ candidato.nome }} ({{ candidato.turma?.nome }})
                    </span>
                </div>
            </div>

            <div v-if="imagemUrl" class="w-full aspect-square">
                <img
                    :src="imagemUrl"
                    alt="Imagem da apresentação"
                    class="w-full h-full object-cover rounded border border-neutral-200 dark:border-neutral-700"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Grupo } from "../types";

interface Props {
    grupo: Grupo;
    grupoSelecionado: number | null;
}

interface Emits {
    (e: "selecionarGrupo", cod: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const imagemUrl = computed(() => {
    const foto = props.grupo.apresentacao.foto;
    if (!foto) return null;
    return foto.startsWith("data:") ? foto : `data:image/jpeg;base64,${foto}`;
});

const click = () => {
    emit("selecionarGrupo", props.grupo.apresentacao.cod);
};
</script>
