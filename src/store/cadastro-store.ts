import { defineStore } from "pinia";
import http from "../lib/http.ts";

interface Participante {
    nome: string;
    telefone: string;
    turma: string;
    erroTelefone: boolean;
    erroNome: boolean;
}

interface Curso {
    cod: number;
    nome: string;
}

interface Turma {
    cod: number;
    cod_curso: number;
    curso: Curso;
    ano: number;
    nome: string;
}

interface Modalidade {
    cod: number;
    nome: string;
}

const initialState = {
    turmas: [] as Turma[],
    modalidades: [] as Modalidade[],
    carregando: true,
    carregandoEnvio: false,
    erro: null as string | null,
    erroEnvio: null as string | null,
    apresentacao: {
        nome: "",
        descricao: "",
        modalidade: "",
        anexo: "",
        erroNome: false,
        erroDescricao: false,
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

        async enviar() {
            this.carregandoEnvio = true;
            this.erroEnvio = null;
            
            let anexo = this.apresentacao.anexo;
            if (anexo.trim().length === 0) {
                anexo = window.location.origin
            }

            try {
                await http.post("/grupo", {
                    descricao: this.apresentacao.descricao,
                    nome: this.apresentacao.nome,
                    anexos: anexo,
                    modalidade: Number(this.apresentacao.modalidade),
                    candidatos: this.participantes.map((p) => ({
                        nome: p.nome,
                        telefone: p.telefone,
                        turma: Number(p.turma),
                    })),
                });
            } catch (error) {
                this.erro = (error as Error).message;
                return false;
            } finally {
                this.carregandoEnvio = false;
            }

            return true;
        },
        async carregarDados() {
            this.carregando = true;
            this.erro = null;

            try {
                const [resTurmas, resModalidades] = await Promise.all([
                    http.get("/turma"),
                    http.get("/modalidade"),
                ]);

                this.turmas = resTurmas.data;
                this.modalidades = resModalidades.data;
            } catch (error) {
                this.erro =
                    "Não foi possível carregar os dados: " +
                    (error as Error).message;
            } finally {
                this.carregando = false;
            }
        },
    },
});

export default useCadastroStore;
