import { log, info } from '@anmiles/logger';
import { Progress } from '../progress';

type Logs = {
	log?: any[],
	info?: any[],
};

jest.mock<Partial<{ log: typeof log, info: typeof info }>>('@anmiles/logger', () => ({
	log  : jest.fn().mockImplementation((...data: any[]) => (logs.log ||= []).push(...data)),
	info : jest.fn().mockImplementation((...data: any[]) => (logs.info ||= []).push(...data)),
}));

const logs: Logs = {};

beforeEach(() => {
	delete logs.log;
	delete logs.info;
});

function generateProgress(count: number, limit?: number) {
	const items = Array(count).fill(0);

	const progress = limit
		? new Progress('Processing items', items, { limit })
		: new Progress('Processing items', items);

	items.forEach(() => progress.tick());
}

describe('src/lib/progress', () => {
	describe('default limit', () => {
		describe('should display all progress messages', () => {
			it('if count equals to limit', () => {
				generateProgress(10);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/10)...',
						'Processing items (2/10)...',
						'Processing items (3/10)...',
						'Processing items (4/10)...',
						'Processing items (5/10)...',
						'Processing items (6/10)...',
						'Processing items (7/10)...',
						'Processing items (8/10)...',
						'Processing items (9/10)...',
						'Processing items (10/10)...',
					],
				});
			});

			it('if count is less than limit', () => {
				generateProgress(8);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/8)...',
						'Processing items (2/8)...',
						'Processing items (3/8)...',
						'Processing items (4/8)...',
						'Processing items (5/8)...',
						'Processing items (6/8)...',
						'Processing items (7/8)...',
						'Processing items (8/8)...',
					],
				});
			});
		});

		describe('should throttle progress messages', () => {
			it('if count = limit + 1', () => {
				generateProgress(11);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/11)...',
						'Processing items (3/11)...',
						'Processing items (5/11)...',
						'Processing items (7/11)...',
						'Processing items (9/11)...',
						'Processing items (11/11)...',
					],
				});
			});

			it('if count = limit + 2', () => {
				generateProgress(12);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/12)...',
						'Processing items (3/12)...',
						'Processing items (5/12)...',
						'Processing items (7/12)...',
						'Processing items (9/12)...',
						'Processing items (11/12)...',
						'Processing items (12/12)...',
					],
				});
			});

			it('if count = limit * 2 - 1', () => {
				generateProgress(19);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/19)...',
						'Processing items (3/19)...',
						'Processing items (5/19)...',
						'Processing items (7/19)...',
						'Processing items (9/19)...',
						'Processing items (11/19)...',
						'Processing items (13/19)...',
						'Processing items (15/19)...',
						'Processing items (17/19)...',
						'Processing items (19/19)...',
					],
				});
			});

			it('if count = limit * 2', () => {
				generateProgress(20);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/20)...',
						'Processing items (4/20)...',
						'Processing items (7/20)...',
						'Processing items (10/20)...',
						'Processing items (13/20)...',
						'Processing items (16/20)...',
						'Processing items (19/20)...',
						'Processing items (20/20)...',
					],
				});
			});

			it('if count = limit * 3', () => {
				generateProgress(30);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/30)...',
						'Processing items (5/30)...',
						'Processing items (9/30)...',
						'Processing items (13/30)...',
						'Processing items (17/30)...',
						'Processing items (21/30)...',
						'Processing items (25/30)...',
						'Processing items (29/30)...',
						'Processing items (30/30)...',
					],
				});
			});
		});
	});

	describe('specified limit', () => {
		const limit = 4;

		describe('should display all progress messages', () => {
			it('if count equals to limit', () => {
				generateProgress(4, limit);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/4)...',
						'Processing items (2/4)...',
						'Processing items (3/4)...',
						'Processing items (4/4)...',
					],
				});
			});

			it('if count is less than limit', () => {
				generateProgress(3, limit);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/3)...',
						'Processing items (2/3)...',
						'Processing items (3/3)...',
					],
				});
			});
		});

		describe('should throttle progress messages', () => {
			it('if count = limit + 1', () => {
				generateProgress(5, limit);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/5)...',
						'Processing items (3/5)...',
						'Processing items (5/5)...',
					],
				});
			});

			it('if count = limit + 2', () => {
				generateProgress(6, limit);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/6)...',
						'Processing items (3/6)...',
						'Processing items (5/6)...',
						'Processing items (6/6)...',
					],
				});
			});

			it('if count = limit * 2 - 1', () => {
				generateProgress(7, limit);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/7)...',
						'Processing items (3/7)...',
						'Processing items (5/7)...',
						'Processing items (7/7)...',
					],
				});
			});

			it('if count = limit * 2', () => {
				generateProgress(8, limit);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/8)...',
						'Processing items (4/8)...',
						'Processing items (7/8)...',
						'Processing items (8/8)...',
					],
				});
			});

			it('if count = limit * 3', () => {
				generateProgress(12, limit);

				expect(logs).toEqual({
					info : [ 'Processing items...' ],
					log  : [
						'Processing items (1/12)...',
						'Processing items (5/12)...',
						'Processing items (9/12)...',
						'Processing items (12/12)...',
					],
				});
			});
		});
	});
});
