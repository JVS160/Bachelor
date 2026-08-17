import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ModellingLanguages } from './collections/ModellingLanguages'
import { ModelKinds } from './collections/ModelKinds'
import { ModelInstances } from './collections/ModelInstances'
import { Tools } from './collections/Tools'
import { ArchimateMappings } from './collections/ArchimateMappings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: '· Conceptual Modelling Library' },
  },

  collections: [
    Users,
    Media,
    ModellingLanguages,
    ModelKinds,
    ModelInstances,
    Tools,
    ArchimateMappings,
  ],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
  }),

  sharp,

  cors: [
    'http://localhost:4200',
    'http://conceptual-modelling-library.big.tuwien.ac.at',
    'http://128.131.169.215',
  ],
  csrf: [
    'http://localhost:4200',
    'http://conceptual-modelling-library.big.tuwien.ac.at',
    'http://128.131.169.215',
  ],

  plugins: [
    importExportPlugin({
      collections: [
        { slug: 'modelling-languages' },
        { slug: 'model-kinds' },
        { slug: 'model-instances' },
        { slug: 'tools' },
        { slug: 'archimate-mappings' },
      ],
    }),
  ],
})
