export default check_verification_time = (account_created_time) => {
	const date = new Date();

	const current_date = `${date.getDate()}-${
		date.getMonth() + 1
	}-${date.getFullYear()}`;

	console.log("current_date: ", current_date);
	console.log("account_created_time: ", account_created_time);

	if (current_date === account_created_time) return true;

	return false;
};
