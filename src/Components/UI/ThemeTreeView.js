import React, { useEffect, useLayoutEffect, useState } from 'react';
import TreeView, { flattenTree } from 'react-accessible-treeview';

export default function ThemeTreeView(props) {
  const { items = [], isAllExpande } = props;

  const treeView = {
    name: '',
    children: items,
  };

  const data = flattenTree(treeView);

  return (
    <>
      <div className="directory">
        <TreeView
          data={data}
          defaultExpandedIds={[1]}
          aria-label="directory tree"
          nodeRenderer={({ element, isBranch, isExpanded, getNodeProps, level }) => (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              <div
                className="d-flex align-items-center"
              >
                <div className='d-flex align-items-center gap-2'>
                  {element.metadata.render({ element, isBranch, isExpanded })}
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
}
