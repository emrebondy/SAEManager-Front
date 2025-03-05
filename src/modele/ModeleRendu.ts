import {ModeleEvaluation} from './ModeleEvaluation';

export interface ModeleRendu {
  idRendu: number | null;
  nom: string;
  dateLimite: string;
  sae: {
    idSAE: number;
  };
  evaluation: ModeleEvaluation | null;
}
