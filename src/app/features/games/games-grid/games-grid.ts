import { Component, input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridOptions,
  ValueFormatterParams,
  themeQuartz,
} from 'ag-grid-community';

import { Game } from '../../../core/models/game.model';

@Component({
  selector: 'app-games-grid',
  imports: [AgGridAngular],
  templateUrl: './games-grid.html',
  styleUrl: './games-grid.scss',
})
export class GamesGrid {
  readonly games = input.required<Game[]>();

  protected readonly theme = themeQuartz;

  protected readonly columnDefs: ColDef<Game>[] = [
    { field: 'name', headerName: 'Game', flex: 2, minWidth: 200 },
    { field: 'released', headerName: 'Released', flex: 1, minWidth: 130 },
    {
      field: 'rating',
      headerName: 'Rating',
      flex: 1,
      minWidth: 110,
      filter: 'agNumberColumnFilter',
      valueFormatter: formatRating,
    },
    {
      field: 'ratingsCount',
      headerName: 'Votes',
      flex: 1,
      minWidth: 110,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'metacritic',
      headerName: 'Metacritic',
      flex: 1,
      minWidth: 130,
      filter: 'agNumberColumnFilter',
      valueFormatter: formatMetacritic,
    },
    {
      field: 'platforms',
      headerName: 'Platforms',
      flex: 2,
      minWidth: 220,
      sortable: false,
      valueFormatter: formatList,
    },
    {
      field: 'genres',
      headerName: 'Genres',
      flex: 2,
      minWidth: 180,
      sortable: false,
      valueFormatter: formatList,
    },
  ];

  protected readonly defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  protected readonly gridOptions: GridOptions<Game> = {
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50],
    animateRows: true,
    rowHeight: 44,
  };
}

function formatRating(params: ValueFormatterParams<Game, number>): string {
  return params.value != null ? params.value.toFixed(2) : '—';
}

function formatMetacritic(params: ValueFormatterParams<Game, number | null>): string {
  return params.value != null ? String(params.value) : '—';
}

function formatList(params: ValueFormatterParams<Game, readonly string[]>): string {
  return params.value?.length ? params.value.join(', ') : '—';
}
