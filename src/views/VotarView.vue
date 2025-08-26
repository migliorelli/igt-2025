<template>
    <Base>
        <Container class="flex flex-col gap-8 items-center">
            <div class="animate-fade-in-up">
                <Logo />
            </div>
            <VotarLogin
                v-if="voucher === null"
                @entrar="(v) => (voucher = v)"
            />
            <VotarGrupos v-else :voucher="voucher" />
        </Container>
    </Base>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Base from "../components/Base.vue";
import Container from "../components/Container.vue";
import Logo from "../components/Logo.vue";
import VotarGrupos from "../components/VotarGrupos.vue";
import VotarLogin from "../components/VotarLogin.vue";

const voucher = ref<null | string>(null);
</script>
