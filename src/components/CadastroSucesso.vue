<template>
    <div class="flex flex-col items-center gap-6">
        <h1 class="text-2xl font-bold text-center">
            Cadastro realizado com sucesso!
        </h1>
        <p class="text-center text-gray-600 dark:text-neutral-200">
            Sua apresentação foi cadastrada. Em breve, entraremos em contato
            para mais detalhes.
        </p>
        <button class="btn" @click="router.push('/')">
            Voltar para a página inicial
        </button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>
