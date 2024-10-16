function getCountStyle(count: number) {
	if (count === 0) {
		return "neuter";
	} else if (count < 5) {
		return "less";
	} else if (count === 5) {
		return "exact";
	} else {
		return "more";
	}
}

export { getCountStyle };
