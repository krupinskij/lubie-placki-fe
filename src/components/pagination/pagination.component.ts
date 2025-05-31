import { Component, computed, input, output } from '@angular/core';
import { calculatePages } from '@utils';

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
