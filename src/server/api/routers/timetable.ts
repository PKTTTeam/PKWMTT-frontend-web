import "server-only";

import { getSubGroupsSchema } from "@/schema/trpc/timetable/get-sub-groups-schema";
import { getTimetableSchema } from "@/schema/trpc/timetable/get-timetable-schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
    fetchAcademicHours,
    fetchGeneralGroups,
    fetchSubGroupsForGeneralGroup,
    fetchTimetable,
} from "@/server/data-access/timetable";
import { TRPCError } from "@trpc/server";

export const timetableRouter = createTRPCRouter({
    getGeneralGroups: publicProcedure.query(async () => {
        const { generalGroups, error } = await fetchGeneralGroups();

        if (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to fetch general groups",
            });
        }

        return generalGroups;
    }),
    getSubGroups: publicProcedure
        .input(getSubGroupsSchema)
        .query(async ({ input }) => {
            const { subGroups, error } = await fetchSubGroupsForGeneralGroup(
                input.generalGroupLabel,
            );

            if (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to fetch subgroups",
                });
            }

            return subGroups;
        }),
    getAcademicHours: publicProcedure.query(async () => {
        const { academicHours, error } = await fetchAcademicHours();

        if (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to fetch academic hours",
            });
        }

        return academicHours;
    }),
    getTimetable: publicProcedure
        .input(getTimetableSchema)
        .query(async ({ input }) => {
            const { timetable, error } = await fetchTimetable(
                input.generalGroup,
                input.subGroups,
            );

            if (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to fetch timetable",
                });
            }

            return timetable;
        }),
});
