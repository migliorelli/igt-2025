<template>
    <Base>
        <Container class="flex flex-col gap-8 items-center">
            <div class="animate-fade-in-up">
                <Logo />
            </div>

            <div
                class="text-center max-w-2xl animate-fade-in-up"
                style="animation-delay: 0.3s"
            >
                <p
                    class="text-lg text-gray-600 dark:text-gray-300 mb-2 leading-relaxed"
                >
                    Bem-vindo ao melhor show de talentos do IFES! 🌟
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Se cadastre e mostre ao IFES o que você sabe fazer de
                    melhor!
                </p>
            </div>

            <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-auto mx-auto animate-fade-in-up"
                style="animation-delay: 0.6s"
            >
                <CardLink
                    titulo="Votação"
                    descricao="Vote nos seus candidatos favoritos"
                    conteudo-botao="Em breve!"
                    desativado
                />

                <CardLink
                    titulo="Cadastro"
                    descricao="Cadastre-se e mostre seu talento"
                    conteudo-botao="Quero me cadastrar!"
                    href="/cadastro"
                />
            </div>
        </Container>
    </Base>
</template>

<script setup lang="ts">
import Base from "../components/Base.vue";
import CardLink from "../components/CardLink.vue";
import Container from "../components/Container.vue";
import Logo from "../components/Logo.vue";
</script>
