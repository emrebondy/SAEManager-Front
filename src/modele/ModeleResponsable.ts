import { ModeleSae } from './ModeleSAE';


export interface ModeleResponsable {
    idResp: number;
    sae?: Pick<ModeleSae, 'idSAE'>;
  }