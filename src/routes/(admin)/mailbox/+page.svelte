<script lang="ts">
	interface Mail {
		id: string;
		from?: string;
		message?: string;
		contact?: string;
	}

	const getMail = async () => {
		const res = await fetch('/api/mailbox');
		const data = (await res.json()).data as Mail[];

		if (res.ok) {
			return data;
		} else {
			throw new Error(res.statusText);
		}
	};
</script>

{#await getMail()}
	<div>...Loading</div>
{:then mail}
	{#if mail.length > 0}
		<link
			rel="stylesheet"
			href="//cdn.jsdelivr.net/combine/npm/purecss@3.0.0/build/tables-min.css,npm/purecss@3.0.0/build/buttons-min.css"
		/>
		<table class="pure-table">
			<thead>
				<tr>
					<th>From</th>
					<th>Contact</th>
					<th>Message</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each mail as { id, from, contact, message } (id)}
					<tr>
						<td>{from}</td>
						<td>{contact}</td>
						<td>{message}</td>
						<td>
							<button on:click={() => fetch(`/api/mailbox/${id}`, { method: 'DELETE' })}>
								Delete
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<div>mailbox is empty</div>
	{/if}
{:catch error}
	<p>{error}</p>
{/await}

<style>
	.pure-table {
		min-width: 90vw;
	}
</style>
