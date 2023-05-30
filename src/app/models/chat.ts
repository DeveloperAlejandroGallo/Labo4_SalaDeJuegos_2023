import { Timestamp } from "firebase/firestore";
import { Usuario } from "./user.interface";

export interface Chat {
  id: string;
  mensaje: string;
  fechaYHoraDate: Date;
  fechaYHoraString: string;
  remitente: Usuario;
  destinatario: Usuario;
}
