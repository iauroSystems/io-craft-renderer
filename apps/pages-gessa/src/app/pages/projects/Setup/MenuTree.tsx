import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { setLocalStorage } from 'apps/pages-gessa/src/utils/localStorageService';
import generateRandomString from 'apps/pages-gessa/src/utils/randomString';
import { useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveMenuName, setSortedMenus } from '../store/sortedMenuSlice';

type Props = {
  tree: IMenuTree[];
  activeMenu: (data: IMenuTree) => any;
  saveTree: (data: IMenuTree[]) => any;
};

export interface IMenuTree {
  _id: string;
  name: string;
  pageId: string;
  icon: string;
  child: IMenuTree[];
}

const MenuTree = forwardRef((props: Props, ref: any) => {
  const [nodes, setNodes] = useState<IMenuTree[]>([
    // { id: generateRandomString(), name: '', child: [] },
  ]);

  const [activeNode, setActiveNode] = useState<any>({});
  const dispatch = useDispatch();

  useEffect(() => {
    setNodes(props.tree);
  }, [props.tree]);

  const handleAddNode = (parentId: any, childId: any) => {
    const newNodes = [...nodes];
    const initialTree: IMenuTree = {
      _id: generateRandomString(),
      name: '',
      icon: '',
      pageId: '',
      child: [],
    };

    if (parentId === '-1' && childId === '-1') {
      newNodes.push(initialTree);
    } else if (parentId === childId) {
      const parentIndex = newNodes.findIndex((node) => node._id === parentId);
      newNodes[parentIndex].child.push(initialTree);
    } else {
      const parentIndex = newNodes.findIndex((node) => node._id === parentId);
      const childIndex = newNodes[parentIndex].child.findIndex(
        (node) => node._id === childId
      );
      newNodes[parentIndex].child[childIndex].child.push(initialTree);
    }

    setNodes(newNodes);
    props.saveTree(newNodes);
  };

  const handleDeleteNode = (nodeId: any) => {
    const newNodes = [...nodes];

    const deleteNode = (id: string, targetNode: IMenuTree): any => {
      if (targetNode._id === id) {
        return null;
      }
      if (targetNode && targetNode.child) {
        targetNode.child = targetNode.child.filter((childNode: IMenuTree) => {
          const newChildNode = deleteNode(id, childNode);
          return newChildNode !== null;
        });
      }

      return targetNode;
    };

    const _newNodes: IMenuTree[] = [];
    for (let i = 0; i < newNodes.length; i += 1) {
      _newNodes.push(deleteNode(nodeId, newNodes[i]));
    }
    setNodes(_newNodes);
    props.saveTree(newNodes);
  };

  const handleInputChange = (event: any, nodeId: any, childId: any) => {
    const newNodes = [...nodes];
    const parentIndex = newNodes.findIndex((node) => node._id === nodeId);

    if (nodeId === childId) {
      newNodes[parentIndex].name = event.target.value;
    } else {
      const childIndex = newNodes[parentIndex].child.findIndex(
        (node:any) => node._id === childId
      );
      newNodes[parentIndex].child[childIndex].name = event.target.value;
    }
    setNodes(newNodes);
    props.saveTree(newNodes);
  };
  const activeNodeFunc = (data: any) => {
    props.activeMenu(data);
    setActiveNode(data);
  };

  const saveTree = () => {
    const origTree: IMenuTree[] = [...nodes];
    const k2: any = {
      _id: '1',
      data: [],
    };
    for (let i = 0; i < origTree.length; i += 1) {
      const firstChild = {
        data: origTree[i],
        child: origTree[i].child,
      };
      k2.data.push(firstChild);
    }
    setLocalStorage('navigatedMenus', k2);
    setLocalStorage('configuredMenus', origTree);

    dispatch(setActiveMenuName(''));
    dispatch(setSortedMenus(k2));
  };
  useImperativeHandle(ref, () => ({
    saveTree2() {
      saveTree();
    },
  }));
  return (
    <div ref={ref} style={{ padding: '10px', width: 'calc(100% - 0px)' }}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: '10px',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={() => handleAddNode('-1', '-1')}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      <Box style={{ height: '400px', overflowY: 'auto' }}>
        <TreeView sx={{ width: '100%' }}>
          {nodes.map((node: IMenuTree) => (
            <TreeItem
              key={node._id}
              nodeId={node._id}
              label={
                <TextField
                  size={'small'}
                  defaultValue={node.name}
                  onBlur={(event:any) =>
                    handleInputChange(event, node._id, node._id)
                  }
                />
              }
              onClick={() => activeNodeFunc(node)}
            >
              {node.child &&
                node.child.map((child: IMenuTree) => (
                  <TreeItem
                    key={child._id}
                    nodeId={child._id}
                    sx={{ padding: '5px' }}
                    label={
                      <Box
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '20px',
                        }}
                      >
                        <TextField
                          size={'small'}
                          defaultValue={child.name}
                          onBlur={(event:any) =>
                            handleInputChange(event, node._id, child._id)
                          }
                        />
                        <IconButton onClick={() => handleDeleteNode(child._id)}>
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </Box>
                    }
                    onClick={() => activeNodeFunc(child)}
                  >
                  </TreeItem>
                ))}
              <IconButton onClick={() => handleAddNode(node._id, node._id)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </TreeItem>
          ))}
        </TreeView>
      </Box>
      {nodes && nodes.length === 0 && (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1">
            Click on
            {
              <IconButton
                size="small"
                onClick={() => handleAddNode('-1', '-1')}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            }
            button to add menus
          </Typography>
        </Box>
      )}
    </div>
  );
});

export default MenuTree;
