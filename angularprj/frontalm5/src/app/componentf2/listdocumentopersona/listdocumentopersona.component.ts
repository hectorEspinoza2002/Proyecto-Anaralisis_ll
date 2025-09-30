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
export class ListdocumentopersonaComponent  {
  //implements OnInit
}
