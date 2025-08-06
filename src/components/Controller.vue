<script setup lang="ts">
interface Props {
    label?: string;
    for?: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="w-full flex flex-col gap-1">
        <label class="text-start text-sm" :for="props.for" v-if="label">
            {{ label }}
        </label>
        <slot></slot>
    </div>
</template>
