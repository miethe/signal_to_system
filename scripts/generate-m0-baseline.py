from pathlib import Path
import hashlib
import json

files = sorted(path for path in Path('dist').rglob('*') if path.is_file())


def route_for(path: Path) -> str | None:
    output = path.relative_to('dist').as_posix()
    if output == 'index.html':
        return '/'
    if output.endswith('/index.html'):
        return '/' + output[:-10]
    if output.endswith(('.html', '.xml', '.json')):
        return '/' + output
    return None


def family_for(route: str) -> str:
    for prefix, family in (
        ('/essays/', 'essay-reader'), ('/evidence/', 'essay-evidence'),
        ('/dev-stories/', 'dev-stories'), ('/portfolio/ui/', 'portfolio-ui'),
        ('/series/', 'series'), ('/aos/', 'aos'), ('/systems/', 'systems'),
        ('/tags/', 'tag'), ('/topics/', 'topic'), ('/projects/', 'project'),
    ):
        if route.startswith(prefix):
            return family
    return 'site'

routes = []
for path in files:
    route = route_for(path)
    if route:
        routes.append({
            'path': route,
            'output': path.relative_to('dist').as_posix(),
            'family': family_for(route),
            'action': 'preserve',
            'target': route,
        })

manifest = {
    'schemaVersion': 1,
    'generatedFrom': {'commit': '78de390', 'buildCommand': 'npm run build', 'generatedAt': '2026-09-22', 'routeCount': len(routes)},
    'policy': {
        'defaultAction': 'preserve',
        'redirects': 'None are authorized by this baseline. Future redirects require collision, chain, and loop tests.',
        'fragments': 'Fragment identifiers are client-side anchors and are not emitted as separate files.',
    },
    'routes': routes,
}
Path('docs/project_plans/s2s-v2/migration-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
baseline = {
    'schemaVersion': 1,
    'baselineCommit': '78de390',
    'buildCommand': 'npm run build',
    'nodeVersion': 'v22.20.0',
    'routeCount': len(routes),
    'outputFileCount': len(files),
    'routes': [route['path'] for route in routes],
    'outputs': [path.relative_to('dist').as_posix() for path in files],
    'collections': {'posts': 5, 'projects': 0, 'series': 2, 'stories': 10, 'ui': 7},
    'lockfile': {'path': 'package-lock.json', 'sha256': hashlib.sha256(Path('package-lock.json').read_bytes()).hexdigest()},
}
Path('docs/project_plans/s2s-v2/baseline.json').write_text(json.dumps(baseline, indent=2) + '\n')
Path('tests/m0/routes.snapshot.json').write_text(json.dumps({'routes': [route['path'] for route in routes]}, indent=2) + '\n')
