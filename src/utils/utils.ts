const sample = <T>(options: T[]) => {
	if (options.length === 0) {
		throw new Error("Options can't be an empty array");
	}
	return options[Math.floor(Math.random() * options.length)] as T;
};

function isValidString(string: string) {
	const regex = /^[A-Za-z]+$/;
	return regex.test(string);
}

export { sample, isValidString };
