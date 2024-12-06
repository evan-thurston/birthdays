import type { Dayjs } from 'dayjs';

type Birthdate = {
	date: Dayjs;
	birthdays: Array<{
		id: number;
		name: string;
		pic: string;
	}>;
};

export type { Birthdate };
