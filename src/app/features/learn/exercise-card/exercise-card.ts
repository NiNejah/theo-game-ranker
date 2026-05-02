import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { Exercise } from '../exercises';

@Component({
  selector: 'app-exercise-card',
  imports: [MatChipsModule],
  templateUrl: './exercise-card.html',
  styleUrl: './exercise-card.scss',
})
export class ExerciseCard {
  readonly exercise = input.required<Exercise>();
  readonly showAnswer = input(false);
}
