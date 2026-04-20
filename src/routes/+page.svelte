<script lang="ts">
	import { slowForm } from './form.remote';

	let submitting = $state(false);
</script>

<form
	{...slowForm.enhance(async ({ submit }) => {
		submitting = true;
		await submit();
		submitting = false;
		// might also check slowForm.fields.allIssues() etc. here
	})}
>
	<button type="submit" disabled={submitting}>
		{submitting ? 'Submitting...' : 'Submit'}
	</button>
</form>
