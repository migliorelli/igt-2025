export interface Curso {
    cod: number;
    nome: string;
}

export interface Turma {
    cod: number;
    cod_curso: number;
    curso: Curso;
    nome: string;
    ano: number;
}

export interface Candidato {
    cod: number;
    nome: string;
    telefone: string;
    cod_turma: number;
    turma: Turma;
}

export interface Modalidade {
    cod: number;
    nome: string;
    aberta?: boolean;
}

export interface Apresentacao {
    cod: number;
    nome: string;
    descricao: string;
    cod_modalidade: number;
    modalidade: Modalidade;
    anexos: string;
}

export interface Grupo {
    apresentacao: Apresentacao;
    candidatos: Candidato[];
}
