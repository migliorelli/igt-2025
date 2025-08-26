<template>
    <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-4 items-center w-full sm:max-w-md"
    >
        <h1 class="text-lg">Entrar com voucher</h1>
        <Controller label="* Voucher" for="voucher">
            <input
                type="text"
                id="voucher"
                class="input"
                required
                placeholder="dGB2n3a"
                :aria-error="erroVoucher"
                v-model="voucher"
            />
        </Controller>
        <button type="submit" class="btn w-full" :disabled="carregando">
            {{ carregando ? "Carregando..." : "Entrar" }}
        </button>
        <div v-if="erro" class="text-center text-amber-500 text-sm">
            {{ erro }}
        </div>
    </form>
</template>

<script setup lang="ts">
import type { AxiosError } from "axios";
import { onMounted, ref } from "vue";
import http from "../lib/http";
import Controller from "./Controller.vue";

interface Emits {
    (e: "entrar", voucher: string): void;
}

const emit = defineEmits<Emits>();

const voucher = ref<string>("");
const erro = ref<string | null>(null);
const erroVoucher = ref(false);
const carregando = ref(false);

const validar = () => {
    erro.value = null;
    erroVoucher.value = false;
    const tamanhoVoucher = voucher.value.trim().length;

    if (tamanhoVoucher != 8) {
        erro.value = "O voucher teve ter 8 caracteres alfanuméricos.";
        erroVoucher.value = true;
        return true;
    }

    return false;
};

const handleSubmit = async () => {
    const erroValidacao = validar();
    if (erroValidacao) return;

    carregando.value = true;
    try {
        const voucherTrim = voucher.value.trim();

        const response = await http.post("/voucher/verificar", {
            voucher: voucherTrim,
        });

        if (response.status !== 200) {
            erro.value = "Ocorreu um erro inesperado. Tente novamente.";
            return;
        }

        localStorage.setItem("voucher", voucherTrim);
        emit("entrar", voucherTrim);
    } catch (e) {
        const err = e as AxiosError;
        const data = err.response?.data as any;
        erro.value = data.error as string;
        return;
    } finally {
        carregando.value = false;
    }
};

onMounted(() => {
    const voucherSalvo = localStorage.getItem("voucher");
    if (voucherSalvo) {
        voucher.value = voucherSalvo;
    }
});
</script>
