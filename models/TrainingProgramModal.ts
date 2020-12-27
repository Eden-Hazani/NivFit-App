import { TrainingExerciseModal } from "./TrainingExerciseModal";

export class TrainingProgramModal {
    public constructor(
        public name?: string,
        public difficulty?: number,
        public week?: {
            sunday: TrainingExerciseModal[],
            monday: TrainingExerciseModal[],
            tuesday: TrainingExerciseModal[],
            wednesday: TrainingExerciseModal[],
            thursday: TrainingExerciseModal[],
            friday: TrainingExerciseModal[],
            saturday: TrainingExerciseModal[]
        }
    ) { }
}
