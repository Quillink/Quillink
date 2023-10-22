import addNode from './addNode';

const useTraverseTree = () => {

  const insertNode = (tree, folderId, item, isFolder, currentRelPath = "") => {
    if (tree.id === folderId && tree.isFolder) {

      var relPath = `${currentRelPath}/${tree.name}/`.replace('/', '');

      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        relPath: relPath, // for some reason this only removes the first '/'
        isFolder: isFolder,
        items: []
      });

      addNode(item, isFolder, relPath)

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      const relativePath = `${currentRelPath}/${tree.name}`;
      return insertNode(ob, folderId, item, isFolder, relativePath); // Pass updated relPath
    });

    return { ...tree, items: latestNode };
  };

  return { insertNode };
};

export default useTraverseTree;