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
                :aria-error="cadastro.apresentacao.erroNome"
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
                <option
                    v-for="modalidade in modalidades"
                    :key="modalidade.cod"
                    :value="modalidade.cod"
                >
                    {{ modalidade.nome }}
                </option>
            </select>
        </Controller>

        <Controller label="* Descrição da apresentação" for="descricao">
            <textarea
                id="descricao"
                required
                class="input h-[30px]"
                :aria-error="cadastro.apresentacao.erroDescricao"
                placeholder="Vou começar a apresentação com..."
                v-model="apresentacao.descricao"
                @input="handleTextareaInput"
            ></textarea>
            <div
                class="text-start text-sm text-neutral-600 dark:text-neutral-300"
            >
                Descreva sua apresentação, o tempo de duração estimado e
                adicione os links necessários. Música: Adicione qual (ou quais)
                música você irá performar, com seu reespectivo link.
            </div>
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
        <div v-if="erro" class="text-center text-amber-500 text-sm">
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
const modalidades = computed(() => cadastro.modalidades);

const handleTextareaInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = `${target.scrollHeight + 2}px`;
};

const erro = ref<string | null>(null);

const validar = () => {
    erro.value = null;
    cadastro.apresentacao.erroNome = false;
    cadastro.apresentacao.erroDescricao = false;

    const tamanhoNome = apresentacao.value.nome.trim().length;
    const tamanhoDescricao = apresentacao.value.descricao.trim().length;

    if (tamanhoNome < 8) {
        erro.value = "O nome da apresentação deve ter pelo menos 8 caracteres.";
        cadastro.apresentacao.erroNome = true;
        return true;
    } else if (tamanhoDescricao < 20) {
        erro.value = "A descrição deve ter pelo menos 20 caracteres.";
        cadastro.apresentacao.erroDescricao = true;
        return true;
    }

    return false;
};

const handleSubmit = () => {
    const erroValidacao = validar();
    if (erroValidacao) return;

    emit("prox");
};
</script>
