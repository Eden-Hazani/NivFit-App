import { ExerciseModel } from "./ExerciseModel";

export class TrainingExerciseModal {
    public constructor(
        public exercise?: ExerciseModel,
        public numberOfSets?: number,
        public numberOfReps?: number,
        public muscleGroup?: string
    ) { }
}
