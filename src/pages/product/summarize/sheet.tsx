import React from 'react';
import styles from './style/index.module.less';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import useLocale from '@/pages/product/summarize/locale/useLocale';
import DynamicMiniInput from '@/components/Dynamic/Input/mini';

const bodyStyle = {
  paddingTop: '0',
  marginRight: '1rem',
  transition: ' 0.5s all ease-in-out'
};
export default function Sheet() {
  const t = useLocale();
  return <DynamicOuterCard title={t['summarize.sheet.title']} bodyStyle={bodyStyle}>
    <table cellPadding='1' cellSpacing='1' className={styles['table-style']}>
      <tr>
        <th className={styles["mini"]}>勾选</th>
        <th className={styles["mini"]}>IDs</th>
        <th className={styles["medium"]}>Project Name:</th>
        <th colSpan={6}><DynamicMiniInput /></th>
      </tr>
      <tr>
        <td></td>
        <td>1</td>
        <td>Module Name:</td>
        <td colSpan={6}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td rowSpan={12}></td>
        <td rowSpan={12}>2</td>
        <td rowSpan={12}>Coustome Firmware</td>
        <td rowSpan={2}>Firmware Version Number</td>
        <td rowSpan={2} colSpan={2}><DynamicMiniInput /></td>
        <td>Flash Encryption</td>
        <td colSpan={2}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td>Secure Boot</td>
        <td><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td rowSpan={5}> Bin Files</td>
        <td colSpan={2}>Name of Firmware bin files</td>
        <td colSpan={2}>Md5 value of the "xxx.bin" file</td>
        <td>Flash Offset</td>
      </tr>
      <tr>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td rowSpan={2}>Flash SPI Configuration</td>
        <td>Configurations</td>
        <td colSpan={2}>Flash Speed</td>
        <td>Flash Mode</td>
        <td>Flash Size</td>
      </tr>
      <tr>
        <td> Target Configurations</td>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td rowSpan={2}>eFuse requirements</td>
        <td>eFuse bit</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td>Target Value</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}> Serial Port Print String</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      {/*第三行*/}
      <tr>
        <td rowSpan={5}></td>
        <td rowSpan={5}>3</td>
        <td rowSpan={5}>Custom MAC</td>
        <td colSpan={2}>Starting Address</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}>Ending Address</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}>MAC Address total</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}>每个模组占用 MAC 数量</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}>可用于生产模组数量</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      {/*第四行*/}
      <tr>
        <td rowSpan={5}></td>
        <td rowSpan={5}>4</td>
        <td rowSpan={5}>Customized Content</td>
        <td rowSpan={3}>Flash</td>
        <td>data type</td>
        <td>flash offset</td>
        <td colSpan={3}>Serial port print string</td>
      </tr>
      <tr>
        <td><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
        <td colSpan={3}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
        <td colSpan={3}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td rowSpan={2}>eFuse</td>
        <td>data type</td>
        <td>eFuse offset</td>
        <td colSpan={3}>Serial port print string</td>
      </tr>
      <tr>
        <td><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
        <td colSpan={3}><DynamicMiniInput /></td>
      </tr>

      {/*第五节内容*/}
      <tr>
        <td rowSpan={3}></td>
        <td rowSpan={3}>4</td>
        <td rowSpan={3}>Label</td>
        <td colSpan={2}>Custom or Not</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td rowSpan={2}> Sample</td>
        <td>Module Laser</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td>package</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
    </table>
  </DynamicOuterCard>;
}
