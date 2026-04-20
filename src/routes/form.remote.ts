import { form } from '$app/server';

const sleep = (milliseconds: number): Promise<void> =>
	new Promise((resolve) => {
		setTimeout(resolve, milliseconds);
	});

export const slowForm = form(async () => {
	await sleep(3_000);

	return { ok: true };
});
