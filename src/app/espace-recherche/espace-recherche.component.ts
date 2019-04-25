import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import { critereList } from '../critere';



@Component({
  selector: 'app-espace-recherche',
  templateUrl: './espace-recherche.component.html',
  styleUrls: ['./espace-recherche.component.css']
})
export class EspaceRechercheComponent implements OnInit {

  private displayDiagnostic = false;
  
  
  critereForm = this.fb.group({
    Sexe: [""],
    nbEyes: [""],
    Skins: [""]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.critereForm.valueChanges.subscribe(
      value => {
        console.log("critereForm value changes : ", value);
      }
    );
    

  }

  

  

  onSubmit() {
    
    critereList.push(this.critereForm.value); 
    console.log(critereList);
  }

}

