import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  DenormalizedWorkout,
  Exercise,
  Identifiable,
  Strategy,
} from "./types.js"

// https://mlsojdnlzcsczxwkeuwy.supabase.co/functions/v1/api/exercises

// Create server instance
const server = new McpServer({
  name: "brickbybrick-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
})

const brickbybrickRequest = async <T>(
  relativePathWithLeadingSlash: string,
  method?: "GET" | "PUT" | "POST" | "DELETE",
  payload?: Record<string, unknown>
): Promise<T> => {
  const resp = await fetch(
    `https://mlsojdnlzcsczxwkeuwy.supabase.co/functions/v1/api${relativePathWithLeadingSlash}`,
    {
      headers: {
        Accept: "application/json",
        Connection: "keep-alive",
        api_key: process.env.BRICKBYBRICK_API_KEY ?? "",
      },
      method: method ?? "GET",
      body: JSON.stringify(payload),
    }
  )
  return await resp.json()
}

server.tool(
  "get_exercises",
  "Lists all available exercises in the BrickByBrick library, regardless of overload strategy. SM stands for Smith Machine. LP stands for leg press.",
  async () => {
    const exercises = await brickbybrickRequest<Exercise[]>("/exercises")
    if (exercises.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "You currently have no exercises in the BrickByBrick app.",
          },
        ],
      }
    }
    return {
      content: exercises.map((ex) => ({
        type: "text",
        text: ex.name,
      })),
    }
  }
)

const getWorkoutAsNaturalLanguage = (
  workout: DenormalizedWorkout,
  strategies: Strategy[]
): string => {
  let workoutStr: string = ""
  const createdAt = new Date(workout.created_at)
  workoutStr += `Created On: ${createdAt.getMonth()}/${createdAt.getDate()}/${createdAt.getFullYear()} \n`
  ;(workoutStr += `Overload Strategy: ${
    strategies.find((strgy) => strgy.id === workout.strategy_id)?.display_name
  }\n`),
    (workoutStr += `Number of Exercises: ${workout.exercise_sessions.length}\n`),
    (workoutStr += `Exercises: `)
  workout.exercise_sessions.forEach((session) => {
    workoutStr += session.exercises.name
    workoutStr += " "
    const sessionSummary = session.exercise_set_groups.reduce((acc, curr) => {
      return acc + `${curr.count} sets of ${curr.reps} at ${curr.weight} lbs, `
    }, "")
    workoutStr += `(${sessionSummary}), `
  })
  workoutStr += "\n"
  return workoutStr
}

server.tool("get_workouts", "Lists BrickByBrick workouts", async () => {
  const workouts = await brickbybrickRequest<DenormalizedWorkout[]>(
    "/workouts/actions/searchWorkouts",
    "POST",
    { limit: 1000 }
  )
  const strategies = await brickbybrickRequest<Strategy[]>("/strategies")
  if (workouts.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: "No BrickByBrick workouts have been recorded at this time.",
        },
      ],
    }
  }
  return {
    content: workouts.map((workout) => {
      return {
        type: "text",
        text: getWorkoutAsNaturalLanguage(workout, strategies),
      }
    }),
  }
})

server.tool(
  "next_workout_preview",
  "Gives a preview of what exercises are planned in the next workout according to the active overload strategy",
  async () => {
    const nextExercises = await brickbybrickRequest<Exercise[]>(
      "/workouts/actions/previewNextWorkout"
    )
    return {
      content: nextExercises.map((exercise) => {
        return {
          type: "text",
          text: exercise.name,
        }
      }),
    }
  }
)

server.tool(
  "create_workout",
  "Creates a BrickByBrick workout according to the currently-active overload strategy.",
  async () => {
    const newWorkout = await brickbybrickRequest<Identifiable>(
      "/workouts",
      "POST",
      {}
    )
    const newWorkoutDetails = await brickbybrickRequest<DenormalizedWorkout>(
      `/workouts/${newWorkout.id}`
    )
    const strategies = await brickbybrickRequest<Strategy[]>("/strategies")
    const workoutAsNaturalLang = getWorkoutAsNaturalLanguage(
      newWorkoutDetails,
      strategies
    )
    return {
      content: [
        {
          type: "text",
          text: workoutAsNaturalLang,
        },
      ],
    }
  }
)

async function main() {
  if (!process.env.BRICKBYBRICK_API_KEY) {
    throw new Error("Need an API key to start the server.")
  }
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
