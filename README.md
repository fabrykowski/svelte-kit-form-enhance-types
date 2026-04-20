# svelte-kit-form-enhance-types

Minimal reproduction for `@typescript-eslint/no-misused-promises` with SvelteKit remote forms.

## Reproduces

This repo uses:

- SvelteKit remote `form`
- `form.enhance(...)` with an `async` callback
- `@typescript-eslint/no-misused-promises`

The lint rule flags the async `enhance` callback in [`src/routes/+page.svelte`](./src/routes/+page.svelte).

## Run

```sh
npm install
npm run lint
```

Expected result:

```text
src/routes/+page.svelte
  8:23  error  Promise returned in function argument where a void return was expected  @typescript-eslint/no-misused-promises
```
