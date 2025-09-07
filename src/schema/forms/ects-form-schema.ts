import type { TFunction } from "@/types/i18n";
import * as z from "zod/mini";

export const getEctsFormSchema = (t: TFunction<"ects.form">) => {
    const ectsFormSchema = z.object({
        name: z.string().check(z.minLength(1, t("nameRequired"))),
        ects: z.string().check(z.regex(/^\d+$/, t("ectsInvalid"))),
        grade: z
            .string()
            .check(
                z.regex(
                    /^(2(\.0)?|2\.5|3(\.0)?|3\.5|4(\.0)?|4\.5|5(\.0)?)$/,
                    t("gradeInvalid"),
                ),
            ),
    });

    return ectsFormSchema;
};

export type EctsFormSchema = z.infer<ReturnType<typeof getEctsFormSchema>>;
