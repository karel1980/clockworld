import { createAnswer } from './reducer';

describe('createAnswers', () => {
	describe('labels', () => {
		describe('on the hour', () => {
			it('renders 0:00 correctly', () => {
				expect(createAnswer(true, 0, 0).label).toEqual('12 uur');
			});
			it('renders 1:00 correctly', () => {
				expect(createAnswer(true, 1, 0).label).toEqual('1 uur');
			});
			it('renders 6:00 correctly', () => {
				expect(createAnswer(true, 6, 0).label).toEqual('6 uur');
			});
			it('renders 11:00 correctly', () => {
				expect(createAnswer(true, 11, 0).label).toEqual('11 uur');
			});
		});

		describe('between 5 and 10 past the hour', () => {
			it('renders 0:05 correctly', () => {
				expect(createAnswer(true, 0, 5).label).toEqual('5 over 12');
			});
			it('renders 5:10 correctly', () => {
				expect(createAnswer(true, 5, 10).label).toEqual('10 over 5');
			});
		})

		describe('q past hour', () => {
			it('renders 0:15 correctly', () => {
				expect(createAnswer(true, 0, 15).label).toEqual('kwart over 12');
			});
			it('renders 6:15 correctly', () => {
				expect(createAnswer(true, 6, 15).label).toEqual('kwart over 6');
			});
		});

		describe('half hour', () => {
			it('renders 11:30 correctly', () => {
				expect(createAnswer(true, 11, 30).label).toEqual('half 12');
			});
			it('renders 0:30 correctly', () => {
				expect(createAnswer(true, 0, 30).label).toEqual('half 1');
			});
		});

		describe('between half and quarter to hour', () => {
			it('renders 11:35 correctly', () => {
				expect(createAnswer(true, 11, 35).label).toEqual('25 voor 12');
			});
			it('renders 01:40 correctly', () => {
				expect(createAnswer(true, 1, 40).label).toEqual('20 voor 2');
			});
		});

		describe('quarter to hour', () => {
			it('renders 11:45 correctly', () => {
				expect(createAnswer(true, 11, 45).label).toEqual('kwart voor 12');
			});
			it('renders 00:45 correctly', () => {
				expect(createAnswer(true, 0, 45).label).toEqual('kwart voor 1');
			});
		});

		describe('5 or 10 to hour', () => {
			it('renders 11:50 correctly', () => {
				expect(createAnswer(true, 11, 50).label).toEqual('10 voor 12');
			});
			it('renders 0:55 correctly', () => {
				expect(createAnswer(true, 0, 55).label).toEqual('5 voor 1');
			});
		});
	});
});
