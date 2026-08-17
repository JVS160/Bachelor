import type { CollectionConfig } from 'payload'
import { publicReadAll } from '../access/publicRead'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'vendor', 'licenseType'],
    group: 'Library',
  },
  access: { read: publicReadAll },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'vendor', type: 'text' },
    { name: 'url', type: 'text' },
    {
      name: 'licenseType',
      type: 'select',
      options: [
        { label: 'Open Source', value: 'open_source' },
        { label: 'Proprietary', value: 'proprietary' },
        { label: 'Freemium', value: 'freemium' },
        { label: 'Academic', value: 'academic' },
        { label: 'Unknown', value: 'unknown' },
      ],
    },
    { name: 'toolPurpose', type: 'textarea' },
    {
      name: 'supportedLanguages',
      type: 'join',
      collection: 'modelling-languages',
      on: 'tools',
      admin: {
        description:
          'This is maintained in the language via the “tools” field and appears automatically.',
      },
    },
  ],
}