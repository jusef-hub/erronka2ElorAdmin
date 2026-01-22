export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    nombre: string;
    apellidos: string;
    dni?: string;
    direccion?: string;
    telefono1: number| null;
    telefono2?: number| null;
    tipo_id: number;
    argazkia_url?: string;
    created_at?: Date;
    updated_at?: Date;
}
export interface Tipo{
    id: number;
    name: string;
    name_eu: string;
}

export enum Estado {
  pendiente = 'pendiente',
  aceptada = 'aceptada',
  denegada = 'denegada',
  conflicto = 'conflicto',
}


export interface Reunion{
    id_reunion: number;
    estado: Estado;
    estado_eus?: string;
    profesor_id?: number;
    alumno_id: number;
    id_centro: number;
    titulo?: string;
    asunto?: string;
    aula?: string;
    fecha: Date;
    created_at: Date;
    updated_at: Date;
}

export interface Modulo{
    id:number;
    nombre:string;
    nombre_eus:string;
    horas:number;
    ciclo_id:number;
    curso:number;
}

export interface Matriculacion{
    id:number;
    alum_id:number;
    ciclo_id:number;
    curso:number;
    fecha:Date;
}



export interface Horario{
    id:number;
    dia:string;
    hora:number;
    profe_id:number;
    modulo_id:number;
    aula?:string;
}

export enum Ciclos {
  DAM = 'DAM',
  ASIR = 'ASIR',
  DAW = 'DAW',
  OTROS = 'OTROS',
}

export interface Ciclo{
    id:number;
    nombre:Ciclos;
}

export interface Ikastetxea {
  CCEN: number;      
  NOM: string;      
  NOME: string;     
  DGENRC: string;   
  DGENRE: string;   
  GENR: string;      
  MUNI: number;      
  DMUNIC: string;    
  DMUNIE: string;    
  DTERRC: string;    
  DTERRE: string;    
  DEPE: number;      
  DTITUC: string;    
  DTITUE: string;    
  DOMI: string;      
  CPOS: number;      
  TEL1: number;      
  TFAX: number;      
  EMAIL: string;     
  PAGINA: string;    
  COOR_X: number;   
  COOR_Y: number;    
  LATITUD: number;   
  LONGITUD: number;  
}
