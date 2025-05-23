import { Component, computed, input, output } from '@angular/core';

const calculatePages = (count: number, current: number): number[][] => {
  const first = [1, 2, 3].filter((p) => p < current - 2);
  const curr = [
    current - 2,
    current - 1,
    current,
    current + 1,
    current + 2,
  ].filter((p) => p > 0 && p <= count);
  const last = [count - 2, count - 1, count].filter((p) => p > current + 2);

  const result: number[][] = [];

  if (first.at(-1) === curr.at(0)! - 1) {
    curr.unshift(...first);
  } else if (first.length > 0) {
    result.push(first);
  }

  result.push(curr);

  if (last.at(0) === curr.at(-1)! + 1) {
    curr.push(...last);
  } else if (last.length > 0) {
    result.push(last);
  }

  return result;
};

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class Pagination {
  count = input<number>(0);
  current = input<number>(0);

  changePage = output<number>();

  pages = computed(() => calculatePages(this.count(), this.current()));

  isCurrent(page: number): boolean {
    return page === this.current();
  }

  onClick = (page: number) => {
    this.changePage.emit(page);
  };
}
