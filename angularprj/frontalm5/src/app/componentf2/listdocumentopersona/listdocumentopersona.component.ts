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

  // Variables para el formulario
  editando: boolean = false;
  selectedTipoDoc!: number;
  noDocumento: string = '';
  docSeleccionado!: DocumentoPersona | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dPersonaService: DocumentopersonaService
  ) {}

  ngOnInit(): void {
    // Obtenemos el idPersona de la URL
    this.personaId = Number(this.route.snapshot.paramMap.get('idPersona'));

    // Traemos documentos por persona
    this.cargarDocumentos();

    /* Traemos tipos de documento*/
    this.dPersonaService.getTiposDocumento().subscribe((data) => {
      this.tiposDocumento = data;
    });

  }

  cargarDocumentos(): void {
    this.dPersonaService.getDocumentosByPersona(this.personaId).subscribe((data) => {
      this.docPersona = data;
    });
  }

  // Guardar o actualizar documento
  guardarDocumento(): void {
    if (!this.selectedTipoDoc || !this.noDocumento) {
      alert('Debe seleccionar tipo de documento y número');
      return;
    }

    const nuevoDoc: any = {
      id: {
        tipoDocumentoId: this.selectedTipoDoc,
        personaId: this.personaId,
      },
      noDocumento: this.noDocumento,
      tipoDocumento: { idTipoDocumento: this.selectedTipoDoc },
      persona: { idPersona: this.personaId },
    };

    if (this.editando && this.docSeleccionado) {
      this.dPersonaService
        .updateDocumento(
          this.docSeleccionado.id.tipoDocumento,
          this.docSeleccionado.id.persona,
          nuevoDoc
        )
        .subscribe(() => {
          alert('Documento actualizado correctamente');
          this.cargarDocumentos();
          this.resetForm();
        });
    } else {
      this.dPersonaService.createDocumento(nuevoDoc).subscribe(() => {
        alert('Documento agregado correctamente');
        this.cargarDocumentos();
        this.resetForm();
      });
    }
    }

  // Editar documento
  selectDoc(doc: DocumentoPersona): void {
    this.editando = true;
    this.docSeleccionado = doc;
    this.selectedTipoDoc = doc.tipoDocumento.idTipoDocumento;
    this.noDocumento = doc.noDocumento;
  }

  // Eliminar documento
  deleteDoc(doc: DocumentoPersona): void {
    if (confirm('¿Seguro que deseas eliminar este documento?')) {
      this.dPersonaService
        .deleteDocumento(doc.id.tipoDocumento, doc.id.persona)
        .subscribe(() => {
          alert('Documento eliminado correctamente');
          this.docPersona = this.docPersona.filter((d) => d !== doc);
        });
    }
  }

  // Resetear formulario
  resetForm(): void {
    this.editando = false;
    this.docSeleccionado = null;
    this.selectedTipoDoc = null!;
    this.noDocumento = '';
  }

  // Regresar
  volver(): void {
    this.router.navigate(['/listpersona']);
  }
  /*
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
  */

}
