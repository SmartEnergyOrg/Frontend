import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop sorting
 */

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: 'drag-and-drop.component.html',
  styleUrls: ['drag-and-drop.component.css'],
})
export class DragAndDropComponent {
  widgets = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);

    console.log(
      'Widget moved from index ' +
        event.previousIndex +
        ' to index: ' +
        event.currentIndex
    );
  }
}
