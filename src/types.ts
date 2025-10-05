import { Database } from "./generated_types.js"

export type CreateWorkoutPayload = Omit<
  Database["public"]["Tables"]["workouts"]["Insert"],
  "id" | "created_at"
>

export type Workout = Database["public"]["Tables"]["workouts"]["Row"]

export type Strategy = Database["public"]["Tables"]["strategies"]["Row"]

export type StrategyExercise =
  Database["public"]["Tables"]["strategy_exercises"]["Row"]

export type Exercise = Database["public"]["Tables"]["exercises"]["Row"]

export type ExerciseSession =
  Database["public"]["Tables"]["exercise_sessions"]["Row"]

export type ExerciseSetGroup =
  Database["public"]["Tables"]["exercise_set_groups"]["Row"]

export type InsertExerciseSetGroup =
  Database["public"]["Tables"]["exercise_set_groups"]["Insert"]

export type InsertExercisesSessionPayload =
  Database["public"]["Tables"]["exercise_sessions"]["Insert"]

export type UpdateWorkoutPayload =
  Database["public"]["Tables"]["workouts"]["Update"]

export type DenormalizedWorkout = Workout & {
  exercise_sessions: (ExerciseSession & {
    exercise_set_groups: ExerciseSetGroup[]
    exercises: Exercise
  })[]
}

export type Identifiable = {
  id: number
}
