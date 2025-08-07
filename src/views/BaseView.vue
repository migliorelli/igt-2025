<template>
    <Base>
        <Container class="flex flex-col gap-6 items-center">
            <Logo />
            <div class="flex flex-col gap-2 w-full sm:max-w-[260px]">
                <button class="btn cursor-default" disabled>Votar</button>
                <RouterLink to="/cadastro" class="btn cursor-default" disabled>
                    Quero me candidatar
                </RouterLink>
            </div>
        </Container>
    </Base>
</template>
<script setup lang="ts">
import Base from "../components/Base.vue";
import Container from "../components/Container.vue";
import Logo from "../components/Logo.vue";
</script>
