const router = [
  {
    path: "/product/demand/service/firmware",
    key: 0
  },
  {
    path: "/product/demand/service/mac",
    key: 1
  },
  {
    path: "/product/demand/service/burn",
    key: 2
  },
  {
    path: "/product/demand/service/pre-fit",
    key: 3
  },
  {
    path: "/product/demand/service/label",
    key: 4
  },
  {
    path: "/product/demand/check",
    key: 5
  }
]
export const getNextRouter = (currentIndex, routerList) => {
  // 获得下一个路由
  const temp = [...routerList.sort(function(a, b){return a - b})]
  if(temp.length === 0){
    return router[5].path
  }
  if(currentIndex === -1) {
    return router[temp[0]].path
  }
  for (const tempElement of temp) {
    if(tempElement> currentIndex){
      return router[tempElement].path
    }
  }
}
