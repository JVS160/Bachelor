import type { CollectionConfig } from 'payload'
import { publicRead } from '../access/publicRead'

export const ModellingLanguages: CollectionConfig = {
  slug: 'modelling-languages',
  labels: {
    singular: 'Modelling Language',
    plural: 'Modelling Languages',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'abbreviation', 'yearIntroduced', '_status'],
    group: 'Library',
  },
  access: {
    read: publicRead,
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ---------- G1 ----------
        {
          label: 'G1 – Purpose & Context',
          description:
            'General Background and Purpose of the Modeling Language.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  unique: true,
                  admin: { width: '60%' },
                },
                {
                  name: 'abbreviation',
                  type: 'text',
                  admin: { width: '40%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'yearIntroduced',
                  type: 'number',
                  admin: { width: '30%', step: 1 },
                },
                {
                  name: 'creators',
                  type: 'text',
                  admin: { width: '70%' },
                },
              ],
            },
            {
              name: 'isStandard',
              type: 'checkbox',
              label: 'Is Standard',
              defaultValue: false,
            },
            {
              name: 'standardizationBody',
              type: 'text',
              admin: {
                condition: (data) => Boolean(data?.isStandard),
              },
            },
            {
              name: 'description',
              type: 'richText',
            },
            {
              name: 'industryUsage',
              type: 'textarea',
            },
            {
              name: 'modelPurpose',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Understand', value: 'understand' },
                { label: 'Assess', value: 'assess' },
                { label: 'Diagnose', value: 'diagnose' },
                { label: 'Design', value: 'design' },
                { label: 'Realise', value: 'realise' },
                { label: 'Operate', value: 'operate' },
                { label: 'Regulate', value: 'regulate' },
              ],
            },
            {
              name: 'planningPerspective',
              type: 'text',
            },
            {
              name: 'interrogativePerspective',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'What', value: 'what' },
                { label: 'How', value: 'how' },
                { label: 'Where', value: 'where' },
                { label: 'Who', value: 'who' },
                { label: 'When', value: 'when' },
                { label: 'Why', value: 'why' },
              ],
            },
          ],
        },
        // ---------- G2 ----------
        {
          label: 'G2 – Positioning',
          description: 'Classification of language within the framework.',
          fields: [

            {
              name: 'granularity',
              type: 'select',
              options: [
                { label: 'Coarse', value: 'coarse' },
                { label: 'Medium', value: 'medium' },
                { label: 'Fine', value: 'fine' },
              ],
            },
            {
              name: 'semanticPrecision',
              type: 'select',
              options: [
                { label: 'Informal', value: 'informal' },
                { label: 'Semi-formal', value: 'semi_formal' },
                { label: 'Formal', value: 'formal' },
              ],
            },
            {
              name: 'representationType',
              type: 'select',
              options: [
                { label: 'Graphical', value: 'graphical' },
                { label: 'Textual', value: 'textual' },
                { label: 'Tabular', value: 'tabular' },
                { label: 'Hybrid', value: 'hybrid' },
              ],
            },
            {
              name: 'representationFreedom',
              type: 'select',
              options: [
                { label: 'Prescribed', value: 'prescribed' },
                { label: 'Partially prescribed', value: 'partially_prescribed' },
                { label: 'Free', value: 'free' },
              ],
            },
            {
              name: 'definitionalDisposition',
              type: 'select',
              options: [
                { label: 'Intensional', value: 'intensional' },
                { label: 'Extensional', value: 'extensional' },
                { label: 'Both', value: 'both' },
              ],
            },
          ],
        },
        // ---------- G6 + Relations ----------
        {
          label: 'G6 – Tool Support',
          fields: [
            {
              name: 'tools',
              type: 'relationship',
              relationTo: 'tools',
              hasMany: true,
            },
          ],
        },
        {
          label: 'Model Kinds (G3 / G4 / G5)',
          fields: [
            {
              name: 'modelKinds',
              type: 'join',
              collection: 'model-kinds',
              on: 'modellingLanguage',
              admin: {
                description:
                'Model types are managed in their own collection and appear here automatically.',
              },
            },
          ],
        },
      ],
    },
  ],
}