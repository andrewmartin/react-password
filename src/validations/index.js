export const startsWithSpace = value => (value.startsWith(' ') ? 'Must not start with a space.' : null);
export const endsWithSpace = value => (value.endsWith(' ') ? 'Must not end with a space.' : null);
export const lowerCaseLetter = value => (!/[a-z]/.test(value) ? 'Must contain at least one lower case letter' : null);
export const upperCaseLetter = value => (!/[A-Z]/.test(value) ? 'Must contain at least one upper case letter' : null);
export const between9And50Length = value =>
  value.length <= 9 || value.length >= 50 ? 'Must be between 9 and 50 characters' : null;

export default [startsWithSpace, endsWithSpace, lowerCaseLetter, upperCaseLetter, between9And50Length];
