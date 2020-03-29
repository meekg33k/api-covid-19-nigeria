const getStateAndSpreadCount = (stateCountEntries) => {
	const parsedStateCountEntries = stateCountEntries.map((stateCountEntry) => {
		const stateCountTokens = stateCountEntry.split('-');
		return {
			state: stateCountTokens[0].trim(),
			confirmed: parseInt(stateCountTokens[1].trim())
		}
	});

	return parsedStateCountEntries;
}

const getTotalCountByCategory = (countsPerCategory) => {
	const parsedCategories = countsPerCategory.map((countPerCategory) => {
		const categoryTokens = countPerCategory.trim().split(' ');
		return {
			category: categoryTokens[1].trim(),
			count: parseInt(categoryTokens[0].trim())
		}
	});

	return parsedCategories;
}


module.exports = {
	getStateAndSpreadCount,
	getTotalCountByCategory
}