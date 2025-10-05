export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_keys: {
        Row: {
          allow_writes: boolean
          created_at: string
          expires_at: string | null
          id: number
          key: string
          user_id: string
        }
        Insert: {
          allow_writes?: boolean
          created_at?: string
          expires_at?: string | null
          id?: number
          key?: string
          user_id?: string
        }
        Update: {
          allow_writes?: boolean
          created_at?: string
          expires_at?: string | null
          id?: number
          key?: string
          user_id?: string
        }
        Relationships: []
      }
      exercise_sessions: {
        Row: {
          created_at: string | null
          ended_at: string | null
          exercise_id: number
          id: number
          started_at: string | null
          user_id: string
          workout_id: number
        }
        Insert: {
          created_at?: string | null
          ended_at?: string | null
          exercise_id: number
          id?: number
          started_at?: string | null
          user_id?: string
          workout_id: number
        }
        Update: {
          created_at?: string | null
          ended_at?: string | null
          exercise_id?: number
          id?: number
          started_at?: string | null
          user_id?: string
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercise_session_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_sessions_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          }
        ]
      }
      exercise_set_groups: {
        Row: {
          count: number
          count_completed: number | null
          created_at: string
          exercise_session_id: number
          id: number
          is_warmup: boolean | null
          reps: number
          user_id: string
          weight: number
        }
        Insert: {
          count: number
          count_completed?: number | null
          created_at?: string
          exercise_session_id: number
          id?: number
          is_warmup?: boolean | null
          reps: number
          user_id: string
          weight: number
        }
        Update: {
          count?: number
          count_completed?: number | null
          created_at?: string
          exercise_session_id?: number
          id?: number
          is_warmup?: boolean | null
          reps?: number
          user_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercise_set_groups_exercise_session_id_fkey"
            columns: ["exercise_session_id"]
            isOneToOne: false
            referencedRelation: "exercise_sessions"
            referencedColumns: ["id"]
          }
        ]
      }
      exercises: {
        Row: {
          created_at: string
          default_weight: number | null
          id: number
          is_active: boolean
          name: string
          overload_rate_override: number | null
          should_overload: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string
          default_weight?: number | null
          id?: number
          is_active?: boolean
          name: string
          overload_rate_override?: number | null
          should_overload?: boolean | null
          user_id?: string
        }
        Update: {
          created_at?: string
          default_weight?: number | null
          id?: number
          is_active?: boolean
          name?: string
          overload_rate_override?: number | null
          should_overload?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      fake_table: {
        Row: {
          created_at: string
          display_name: string
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      strategies: {
        Row: {
          created_at: string | null
          display_name: string | null
          exercises_per_workout: number | null
          id: number
          overload_rate: number | null
          percent_exercises_to_overload: number | null
          target_reps_per_set: number | null
          target_sets_per_exercise: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          exercises_per_workout?: number | null
          id?: number
          overload_rate?: number | null
          percent_exercises_to_overload?: number | null
          target_reps_per_set?: number | null
          target_sets_per_exercise?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          exercises_per_workout?: number | null
          id?: number
          overload_rate?: number | null
          percent_exercises_to_overload?: number | null
          target_reps_per_set?: number | null
          target_sets_per_exercise?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      strategy_exercises: {
        Row: {
          exercise_id: number
          id: number
          is_active: boolean
          overload_rate_override: number | null
          should_use_overload_rate_override: boolean
          strategy_id: number
          user_id: string
        }
        Insert: {
          exercise_id: number
          id?: number
          is_active?: boolean
          overload_rate_override?: number | null
          should_use_overload_rate_override?: boolean
          strategy_id: number
          user_id: string
        }
        Update: {
          exercise_id?: number
          id?: number
          is_active?: boolean
          overload_rate_override?: number | null
          should_use_overload_rate_override?: boolean
          strategy_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "strategy_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strategy_exercises_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          }
        ]
      }
      user_preferences: {
        Row: {
          id: string
          strategy_id: number | null
        }
        Insert: {
          id: string
          strategy_id?: number | null
        }
        Update: {
          id?: string
          strategy_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          }
        ]
      }
      workout_count: {
        Row: {
          created_at: string
          id: string
          workout_count: number
        }
        Insert: {
          created_at?: string
          id: string
          workout_count?: number
        }
        Update: {
          created_at?: string
          id?: string
          workout_count?: number
        }
        Relationships: []
      }
      workouts: {
        Row: {
          created_at: string
          ended_at: string | null
          id: number
          paused_at: string | null
          started_at: string | null
          strategy_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          id?: number
          paused_at?: string | null
          started_at?: string | null
          strategy_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          id?: number
          paused_at?: string | null
          started_at?: string | null
          strategy_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_api_key_user_id: {
        Args: { api_key: string }
        Returns: string
      }
      is_allowed_api_key: {
        Args: { api_key: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
