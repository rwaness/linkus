import { getId } from '@/services/mongodbStitchService';

/* eslint-disable import/prefer-default-export */
export function formatApp(app) {
  return {
    ...app,
    id: getId(app),
  };
}
