import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Legend } from '../model/legend';
import { WeaponFilter } from '../model/weaponFilter';

@Component({
  selector: 'app-legends-list',
  imports: [CommonModule],
  templateUrl: './legends-list.component.html',
  styleUrl: './legends-list.component.css',
})
export class LegendsListComponent implements OnInit {
  weaponFilters: WeaponFilter[] = [];

  legends: Legend[] = [];
  filteredLegends: Legend[] = [];
  pickedLegend?: Legend;
  prevQueue: any[] = [];
  queueMaxLimit: number = 30;

  public constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Legend[]>('assets/data/legends-list.json')
      .subscribe((data) => {
        this.legends = data;

        this.legends.forEach((legend) => {
          if (
            !this.weaponFilters.some(
              (filter) => filter.weapon === legend.weapon_one
            )
          ) {
            this.weaponFilters.push({
              weapon: legend.weapon_one,
              active: false,
            });
          }
          if (
            !this.weaponFilters.some(
              (filter) => filter.weapon === legend.weapon_two
            )
          ) {
            this.weaponFilters.push({
              weapon: legend.weapon_two,
              active: false,
            });
          }
        });

        this.filterLegends();
      });
  }

  flipFilter(weaponFilter: WeaponFilter) {
    this.weaponFilters.forEach((filter) => {
      if (filter.weapon == weaponFilter.weapon) {
        filter.active = !filter.active;
      }
    });
    this.filterLegends();
  }

  filterLegends() {
    let filterWeapons: string[] = [];
    this.weaponFilters.forEach((filter) => {
      if (filter.active) {
        filterWeapons.push(filter.weapon);
      }
    });

    if (filterWeapons.length == 0) {
      this.filteredLegends = this.legends;
    } else {
      this.filteredLegends = this.legends.filter(
        (legend) =>
          filterWeapons.includes(legend.weapon_one) ||
          filterWeapons.includes(legend.weapon_two)
      );
    }
  }

  getLegend(pos: number[]): Legend {
    let ret = undefined;
    try {
      ret = this.legends.find(legend => legend.pos.toString() === pos.toString());
    } catch (error) {
      return new Legend();
    }
    return (ret == undefined)? new Legend(): ret;
  }

  getRandom() {
    if (!this.filteredLegends.length) {
      return;
    }

    // Reset previous queue if no legends available
    var availableLegends = this.filteredLegends.filter(
      (legend) => !this.prevQueue.includes(legend.legend_id)
    );
    if(availableLegends.length < 1) {
      availableLegends = this.filteredLegends;
      this.prevQueue = [];
    }

    const randomIdx = Math.floor(Math.random() * availableLegends.length);
    this.pickedLegend = availableLegends[randomIdx];

    // process queue
    this.prevQueue.push(this.pickedLegend.legend_id);
    if (this.prevQueue.length > this.queueMaxLimit) {
      this.prevQueue.shift();
    }

    // Scroll to legend
    const legendElement = document.getElementById('legend-' + this.pickedLegend?.legend_id);
    legendElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }
}
