import { getLabCatalog } from '../../../../lib/labs/site.ts';
import { buildCapsule, CAPSULE_SCOPES } from '../../../../lib/labs/capsule.mjs';

export const prerender = true;
const site = (import.meta.env.SITE || 'https://nickmiethe.com').replace(/\/$/, '');
export async function getStaticPaths() {
  const catalog = await getLabCatalog();
  return catalog.labs.flatMap((lab) => CAPSULE_SCOPES.map((scope) => ({ params: { slug: lab.investigation.publicId, scope }, props: { lab, scope } })));
}
export function GET({ props }) {
  return new Response(JSON.stringify(buildCapsule(props.lab, props.scope, { site }), null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
