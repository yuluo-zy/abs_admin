import React, { useState } from 'react';
import { Tree } from '@arco-design/web-react';

const TreeData = [
  {
    title: 'Trunk 1',
    key: '0-0',
    children: [
      {
        title: 'Trunk 1-0',
        key: '0-0-0',
        children: [
          { title: 'leaf', key: '0-0-0-0' },
          {
            title: 'leaf',
            key: '0-0-0-1',
            children: [{ title: 'leaf', key: '0-0-0-1-0' }]
          },
          { title: 'leaf', key: '0-0-0-2' }
        ]
      },
      {
        title: 'Trunk 1-1',
        key: '0-0-1'
      },
      {
        title: 'Trunk 1-2',
        key: '0-0-2',
        children: [
          { title: 'leaf', key: '0-0-2-0' },
          {
            title: 'leaf',
            key: '0-0-2-1'
          }
        ]
      }
    ]
  },
  {
    title: 'Trunk 2',
    key: '0-1'
  },
  {
    title: 'Trunk 3',
    key: '0-2',
    children: [
      {
        title: 'Trunk 3-0',
        key: '0-2-0',
        children: [
          { title: 'leaf', key: '0-2-0-0' },
          { title: 'leaf', key: '0-2-0-1' }
        ]
      }
    ]
  }
];

function DynamicTree() {
  const [treeData, setTreeData] = useState(TreeData);

  return <div>
    <Tree
      treeData={treeData}
      checkable
      showLine={true}
      autoExpandParent={true}
      size={'large'}
      virtualListProps={{
        height: '300px'
      }}
    >
    </Tree>
  </div>;
}

export default DynamicTree;

