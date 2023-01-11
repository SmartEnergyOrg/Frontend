import { BehaviorSubject } from "rxjs/internal/BehaviorSubject"
import { skipWhile } from "rxjs/internal/operators/skipWhile"
import { DataPoint } from "./data-point.model"
export class Graph {
  id: number
  type: string
  query: string
  interval: number
  color: string
  data: BehaviorSubject<DataPoint[] | []> = new BehaviorSubject<DataPoint[] | []>([])
  last: BehaviorSubject<DataPoint | null> = new BehaviorSubject<DataPoint | null>(null)

  constructor(
    id: number,
    type: string,
    query: string,
    interval: number,
    color: string
  ) {
    this.id = id
    this.type = type
    this.query = query
    this.interval = interval
    this.color = color

    this.data.pipe(
      skipWhile(value => !value))
      .subscribe({
        next: (res) => {
          this.last.next(res[res.length-1])
        }
      })
  }
}
