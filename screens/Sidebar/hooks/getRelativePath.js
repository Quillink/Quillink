const getRelativePath = (explorer, targetId, currentPath = "") => {
	for (const item of explorer.items) {
		if (item.id === targetId) {
			return currentPath + item.name;
		}

		if (item.isFolder) {
			const pathInFolder = getRelativePath(item, targetId, currentPath + item.name + "/");
			if (pathInFolder) {
				return pathInFolder;
			}
		}
	}
	return null; // Return null if the target is not found.
}

export default getRelativePath;