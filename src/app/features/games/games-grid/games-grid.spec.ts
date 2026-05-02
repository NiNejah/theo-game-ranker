import { TestBed } from '@angular/core/testing';

import { GamesGrid } from './games-grid';

describe('GamesGrid', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesGrid],
    }).compileComponents();
  });

  it('creates with an empty games list', () => {
    const fixture = TestBed.createComponent(GamesGrid);
    fixture.componentRef.setInput('games', []);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
