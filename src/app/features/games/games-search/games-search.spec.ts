import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { GamesSearch } from './games-search';

describe('GamesSearch', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesSearch],
      providers: [provideNoopAnimations()],
    }).compileComponents();
  });

  it('emits debounced search term changes', fakeAsync(() => {
    const fixture = TestBed.createComponent(GamesSearch);
    const emitted: string[] = [];
    fixture.componentInstance.searchTermChange.subscribe((v) => emitted.push(v));

    fixture.componentInstance['searchControl'].setValue('halo');
    tick(200);
    expect(emitted).toEqual(['halo']);
  }));
});
