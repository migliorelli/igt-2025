<template>
    <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-4 items-center w-full sm:max-w-md"
    >
        <h1 class="text-lg">Cadastro de Participantes</h1>

        <div class="flex flex-col gap-6 w-full">
            <div
                v-for="(participante, index) in participantes"
                :key="participante.id"
                class="flex flex-col gap-4 items-center w-full"
            >
                <div class="w-full flex justify-between items-center">
                    <h2>Participante {{ index + 1 }}</h2>
                    <button
                        v-if="index > 0"
                        type="button"
                        class="btn btn-border px-2 h-8"
                        @click="removerParticipante(index)"
                        :disabled="loading"
                    >
                        Remover
                    </button>
                </div>
                <Controller label="* Nome completo" for="nome">
                    <input
                        type="text"
                        id="nome"
                        class="input"
                        required
                        :class="participante.erroNome && 'border-rose-500'"
                        :value="participante.nome"
                        @input="
                            (e) =>
                                (participante.nome =
                                    (e.target as HTMLInputElement).value || '')
                        "
                        placeholder="Asdrubal Soares Ribeiro"
                        :disabled="loading"
                    />
                </Controller>

                <Controller label="* Telefone" for="telefone">
                    <input
                        type="tel"
                        id="telefone"
                        class="input"
                        :class="participante.erroTelefone && 'border-rose-500'"
                        required
                        :value="participante.telefone"
                        @input="
                            (e) =>
                                (participante.telefone =
                                    (e.target as HTMLInputElement).value || '')
                        "
                        placeholder="27 99123456789"
                        :disabled="loading"
                    />
                </Controller>

                <Controller label="* Turma" for="turma">
                    <select
                        id="turma"
                        class="input min-h-[30px]"
                        :value="participante.turma"
                        @change="
                            (e) =>
                                (participante.turma =
                                    (e.target as HTMLSelectElement).value || '')
                        "
                        required
                        :disabled="loading"
                    >
                        <option value="" disabled>Selecionar</option>
                        <option value="0">M01</option>
                        <option value="1">M02</option>
                        <option value="2">M03</option>
                    </select>
                </Controller>
            </div>
        </div>

        <button
            class="btn btn-border w-full"
            type="button"
            @click="adicionarParticipante"
            :disabled="loading"
        >
            Adicionar participante
        </button>

        <div class="flex w-full gap-2">
            <button
                type="button"
                class="btn w-full flex-1"
                @click="anterior"
                :disabled="loading"
            >
                Voltar
            </button>
            <button type="submit" class="btn w-full flex-2" :disabled="loading">
                {{ loading ? "Carregando..." : "Enviar" }}
            </button>
        </div>
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
    (e: "anterior"): void;
    (e: "prox"): void;
}

const emit = defineEmits<Emits>();

const cadastro = useCadastroStore();
const participantes = computed(() => cadastro.participantes);

const removerParticipante = (index: number) => {
    cadastro.removerParticipante(index);
};

const adicionarParticipante = () => {
    cadastro.adicionarParticipante();
};

const loading = ref(false);
const erro = ref<string | null>(null);

const anterior = () => {
    emit("anterior");
};

const validarTelefone = (numero: string): boolean => {
    const apenasDigitos = numero.replace(/\D/g, "");
    return apenasDigitos.length === 11;
};

const handleSubmit = async () => {
    erro.value = null;
    participantes.value.forEach((p) => {
        p.erroTelefone = false;
        p.erroNome = false;
    });

    const nomeErrado = participantes.value.find((p) => {
        return p.nome.trim().length < 3 || p.nome.trim().split(" ").length < 2;
    });

    if (nomeErrado) {
        nomeErrado.erroNome = true;
        erro.value =
            "Nome inválido. Deve conter pelo menos 3 caracteres e 2 nomes.";
        return;
    }

    const telefoneErrado = participantes.value.find(
        (p) => !validarTelefone(p.telefone),
    );

    if (telefoneErrado) {
        telefoneErrado.erroTelefone = true;
        erro.value =
            "Número de telefone inválido. Deve seguir o formato 27 99123456789.";
        return;
    }

    loading.value = true;

    try {
        const erroCadastro = await cadastro.cadastrar();
        if (erroCadastro) {
            erro.value = erroCadastro;
            return;
        }

        emit("prox");
    } catch (error) {
        erro.value = "Erro ao enviar os participantes. Tente novamente.";
    } finally {
        loading.value = false;
    }
};
</script>
