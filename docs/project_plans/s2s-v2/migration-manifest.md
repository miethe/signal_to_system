# Route and ID migration manifest

`migration-manifest.json` is the M0 route baseline generated from the built `dist/` tree, rather than a handoff inventory. Each emitted HTML, XML, and JSON endpoint has one canonical `path`, its exact output file, a route family, and an explicit `preserve` action. It includes the Registry Wave's focused evidence, figure, and thread routes; series; AOS and Systems facets; and `/portfolio/ui/` documentation.

This is a continuity contract, not a redirect implementation. Future route work must retain every `preserve` path or add a reviewed replacement action before changing the route. Fragment identifiers are intentionally documented as client-side anchors because static output does not emit them separately. `npm run test:routes` compares the current build to this manifest and its committed snapshot.

## Redirect contract

A future route may use `"action": "redirect"` only with a `"target"` that names an existing canonical manifest path. The build emits a static, noindex redirect page for that source and omits the source from the sitemap. Redirect sources cannot collide with canonical paths or one another, point through another redirect, form a loop, or target a path absent from the manifest.
