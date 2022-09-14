const getFile = (data, idList) => {
  for (const i of data) {
    if (i?.children) {
      getFile(i?.children, idList);
    }
    if (i?.type === "fileNode" || i?.type === "image") {
      idList.push(i?.src?.id);
    }
  }
};

export const getFileID = (data) => {
  const { root } = data;
  const node = [];
  if (root?.children) {
    getFile(root?.children, node);
  }
  return node.toString();
};
