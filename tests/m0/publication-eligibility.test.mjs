import test from 'node:test';
import assert from 'node:assert/strict';
import { isPublishable } from '../../src/lib/publication.mjs';

test('draft posts are ineligible for static emission', () => {
  assert.equal(isPublishable({ data: { status: 'draft' } }), false);
});

test('published and evergreen posts remain eligible', () => {
  assert.equal(isPublishable({ data: { status: 'published' } }), true);
  assert.equal(isPublishable({ data: { status: 'evergreen' } }), true);
});
