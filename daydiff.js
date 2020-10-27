const days = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

module.exports = {
	dayDiff: function(y1, m1, d1, y2, m2, d2) {
		return (y2 - y1 + 1) * 365 + leapYears2(y1, y2) - daysFromStart(y1, m1, d1) - daysTillEnd(y2, m2, d2);
	},
};

function leapYears1(y) {
	return y / 4 - y / 100 + y / 400;
}
function leapYears2(y1, y2) {
	let leaps = leapYears1(y2) - leapYears1(y1);
	if (y1 % 4 == 0 && y1 % 100 != 0 || y1 % 400 == 0) leaps++;

	return leaps;
}

function daysFromStart(y, m, d) {
	let diff = 0;

	// count months
	for (let i = 1; i < m; i++) {
		diff += days[i - 1];
	}

	// check leap year, if february has passed
	if (m > 2 && (y % 4 == 0 && y % 100 != 0 || y % 400 == 0)) diff++;

	diff += d - 1;

	return diff;
}

function daysTillEnd(y, m, d) {
	let diff = 0;

	diff += days[m - 1] - d;

	// check leap year, if before february
	if (m <= 2 && (y % 4 == 0 && y % 100 != 0 || y % 400 == 0)) diff++;

	// count months
	for (let i = m + 1; i <= 12; i++) {
		diff += days[i - 1];
	}

	return diff;
}