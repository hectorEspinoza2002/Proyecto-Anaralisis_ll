import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentoPersona } from '../entityf2/DocumentoPersona';
import { TipoDocumento } from '../entityf2/TipoDocumento';

@Injectable({
  providedIn: 'root',
})
export class DocumentopersonaService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  // Obtener documentos por persona
  getDocumentosByPersona(idPersona: number): Observable<DocumentoPersona[]> {
    return this.http.get<DocumentoPersona[]>(`${this.Url}/list_documento_persona/persona/${idPersona}`);
  }

  // Obtener todos los tipos de documento
  getTiposDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.Url}/list_tipo_documentos`); // Asegúrate de tener este endpoint
  }

  // Crear nuevo documento
  createDocumento(documento: any): Observable<any> {
    return this.http.post(`${this.Url}/create_documento_persona`, documento);
  }

  // Actualizar documento
  updateDocumento(tipoDocumentoId: number, personaId: number, documento: any): Observable<any> {
    return this.http.put(`${this.Url}/update_documento_persona/${tipoDocumentoId}/${personaId}`, documento);
  }

  // Eliminar documento
  deleteDocumento(tipoDocumentoId: number, personaId: number): Observable<any> {
    return this.http.delete(`${this.Url}/delete_documento_persona/${tipoDocumentoId}/${personaId}`);
  }

}
