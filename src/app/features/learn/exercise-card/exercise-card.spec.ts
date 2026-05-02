import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ExerciseCard } from './exercise-card';

describe('ExerciseCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseCard],
      providers: [provideNoopAnimations()],
    }).compileComponents();
  });

  it('renders the question text', () => {
    const fixture = TestBed.createComponent(ExerciseCard);
    fixture.componentRef.setInput('exercise', {
      id: 1,
      title: 'Sample',
      concept: 'Signals',
      file: 'foo.ts',
      question: 'What does signal() return?',
      hints: [],
      stub: 'stub();',
      answer: 'answer();',
    });
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('What does signal() return?');
    expect(text).not.toContain('answer();');
  });

  it('reveals the solution when showAnswer is true', () => {
    const fixture = TestBed.createComponent(ExerciseCard);
    fixture.componentRef.setInput('exercise', {
      id: 1,
      title: 'Sample',
      concept: 'Signals',
      file: 'foo.ts',
      question: 'Q',
      hints: [],
      stub: 'stub();',
      answer: 'final-answer();',
    });
    fixture.componentRef.setInput('showAnswer', true);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('final-answer();');
  });
});
