import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Item } from 'app/models/item.model';
import { DataService } from 'app/services/data.service';

@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',

})
export class ItemDetailsComponent {
  item: any;
  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    const imdbID = this.route.snapshot.paramMap.get('imdbID');
    this.dataService.getItemById(imdbID).pipe(untilDestroyed(this)).subscribe(data => {
      this.item = {
        ...data,
        Year: this.convertYearToDate(data.Year)
      }
      this.cd.detectChanges();

    });
  }
  convertYearToDate(str: string) {
    if (!str) return null;
    const trimmed = str.trim();
    if (trimmed.length !== 8) return null;
    const year = parseInt(trimmed.substring(0, 4), 10);
    const month = parseInt(trimmed.substring(4, 6), 10) - 1;
    const day = parseInt(trimmed.substring(6, 8), 10);
    return new Date(year, month, day);
  }
  goBack() {
    this.router.navigate([`../../`], { relativeTo: this.route });
  }
}
