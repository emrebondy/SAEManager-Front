import { ModeleResponsable } from "./ModeleResponsable";


export interface ModeleSae {
    idSAE: number;
    nomSae: string;
    anneeUniversitaire: string;
    semestreUniversitaire: number;
    sujet: string;
    dateModificationSujet: string;
    responsablesSae: ModeleResponsable[];
  }