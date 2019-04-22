/**
 * Given a 'command' and an array of 'validators', return a new
 * function that validates its arguments before invoking the
 * the underlying function.
 *
 * @param {Function} command
 * @param {Array<Function>} validators
 * @return {Function}
 */
const makeCommand = (command, validators = []) => {
	return (input, args, config) => {
		return Promise.all(validators.map((validator) => {
			return new Promise((resolve, reject) => {
				validator(input, args, config);
				resolve();
			});
		}))
			.then(() => command(input, args, config))
			.catch((err) => { throw err });
	};
};

export default makeCommand;
