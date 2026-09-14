import { error } from '@sveltejs/kit';
import { SYNTHETIC_INITIATIVES } from '$lib/domain/fixtures';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const initiative = SYNTHETIC_INITIATIVES.find((item) => item.id === params.id);

	if (!initiative) {
		error(404, 'Initiative not found');
	}

	return { initiative };
};
