import { Component, ViewEncapsulation  } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
@Component({
	templateUrl: './drag.component.html',
    styleUrls: ['./drag.scss'],
    encapsulation: ViewEncapsulation.None
    
})
export class DragComponent {
    // This is for the basic example and for general 
	public constructor(private dragulaService:DragulaService) {
    dragulaService.drag.subscribe((value:any) => {
      // //console.log(`drag: ${value[0]}`); // value[0] will always be bag name
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value:any) => {
      // //console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value:any) => {
      // //console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value:any) => {
      // //console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
    dragulaService.dropModel.subscribe((value:any) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value:any) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  private hasClass(el:any, name:string):any {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el:any, name:string):void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el:any, name:string):void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args:any):void {
    let [e] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args:any):void {
    let [e] = args;
    this.addClass(e, 'ex-moved');
  }

  private onOver(args:any):void {
    let [el] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args:any):void {
    let [el] = args;
    this.removeClass(el, 'ex-over');
  }
    
 //This is with the output example
public many:Array<string> = ['The', 'possibilities', 'are', 'endless!'];
  public many2:Array<string> = ['Explore', 'them'];

 

  private onDropModel(args:any):void {
    let [el, target, source] = args;
    //console.log('onDropModel:');
    //console.log(el);
    //console.log(target);
    //console.log(source);
  }

  private onRemoveModel(args:any):void {
    let [el, source] = args;
    //console.log('onRemoveModel:');
    //console.log(el);
    //console.log(source);
  }    
    
}