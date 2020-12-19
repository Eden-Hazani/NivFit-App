
export class ExerciseModel {
    public constructor(
        public mainList?: [
            { name?: string, shortDescription?: string },
            { description?: string },
            { instructorName?: string, instructorImg?: string }
        ],
        public videoURL?: string,
        public difficultyLevel?: number,
        public frontImg?: string
    ) { }
}
