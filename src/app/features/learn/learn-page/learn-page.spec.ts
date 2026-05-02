import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { LearnPage } from './learn-page';

describe('LearnPage', () => {
  function configure(showAnswers: boolean) {
    TestBed.configureTestingModule({
      imports: [LearnPage],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { showAnswers } } },
        },
      ],
    });
  }

  it('hides answers by default', () => {
    configure(false);
    const fixture = TestBed.createComponent(LearnPage);
    expect(fixture.componentInstance['showAnswers']).toBe(false);
  });

  it('shows answers when route data flags it', () => {
    configure(true);
    const fixture = TestBed.createComponent(LearnPage);
    expect(fixture.componentInstance['showAnswers']).toBe(true);
  });
});
