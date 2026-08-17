import type { CollectionConfig } from 'payload'
import { publicReadAll } from '../access/publicRead'

export const ModelKinds: CollectionConfig = {
  slug: 'model-kinds',
  labels: { singular: 'Model Kind', plural: 'Model Kinds' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'modellingLanguage'],
    group: 'Library',
  },
  access: { read: publicReadAll },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'modellingLanguage',
      type: 'relationship',
      relationTo: 'modelling-languages',
      required: true,
      index: true,
    },
    { name: 'description', type: 'richText' },
    { name: 'aspectsCovered', type: 'textarea' },
    { name: 'relationToOtherKinds', type: 'textarea' },

    // ---- G4: Meta-Model ----
    {
      type: 'collapsible',
      label: 'G4 – Meta-Model',
      fields: [
        { name: 'weltanschauung', type: 'richText' },
        { name: 'notationalConventions', type: 'richText' },
        { name: 'metaModelDescription', type: 'richText' },
        {
          name: 'metaModelImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    {
      name: 'modelInstances',
      type: 'join',
      collection: 'model-instances',
      on: 'modelKind',
    },
    {
      name: 'archimateMappings',
      type: 'join',
      collection: 'archimate-mappings',
      on: 'modelKind',
    },
  ],
}