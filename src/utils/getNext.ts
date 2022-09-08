import { ManagePath, ProductDemandPath, ProductPath } from "@/utils/routingTable";

const router = [
  {
    path: `${ManagePath}${ProductPath}${ProductDemandPath}/service/firmware`,
    key: 0
  },
  {
    path: `${ManagePath}${ProductPath}${ProductDemandPath}/service/mac`,
    key: 1
  },
  {
    path: `${ManagePath}${ProductPath}${ProductDemandPath}/service/burn`,
    key: 2
  },
  {
    path: `${ManagePath}${ProductPath}${ProductDemandPath}/service/pre-fit`,
    key: 3
  },
  {
    path: `${ManagePath}${ProductPath}${ProductDemandPath}/service/label`,
    key: 4
  },
  {
    path: `${ManagePath}${ProductPath}${ProductDemandPath}/check`,
    key: 5
  }
];
// 这个函数主要是保证 在保存 next 的时候 找到合适的下一步跳转
export const getNextRouter = (currentIndex, routerList) => {
  // 获得下一个路由
  const temp = [...routerList.sort(function(a, b) {
    return a - b;
  })];
  if (temp.length === 0) {
    return router[5].path;
  }
  if (currentIndex === -1) {
    return router[temp[0]].path;
  }
  for (const tempElement of temp) {
    if (tempElement > currentIndex) {
      return router[tempElement].path;
    }
  }
};
