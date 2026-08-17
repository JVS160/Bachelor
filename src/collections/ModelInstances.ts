import type { CollectionConfig } from 'payload'
import { publicReadAll } from '../access/publicRead'

export const ModelInstances: CollectionConfig = {
  slug: 'model-instances',
  labels: { singular: 'Model Instance', plural: 'Model Instances' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'modelKind'],
    group: 'Library',
  },
  access: { read: publicReadAll },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'modelKind',
      type: 'relationship',
      relationTo: 'model-kinds',
      required: true,
      index: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'source',
      type: 'text',
      admin: { description: 'Source or URL.' },
    },
  ],
}