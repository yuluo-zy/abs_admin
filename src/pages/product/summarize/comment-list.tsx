import React, { useContext } from "react";
import { List } from "@arco-design/web-react";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import { Read } from "@/components/Dynamic/Makedown/read";
import { GlobalContext } from "@/context";
import styles from "./style/index.module.less";
import DynamicDivider from "@/components/Dynamic/Divider";
import UserInfo from "@/pages/product/summarize/user-info";

const names = ["Socrates", "Balzac", "Plato"];
const avatarSrc = [
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
];
const imageSrc = [
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp"
];
const dataSource = new Array(15).fill(null).map((_, index) => {
  return {
    creator: 'name',
    avatar: avatarSrc[index % avatarSrc.length],
    title: names[index % names.length],
    remarks:
      "Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).",
    imageSrc: imageSrc[index % imageSrc.length],
    created: "",

     };

});
export default function CommentList() {

  const { theme } = useContext(GlobalContext);

  const getTheme = (theme) => {
    return theme === "dark";
  };

  return (
    <DynamicSkeleton text={{ rows: 11, width: "90rem" }}>
      <List
        bordered={false}
        dataSource={dataSource}
        pagination={{ pageSize: 3 }}
        render={(item, index) => (
          <div key={index} className={styles['comment-item']}>
            <div className={styles['user-info']}>
             <UserInfo userId={item?.creator}/>
              <div>{item?.created}</div>
            </div>
            <Read key={index} theme={getTheme(theme)} html={item.remarks} />
            <DynamicDivider/>
          </div>
        )}
      />
    </DynamicSkeleton>
  );
}
