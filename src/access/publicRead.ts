import type { Access } from 'payload'

export const publicRead: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

export const publicReadAll: Access = () => true