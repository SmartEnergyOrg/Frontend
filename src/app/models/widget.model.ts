import { ChartType } from 'chart.js';

// export class Widget {
//   id: number
//   title: string
//   defaultRange: string
//   color: string
//   type: ChartType = "bar"

//   constructor(
//     id: number,
//     title: string,
//     defaultRange: string,
//     color: string
//   ) {
//     this.id = id
//     this.title = title
//     this.defaultRange = defaultRange
//     this.color = color
//   }
// }

export interface Widget {
  id?: string | undefined;
  title: string | undefined;
  defaultRange: number | undefined;
  color: string | undefined;
  typeofgraphic: ChartType;
}
