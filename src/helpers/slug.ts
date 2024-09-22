import slugify from 'slugify';

export function generateSlug(str: string) {
  return slugify(str.toLowerCase());
}
