import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import { critereList } from '../critere';



@Component({
  selector: 'app-espace-recherche',
  templateUrl: './espace-recherche.component.html',
  styleUrls: ['./espace-recherche.component.css']
})
export class EspaceRechercheComponent implements OnInit, OnDestroy {

  public displayDiagnostic = false;
  public critereList = critereList;
  
  
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

  ngOnDestroy() {
    critereList.push(this.critereForm.value); 
    console.log(critereList);  
  }

   

  onSubmit() {
    
    critereList.push(this.critereForm.value); 
    console.log(critereList);
  }

}

