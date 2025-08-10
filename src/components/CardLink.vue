<script setup lang="ts">
interface Props {
    desativado?: boolean;
    href?: string;
    titulo: string;
    descricao: string;
    conteudoBotao: string;
}

withDefaults(defineProps<Props>(), {
    desativado: false,
    href: "#",
});
</script>

<template>
    <div
        class="bg-white w-full dark:bg-neutral-800 rounded-xl p-6 border flex flex-col border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300"
    >
        <div class="flex items-center gap-3 mb-3">
            <h3 class="font-semibold text-neutral-800 dark:text-neutral-200">
                {{ titulo }}
            </h3>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            {{ descricao }}
        </p>
        <RouterLink
            :to="href"
            :aria-disabled="desativado"
            class="btn w-full inline-flex items-center justify-center mt-auto"
        >
            {{ conteudoBotao }}
        </RouterLink>
    </div>
</template>
