import { z } from "zod";
import { GeoJSON } from "geojson";

export const assignAreaToEnumeratorSchema = z.object({
  id: z.string(),
  enumeratorId: z.string(),
});
export const createAreaSchema = z.object({
  code: z.number().int(),
  wardNumber: z.number().int(),
  geometry: z.any().optional(),
});

export const updateAreaSchema = z.object({
  id: z.string(),
  code: z.number().int(),
  wardNumber: z.number().int(),
  geometry: z.any().optional(),
});

export const createAreaRequestSchema = z.object({
  areaId: z.string(),
  message: z.string().max(500).optional(),
});

export const updateAreaRequestStatusSchema = z.object({
  areaId: z.string(),
  userId: z.string(),
  status: z.enum(["pending", "approved", "rejected"]),
});

export const getAreasSchema = z.object({
  filters: z
    .object({
      status: z.enum(["unassigned", "assigned", "completed"]).optional(),
      wardNumber: z.number().optional(),
    })
    .optional(),
});

export const areaQuerySchema = z.object({
  wardNumber: z.number().optional(),

  code: z.number().optional(),

  status: z
    .enum([
      "all",
      "unassigned",
      "newly_assigned",
      "ongoing_survey",
      "revision",
      "asked_for_completion",
      "asked_for_revision_completion",
      "asked_for_withdrawl",
    ])
    .optional(),

  assignedTo: z.string().optional(),
});

export type AreaQueryInput = z.infer<typeof areaQuerySchema>;

export interface Area {
  areaStatus: any;
  id: string;
  code: number;
  wardNumber: number;
  assignedTo?: string | null;
  geometry: GeoJSON | null;
  centroid?: GeoJSON | null;
}

export interface AreaRequest {
  id: string;
  areaCode: number;
  userId: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
  createdAt: Date;
  updatedAt?: Date;
}
