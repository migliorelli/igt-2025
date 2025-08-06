<template>
    <Base>
        <Container class="flex gap-4 flex-col items-center justify-center">
            <h1 class="text-2xl">Página não encontrada</h1>
            <RouterLink to="/" class="btn">Voltar</RouterLink>
        </Container>
    </Base>
</template>

<script setup lang="ts">
import Base from "../components/Base.vue";
import Container from "../components/Container.vue";
</script>
