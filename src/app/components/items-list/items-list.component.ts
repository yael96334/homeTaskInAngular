import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Item } from 'app/models/item.model';
import { DataService } from 'app/services/data.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Display } from 'app/shared/enums/enums';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss'
})

export class ItemsListComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  types: { [type: string]: any[] } = {};
  selectedType: string = '0';
  viewMode: Display = Display.List;
  freeSearch: string = '';
  sortAsc = true;
  typeToDisplay: any;
  Display = Display;
  activeIndex = 0;
  isEdit: boolean = false;
  constructor(private dataService: DataService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageService,

  ) { }
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getItems().pipe(untilDestroyed(this)).subscribe((data: any) => {
      if (data) {
        this.items = data.map(item => ({
          ...item,
          Year: this.getYearOnly(item.Year)
        }));
        this.splitByType();
        const typesKeys = this.getTypes();
        if (typesKeys.length > 0) {
          this.selectedType = typesKeys[0];
          this.activeIndex = 0;
        } else {
          this.selectedType = '';
        }
        this.filterItems();
        this.cd.detectChanges();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load data' });
      }
    }
    );
  }
  getYearOnly(str: string): string | null {
    if (!str || str.length < 4) return null;
    return str.substring(0, 4);
  }
  splitByType() {
    this.types = {};
    this.items.forEach(item => {
      if (!this.types[item.Type]) this.types[item.Type] = [];
      this.types[item.Type].push(item);
    });
  }

  filterItems() {
    const term = this.freeSearch.toLowerCase();
    this.filteredItems = (this.types[this.selectedType] || []).filter(item => {
      const titleMatch = item.Title?.toLowerCase().includes(term);
      const yearMatch = item.Year.toString().includes(term);

      return titleMatch || yearMatch;
    });

    this.sortItems();
  }

  sortItems() {
    this.filteredItems.sort((a, b) =>
      this.sortAsc ? a.Title.localeCompare(b.Title) : b.Title.localeCompare(a.Title)
    );
  }

  toggleView() {
    this.viewMode = this.viewMode === Display.List ? Display.Grid : Display.List;
  }

  clearSearch() {
    this.freeSearch = '';
    this.filterItems();
  }

  refresh() {
    this.loadData();
  }

  changeSort() {
    this.sortAsc = !this.sortAsc;
    this.sortItems();
  }

  updateTitle(item: Item, newTitle: string) {
    if (item.Title !== newTitle) {
      const updated = { ...item, Title: newTitle };
      this.dataService.updateItem(updated).subscribe();
    }
  }
  goToDetail(item) {
    const url = `${this.router.url}/itemDetails/${item.imdbID}`;
    this.router.navigate([url]);
  }
  getTypes(): any {
    this.typeToDisplay = Object.keys(this.types);
    return this.typeToDisplay;
  }
  onTabChange(event: any) {
    this.selectedType = this.getTypes()[event.index];
    this.filterItems();
  }
}
