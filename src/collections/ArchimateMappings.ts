import type { CollectionConfig } from 'payload'
import { publicReadAll } from '../access/publicRead'

export const ArchimateMappings: CollectionConfig = {
  slug: 'archimate-mappings',
  labels: { singular: 'ArchiMate Mapping', plural: 'ArchiMate Mappings' },
  admin: {
    useAsTitle: 'archimateConcept',
    defaultColumns: ['archimateConcept', 'modelKind', 'mappingType'],
    group: 'Library',
  },
  access: { read: publicReadAll },
  fields: [
    {
      name: 'modelKind',
      type: 'relationship',
      relationTo: 'model-kinds',
      required: true,
      index: true,
    },
    {
      name: 'sourceConstruct',
      type: 'text',
      admin: {
        description: 'The language construct to be mapped.',
      },
    },
    {
      name: 'archimateConcept',
      type: 'text',
      required: true,
    },
    {
      name: 'archimateLayer',
      type: 'select',
      options: [
        { label: 'Strategy', value: 'strategy' },
        { label: 'Business', value: 'business' },
        { label: 'Application', value: 'application' },
        { label: 'Technology', value: 'technology' },
        { label: 'Physical', value: 'physical' },
        { label: 'Implementation & Migration', value: 'implementation' },
      ],
    },
    {
      name: 'archimateAspect',
      type: 'select',
      options: [
        { label: 'Active Structure', value: 'active_structure' },
        { label: 'Behaviour', value: 'behaviour' },
        { label: 'Passive Structure', value: 'passive_structure' },
        { label: 'Motivation', value: 'motivation' },
      ],
    },
    {
      name: 'mappingType',
      type: 'select',
      required: true,
      defaultValue: 'direct',
      options: [
        { label: 'Direct', value: 'direct' },
        { label: 'Partial', value: 'partial' },
        { label: 'Bridging', value: 'bridging' },
      ],
    },
    {
      name: 'bridgingConcept',
      type: 'text',
      admin: {
        condition: (data) => data?.mappingType === 'bridging',
      },
    },
    { name: 'mappingDescription', type: 'richText' },
  ],
}