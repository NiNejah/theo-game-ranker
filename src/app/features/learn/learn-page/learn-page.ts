import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ExerciseCard } from '../exercise-card/exercise-card';
import { EXERCISES } from '../exercises';

@Component({
  selector: 'app-learn-page',
  imports: [ExerciseCard, RouterLink],
  templateUrl: './learn-page.html',
  styleUrl: './learn-page.scss',
})
export class LearnPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly exercises = EXERCISES;
  protected readonly showAnswers = !!this.route.snapshot.data['showAnswers'];
}
