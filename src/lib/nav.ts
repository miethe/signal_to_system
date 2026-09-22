/**
 * Primary-nav active state for the v2 shell. An item is active when the
 * current path equals or sits under one of its `match` prefixes and under
 * none of its `exclude` prefixes. Trailing slashes are ignored.
 */
export interface NavItem {
  label: string;
  href: string;
  match?: readonly string[];
  exclude?: readonly string[];
}

const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
const under = (path: string, prefix: string) => {
  const pre = trim(prefix);
  return path === pre || path.startsWith(pre + '/');
};

export function isNavActive(item: NavItem, pathname: string): boolean {
  const path = trim(pathname);
  const match = item.match ?? [item.href];
  if (!match.some((m) => under(path, m))) return false;
  return !(item.exclude ?? []).some((x) => under(path, x));
}
