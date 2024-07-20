### Indexing

- Indexing: tree or flat
- `Node.resolve` helps get parent of the position, offset into that parent, what
  ancestors the parent has, etc…
- Have no clue what this exactly means:

> Take care to distinguish between child indices (as per childCount),
> document-wide positions, and node-local offsets (sometimes used in recursive
> functions to represent a position into the node that's currently being
> handled).

### Slices

- node at start and end might be open.
- <p>aa</p><p>b</p>
- `Node.replace` replaces a given range of document with a slice of new content.
- Node copy: `Node.copy`
- Some methods on Fragment: `replaceChild`, `append`

### Schemas
