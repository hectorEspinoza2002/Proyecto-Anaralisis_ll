import { Component, OnInit } from '@angular/core';
import { DocumentoPersona } from '../../entityf2/DocumentoPersona';
import { DocumentopersonaService } from '../../servicef2/documentopersona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipodocumentoService } from '../../servicef2/tipodocumento.service';
import { TipoDocumento } from '../../entityf2/TipoDocumento';

@Component({
  selector: 'app-listdocumentopersona',
  standalone: false,
  templateUrl: './listdocumentopersona.component.html',
  styleUrl: './listdocumentopersona.component.css',
})
export class ListdocumentopersonaComponent  implements OnInit{
  docPersona: DocumentoPersona[] = [];
  tiposDocumento: TipoDocumento[] = [];
  personaId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dPersonaService: DocumentopersonaService
  ) {}

  ngOnInit(): void {
    // Obtenemos el idPersona de la URL
    this.personaId = Number(this.route.snapshot.paramMap.get('idPersona'));

    // Traemos documentos por persona
    this.dPersonaService.getDocumentosByPersona(this.personaId).subscribe((data) => {
      this.docPersona = data;
    });
  }

  // Eliminar documento
  deleteDoc(doc: DocumentoPersona): void {
    if (confirm('¿Seguro que deseas eliminar este documento?')) {
      this.dPersonaService.deleteDocumento(doc.id.tipoDocumento, doc.id.persona).subscribe(() => {
        alert('Documento eliminado correctamente');
        this.docPersona = this.docPersona.filter(d => d !== doc);
      });
    }
  }

  // Regresar al listado de personas
  volver(): void {
    this.router.navigate(['/listpersona']);
  }

  getNombreTipoDocumento(tipoDocumentoId: number): string {
  const tipo = this.tiposDocumento.find(td => td.idTipoDocumento === tipoDocumentoId);
  return tipo ? tipo.nombre : '';
}

}
