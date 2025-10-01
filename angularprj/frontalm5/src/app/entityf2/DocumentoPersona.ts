import { DocumentoPersonaId } from "./DocumentoPersonaId";
import { Persona } from "./Persona";
import { TipoDocumento } from "./TipoDocumento";

export class DocumentoPersona {

  id!: DocumentoPersonaId;
  noDocumento!: String;
  fechaCreacion!: Date;
  usuarioCreacion!: String;
  fechaModificacion!: Date;
  usuarioModificacion!: String;

  tipoDocumento!: TipoDocumento;
  persona!: Persona;

}
