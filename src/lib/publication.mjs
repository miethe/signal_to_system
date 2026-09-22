/** Build-time eligibility rule for publicly emitted collection entries. */
export function isPublishable(entry) {
  return entry.data.status === 'published' || entry.data.status === 'evergreen';
}
