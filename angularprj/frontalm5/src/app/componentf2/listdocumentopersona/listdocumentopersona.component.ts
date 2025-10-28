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
export class ListdocumentopersonaComponent implements OnInit {
  docPersona: DocumentoPersona[] = [];
  tiposDocumento: TipoDocumento[] = [];
  personaId!: number;

  // Variables para el formulario
  editando: boolean = false;
  selectedTipoDoc!: number;
  noDocumento: string = '';
  docSeleccionado!: DocumentoPersona | null;

  mostrarFormulario: boolean = false;


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
    this.dPersonaService
      .getDocumentosByPersona(this.personaId)
      .subscribe((data) => {
        this.docPersona = data;
      });
  }

  // Guardar o actualizar documento
  guardarDocumento(): void {
    if (!this.selectedTipoDoc || !this.noDocumento) {
      alert('Debe seleccionar tipo de documento y número');
      return;
    }

    //validamos la longitud
    const longitudEsperada =
      this.documentoLongitudes[this.selectedTipoDoc] || 0;
    if (longitudEsperada > 0 && this.noDocumento.length !== longitudEsperada) {
      alert('El documento debe tener exactamente ${longitudEsperada} digitos');
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

    if (this.editando) {
      this.dPersonaService
        .updateDocumento(this.selectedTipoDoc, this.personaId, nuevoDoc)
        .subscribe(() => {
          alert('Documento actualizado correctamente');
          this.cargarDocumentos();
          this.resetForm();
        });
    } else {
      this.dPersonaService.createDocumento(nuevoDoc).subscribe({
        next: (response) => {
          alert('Documento guardado correctamente ✅');
          console.log(response);
          this.cargarDocumentos();
          this.resetForm();
        },
        error: (err) => {
          if (err.status === 400) {
            alert(err.error); // Aquí mostrará "Ya existe esta asignacion"
          } else {
            //alert('Error en el servidor ❌');
          }
          console.error(err);
        },
      });
    }
  }

  // Editar documento
  selectDoc(doc: DocumentoPersona): void {
    this.editando = true;
    this.mostrarFormulario = true;
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
    this.mostrarFormulario = false;
  }

  // Regresar
  volver(): void {
    this.router.navigate(['/listsaldocuenta']);
  }

  documentoLongitudes: { [key: number]: number } = {
    1: 13, //dpi
    2: 15, //pasaporte
    3: 9, //nit
    4: 13, //licencia
    5: 13, //igss
  };

  longitudDocumento: number = 0;

  onTipoDocChange() {
    this.longitudDocumento =
      this.documentoLongitudes[this.selectedTipoDoc] || 0;
    this.noDocumento = ''; //limpiamos input al cambiar tipo
  }

  mostrarAgregar(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.selectedTipoDoc = null!;
    this.noDocumento = '';
  }
}
