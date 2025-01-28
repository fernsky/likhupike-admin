import { relations } from "drizzle-orm";
import { json, varchar, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { chapters } from "./profile";

export const sections = pgTable("sections", {
  id: varchar("id", { length: 15 }).primaryKey(),
  title_en: varchar("title_en", { length: 255 }).notNull(),
  title_ne: varchar("title_ne", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),

  content_schema: json("content_schema").notNull().default({}),
  chapter_id: varchar("chapter_id", { length: 15 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date(),
  ),
});

export type Section = typeof sections.$inferSelect;
export type NewSection = typeof sections.$inferInsert;

// The content schema is designed in the following way.
// Do the following
/*
{
  order: [
    xlwk,
    jkwl,
    xlmp 
]
  nodes: [
  {
      id: 'xlwk',
      type: "text",
      fallbackContent: "This is a text content"
      content: {
        en: "This is a text content",
        ne: "यो नेपालीमा छ।"
      }
    }
    },
    {
    id:  'jkwl',
    type: "table",
    totalColumnSpan: 3,
    columns: [
      {
        id: f43j,
        fallbackTitle: "Name",
        dataType: "text",
        title: {
          en: "Name",
          ne: "नाम"
        },
        level: 1,
        columnSpan: 1
      },
      {
       id: a3q8k,
        fallbackTitle: "Science",
        dataType: "integer",
        title: {
          en: "Science",
          ne: "विज्ञान"
        },
        level: 1,
        columnSpan: 1
      },
       {
       id: b89c,
        fallbackTitle: "Mathematics",
        dataType: "integer",
        title: {
          en: "Mathematics",
          ne: "गणित"
        },
        level: 1,
        columnSpan: 1
      }
    ],
    columnOrder: {
        1: [f43j, a3q8k, b89c]
    },
    shouldShowTotalColumn: true,
    totalColumn : {
      fallbackTitle: "Total",
      dataType: "integer",
      title: {
        en: "Total",
        ne: "कुल"
      },
      columnsToSum: [a3q8k, b89c]
    },
    totalRowSpan: 2,
    rows: [
      {
        id: 3j4,
        rowSpan: 1,
        cells: [
          {
            column_id: f43j,
            fallbackContent: "Sagar",
            content: {
              en: "Sagar",
              ne: "सागर"
            },
            rowSpan: 1,
          },
          {
            column_id: a3q8k,
            fallbackContent: "24",
            content: {
              en: "24",
              ne: "२४"
            },
            rowSpan: 1
          },
          {
            column_id: b89c,
            fallbackContent: "25",
            content: {
              en: "25",
              ne: "२५"
            },
            rowSpan: 1
          }
        ]
      },
      {
        id: 48q,
        cells: [
          {
            column_id: f43j,
            fallbackContent: "Gita",
            content: {
              en: "Gita",
              ne: "गीता"
            },
            rowSpan: 1
          },
          {
            column_id: a3q8k,
            fallbackContent: "64",
            content: {
              en: "64",
              ne: "६४"
            },
            rowSpan: 1
          },
          {
            column_id: b89c,
            fallbackContent: "42",
            content: {
              en: "42",
              ne: "४२"
            },
            rowSpan: 1
          }
        ]
      }
    ]
    rowOrder: [3j4, 48q],
    shouldShowTotalRow: true,
    totalRow: {
      fallbackTitle: "Total",
      columnsToSum: [a3q8k, b89c],
      title: {
        en: "Total",
        ne: "कुल"
      },
      labelPosition: "f43j"
    },
    shouldShowPercentageRow: true,
    percentageRow: {
      fallbackTitle: "Percentage",
      columnsToCalculate: [a3q8k, b89c],
      title: {
        en: "Percentage",
        ne: "प्रतिशत"
      },
      labelPosition: "f43j"
    }
  },
  {
    id: 'akxl'
    type: "table",
    totalColumnSpan: 6,
    columns: [
      {
        id: 88rs,
        level: 1,
        fallbackTitle: "Year 2080",
        dataType: "multipleColumns",
        columnSpan: 3,
        title: {
            en: "Year 2080",
            ne: "वर्ष २०८०"
        }
      },
      {
        id: f43j,
        level: 2,
        fallbackTitle: "Ward",
        dataType: "integer",
        title: {
          en: "Ward",
          ne: "वार्ड"
        },
        columnSpan: 1,
        parentColumn: '88rs'
      },
       {
        id: f43k,
        level: 2,
        fallbackTitle: "Gender",
        dataType: "integer",
        title: {
          en: "Gender",
          ne: "लिङ्ग"
        },
        columnSpan: 1,
        parentColumn: '88rs'
      },
      {
        id: gkqw,
        level: 2,
        fallbackTitle: "Total Population",
        dataType: "integer",
        title: {
          en: "Total Population",
          ne: "कुल जनसंख्या"
        },
        columnSpan: 1,
        parentColumn: '88rs'
      },
        {
        id: poer,
        level: 1,
        fallbackTitle: "Year 2081",
        dataType: "multipleColumns",
        columnSpan: 3,
        title: {
            en: "Year 2081",
            ne: "वर्ष २०८१"
        }
      }
      {
        id: qans,
        level: 2,
        fallbackTitle: "Ward",
        dataType: "integer",
        title: {
          en: "Ward",
          ne: "वार्ड"
        },
        columnSpan: 1,
        parentColumn: 'poer'
      },
       {
        id: rans,
        level: 2,
        fallbackTitle: "Gender",
        dataType: "integer",
        title: {
          en: "Gender",
          ne: "लिङ्ग"
        },
        columnSpan: 1,
        parentColumn: 'poer'
      },
      {
        id: at87,
        level: 2,
        fallbackTitle: "Total Population",
        dataType: "integer",
        title: {
          en: "Total Population",
          ne: "कुल जनसंख्या"
        },
        columnSpan: 1,
        parentColumn: 'poer'
      }
    ],
    columnOrder: [
    1: [88rs, poer],
    2: {
        88rs: [f43j, f43k, gkqw],
        poer: [qans, rans, at87]
    }
    ],
    shouldShowTotalColumn: true,
    totalColumn : {
      fallbackTitle: "Total",
      dataType: "integer",
      title: {
        en: "Total",
        ne: "कुल"
      },
      columnsToSum: [a3q8k, b89c]
    },
    totalRowSpan: 4,
    rows: [
      {
        id: 3j4,
        rowSpan: 2,
        orders: {
            f43k: [93ks, 93ky]
        },
        cells: [
          {
            id: 88qs,
            column_id: f43j,
            fallbackContent: "1",
            content: {
              en: "1",
              ne: "१"
            },
            rowSpan: 2,
          },
          {
            id: 954a,
            column_id: f43k,
            fallbackContent: "Male",
            content: {
              en: "Male",
              ne: "पुरुष"
            },
            rowSpan: 1
          },
           {
            id: 93ks,
            column_id: f43k,
            fallbackContent: "Female",
            content: {
              en: "Female",
              ne: "महिला"
            },
            rowSpan: 1
          },
          {
            id: 93ky,
            column_id: gkqw,
            fallbackContent: "100",
            content: {
              en: "25",
              ne: "२५"
            }
          }
        ]
      },
      {
        id: 48q,
        cells: [
          {
            column_id: f43j,
            fallbackContent: "Gita",
            content: {
              en: "Gita",
              ne: "गीता"
            }
          },
          {
            column_id: a3q8k,
            fallbackContent: "64",
            content: {
              en: "64",
              ne: "६४"
            }
          },
          {
            column_id: b89c,
            fallbackContent: "42",
            content: {
              en: "42",
              ne: "४२"
            }
          }
        ]
      }
    ]
    rowOrder: [3j4, 48q],
    shouldShowTotalRow: true,
    totalRow: {
      fallbackTitle: "Total",
      columnsToSum: [a3q8k, b89c],
      title: {
        en: "Total",
        ne: "कुल"
      },
      labelPosition: "f43j"
    },
    shouldShowPercentageRow: true,
    percentageRow: {
      fallbackTitle: "Percentage",
      columnsToCalculate: [a3q8k, b89c],
      title: {
        en: "Percentage",
        ne: "प्रतिशत"
      },
      labelPosition: "f43j"
    }
  }
}
*/

export const sectionRelations = relations(sections, ({ one }) => ({
  chapter: one(chapters, {
    fields: [sections.chapter_id],
    references: [chapters.id],
  }),
}));
