import { PostReults } from "./post-results";

export interface Posts {
  count: number,
  next: string,
  previous: string,
  results: PostReults[]
}
