import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

	public updateRotation: boolean;
	public carousel: any;
	public currdeg: number;
	public nextButton: any;
	public prevButton: any;

	constructor() {
		this.updateRotation = false;
		// this.carousel = document.querySelector(".carousel");
		this.currdeg = 0;
		// this.nextButton = document.querySelector(".next");
		// this.prevButton = document.querySelector(".prev");
	}

	ngOnInit() {
	}

	
	
// document.querySelectorAll(".next").on("click", { d: "n" }, rotate);

// document.querySelectorAll(".prev").on("click", { d: "p" }, rotate);

rotate(e:string): void {
	if (e == "n") {
		this.currdeg = this.currdeg - 60;
	}
	if (e == "p") {
		this.currdeg = this.currdeg + 60;
	}
	this.updateRotation = true;
}

rotationSlide() {
	return "rotateY(" + this.currdeg.toString() + "deg)";
}

}
