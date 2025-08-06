import { defineStore } from "pinia";
import http from "../lib/http.ts";

const VOUCHER_TTL = 1000 * 60 * 5; // 5 minutes

type Voucher = {
    value: string;
    expiresAt: number;
};

const voucherStore = defineStore("voucher", {
    state: () => ({
        voucher: null as Voucher | null,
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async login(voucher: string) {
            this.loading = true;
            this.error = null;

            try {
                const response = await http.get(`/vouchers/${voucher}`);

                if (response.data && response.data.valid) {
                    this.error = null;
                    this.voucher = {
                        value: voucher,
                        expiresAt: Date.now() + VOUCHER_TTL,
                    };
                } else {
                    this.voucher = null;
                    this.error = "Invalid voucher code.";
                }
            } catch (err) {
                this.error = "An error occurred while checking the voucher.";
            } finally {
                this.loading = false;
            }
        },
    },

    persist: { storage: localStorage },
});

export default voucherStore;
