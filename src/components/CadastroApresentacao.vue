<template>
    <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-4 items-center w-full sm:max-w-md"
    >
        <h1 class="text-lg">Cadastro de Apresentação</h1>
        <Controller label="* Nome da apresentação" for="nome">
            <input
                type="text"
                id="nome"
                class="input"
                required
                placeholder="Dança da música X"
                v-model="apresentacao.nome"
            />
        </Controller>

        <Controller label="* Modalidade da apresentação" for="modalidade">
            <select
                id="modalidade"
                class="input min-h-[30px]"
                required
                v-model="apresentacao.modalidade"
            >
                <option value="" disabled>Selecionar</option>
                <option value="0">Dança</option>
                <option value="1">Música</option>
                <option value="2">Outros</option>
            </select>
        </Controller>

        <Controller label="* Descrição simples da apresentação" for="descricao">
            <textarea
                id="descricao"
                required
                class="input h-[30px]"
                placeholder="Vou começar a apresentação com..."
                v-model="apresentacao.descricao"
                @input="handleTextareaInput"
            ></textarea>
        </Controller>

        <Controller label="Anexo complementar" for="anexo">
            <input
                type="url"
                id="anexo"
                class="input"
                v-model="apresentacao.anexo"
                placeholder="https://youtu.be/xvFZjo5PgG0"
            />
        </Controller>

        <button type="submit" class="btn w-full">Próximo</button>
        <div v-if="erro" class="text-center text-rose-500 text-sm">
            {{ erro }}
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import useCadastroStore from "../store/cadastro-store.ts";
import Controller from "./Controller.vue";

interface Emits {
    (e: "prox"): void;
}

const emit = defineEmits<Emits>();

const cadastro = useCadastroStore();
const apresentacao = computed(() => cadastro.apresentacao);

const erro = ref<string | null>(null);

const handleTextareaInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = `${target.scrollHeight + 2}px`;
};

const handleSubmit = () => {
    emit("prox");
};
</script>
