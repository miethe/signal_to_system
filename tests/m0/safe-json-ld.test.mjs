import test from 'node:test';
import assert from 'node:assert/strict';
import { serializeJsonLd } from '../../src/lib/safe-json-ld.mjs';

test('JSON-LD cannot close its script element or start an HTML comment', () => {
  const serialized = serializeJsonLd({ title: '</script><script>alert(1)</script>', note: '<!-- comment -->' });
  assert.equal(serialized.includes('</script>'), false);
  assert.equal(serialized.includes('<!--'), false);
  assert.match(serialized, /\\u003c\\/script>/);
  assert.match(serialized, /\\u003c!--/);
});

test('JSON-LD escapes JavaScript line separators', () => {
  const separator = String.fromCharCode(0x2028) + String.fromCharCode(0x2029);
  const serialized = serializeJsonLd({ text: separator });
  assert.equal(serialized.includes(separator), false);
  assert.match(serialized, /\\u2028/);
  assert.match(serialized, /\\u2029/);
});
