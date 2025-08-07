import { defineStore } from "pinia";

interface Participante {
    nome: string;
    telefone: string;
    turma: string;
    erroTelefone: boolean;
    erroNome: boolean;
}

const initialState = {
    apresentacao: {
        nome: "",
        descricao: "",
        modalidade: "",
        anexo: "",
    },
    participantes: [
        {
            nome: "",
            telefone: "",
            turma: "",
            erroTelefone: false,
            erroNome: false,
        },
    ] as Participante[],
};

const useCadastroStore = defineStore("cadastro", {
    state: () => initialState,

    actions: {
        adicionarParticipante() {
            this.participantes.push({
                nome: "",
                telefone: "",
                turma: "",
                erroTelefone: false,
                erroNome: false,
            });
        },

        removerParticipante(index: number) {
            if (this.participantes.length > 1) {
                this.participantes.splice(index, 1);
            }
        },

        async cadastrar() {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return "teve um erro ai";
        },
    },
});

export default useCadastroStore;
