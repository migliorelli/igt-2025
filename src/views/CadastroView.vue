<template>
    <Base>
        <Container class="flex flex-col gap-6 items-center">
            <Logo />
            <form
                @submit.prevent="handleSubmit"
                class="flex flex-col gap-4 items-center w-full sm:max-w-md"
            >
                <h1 class="text-lg">Formulário de Cadastro</h1>
                <Controller label="* Nome completo" for="nome">
                    <input
                        type="text"
                        id="nome"
                        class="input"
                        required
                        placeholder="Asdrubal Soares Ribeiro"
                        v-model="nome"
                    />
                </Controller>

                <Controller label="* Telefone" for="telefone">
                    <input
                        type="tel"
                        id="telefone"
                        class="input"
                        required
                        v-model="telefone"
                        placeholder="27 99123456789"
                    />
                </Controller>

                <Controller label="* Tipo de apresentação" for="tipo">
                    <select
                        id="tipo"
                        class="input min-h-[30px]"
                        required
                        v-model="tipo"
                    >
                        <option value="" disabled>Selecionar</option>
                        <option value="0">Dança</option>
                        <option value="1">Música</option>
                        <option value="2">Outros</option>
                    </select>
                </Controller>

                <Controller label="* Descrição da Apresentação" for="descricao">
                    <textarea
                        id="descricao"
                        required
                        class="input h-[30px]"
                        placeholder="Vou começar a apresentação com..."
                        v-model="descricao"
                        @input="handleTextareaInput"
                    ></textarea>
                </Controller>

                <Controller label="Link complementar" for="link">
                    <input
                        type="url"
                        id="link"
                        class="input"
                        v-model="link"
                        placeholder="https://youtu.be/xvFZjo5PgG0"
                    />
                </Controller>

                <button type="submit" class="btn w-full">Enviar</button>
                <div v-if="erro" class="text-center text-rose-500 text-sm">
                    {{ erro }}
                </div>
            </form>
        </Container>
    </Base>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Base from "../components/Base.vue";
import Container from "../components/Container.vue";
import Controller from "../components/Controller.vue";
import Logo from "../components/Logo.vue";

const nome = ref("");
const telefone = ref("");
const tipo = ref("");
const descricao = ref("");
const link = ref("");

const erro = ref<string | null>(null);

const handleTextareaInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = `${target.scrollHeight + 2}px`;
};

const validarTelefone = (numero: string): boolean => {
    const apenasDigitos = numero.replace(/\D/g, "");
    return apenasDigitos.length === 11;
};

const handleSubmit = (event: Event) => {
    erro.value = null;
    if (!validarTelefone(telefone.value)) {
        erro.value =
            "Número de telefone inválido. Deve seguir o formato 27 99123456789.";
        return;
    }

    console.log("Form submitted");
};
</script>
