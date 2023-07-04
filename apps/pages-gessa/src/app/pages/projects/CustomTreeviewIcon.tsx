import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { alpha, styled } from '@mui/material/styles';
import React, { useState } from 'react';
// web.cjs is required for IE11 support
import { IconComponent } from '@iocraft/component-library';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { Context } from 'apps/pages-gessa/src/context/redux';
import { unstable_batchedUpdates } from 'react-dom';

export interface CustomTreeviewIconProps {
  data?: Array<any>;
  activeProjectContentId?: string;
  projectContentTree?: any;
  addContentTreeItem?: any;
  setActiveProjectContent?: any;
  handleClickOpen?: any;
  setTreeData?: any;
  setDeleteNodeId?: any;
  deleteNodeId?: any;
}

const isNodeExpanded = (node: any) => {
  return node
    .closest('.MuiTreeItem-content')
    .classList.contains('Mui-expanded');
};

const StyledTreeItem = styled((props: any) => (
  <TreeItem className="p-2" nodeId={props.nodeId} {...props} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.9,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  [`& .${treeItemClasses.content}`]: {
    height: 40,
    fontWeight: 400,
  },
  [`& .MuiTreeItem-label`]: {
    fontSize: '14px',
    fontWeight: '400px',
    color: '#ffffff',
  },
  [`& .MuiTreeItem-root`]: {
    width: '100%',
  },
}));

export const CustomTreeviewIcon = (props: CustomTreeviewIconProps) => {
  const [textValue, setTextValue] = React.useState('');

  const [showTextBoxNode, setShowTextBoxNode] = React.useState(-1);
  const [selectedData, setSelectedData]: any = React.useState({});
  const [clickedOutside, setClickedOutside] = React.useState(false);
  const [expanded, setExpanded] = React.useState<any>([]);
  const [open, setOpen]: any = React.useState(false);
  const Ids: any = [];

  const onChange = (e: any) => {
    if (e.key === 'Enter') {
      props.addContentTreeItem({ contentName: textValue, ...selectedData });
    }
    if (e.key === 'Enter') {
      setShowTextBoxNode(-1);
      setTextValue('');
    }
  };

  const handleOnBlur = (e: any) => {
    if (e.target.value === '') {
      setClickedOutside(true);
      setShowTextBoxNode(-1);
    } else {
      setTextValue('');
    }
  };

  const renderChilds = (data: any, level: number) => {
    return data?.children?.map?.((child: any) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingRight: '42px',
        }}
      >
        <StyledTreeItem
          nodeId={child._id}
          label={child.name}
          key={child._id}
          className={expanded.includes(child._id) ? 'selected' : ''}
          icon={
            child.child_allowed && child?.children.length ? (
              <IconComponent
                name={child.icon}
                color={theme.palette.getContrastText(
                  theme.palette.background.paper
                )}
                size={18}
                label={'Arrow-Down'}
              />
            ) : level > 1 ? (
              <IconComponent
                name={child.icon}
                color={theme.palette.getContrastText(
                  theme.palette.background.paper
                )}
                size={20}
                label={child.icon}
              />
            ) : (
              child.icon !== '' && (
                <IconComponent
                  name={child.icon.trim()}
                  color={theme.palette.getContrastText(
                    theme.palette.background.paper
                  )}
                  size={20}
                  label={child.icon}
                />
              )
            )
          }
          onClick={(e: any) => {
            props.setTreeData(child);
            setContext(child._id);
          }}
        >
          {renderChilds(child, level + 1)}
        </StyledTreeItem>
        <div style={{ paddingTop: '10px', paddingLeft: '10px' }}>
          <IconComponent
            name={'delete_black_24dp'}
            color={'white'}
            size={20}
            label={'delete'}
            handleClick={() =>
              props.setDeleteNodeId([...props.deleteNodeId, child._id])
            }
          />
        </div>
      </div>
    ));
  };
  const [context, setContext] = useState(Context);

  const [selected, setSelected] = React.useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  const theme = useTheme();

  return (
    <div className="pl-2 pr-2 pt-0">
      <TreeView
        sx={{ fontSize: 12 }}
        aria-label="customized"
        onClick={(e) => {
          // console.log(e);
        }}
        defaultCollapseIcon={
          <IconComponent
            name={'arrow_drop_down_black_24dp'}
            color={theme.palette.getContrastText(
              theme.palette.background.paper
            )}
            size={25}
            label={'arrow_drop_down_black_24dp'}
          />
        }
        defaultExpandIcon={
          <IconComponent
            name={'arrow_drop_up_black_24dp'}
            color={theme.palette.getContrastText(
              theme.palette.background.paper
            )}
            size={25}
            label={'arrow_drop_up_black_24dp'}
          />
        }
        defaultEndIcon={null}
        className="mt-6"
        selected={context}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        {props &&
          props.data &&
          props.data.length > 0 &&
          props.data.map((data: any, index: number) => {
            return (
              <div key={data._id} className="w-100 overflow-hidden flex">
                <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                  <StyledTreeItem
                    nodeId={data._id}
                    label={
                      <div
                        className="flex justify-between w-100 "
                        onClick={() => {
                          data &&
                            data.children &&
                            data.children.length === 0 &&
                            data.child_allowed === 0 &&
                            props.setActiveProjectContent(
                              data,
                              true,
                              1 // level
                            );
                          props.setTreeData(data);
                        }}
                      >
                        <div
                          style={{
                            flexGrow: 1,
                            fontWeight: 400,
                            color: '#ffffff',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            whiteSpace: 'nowrap',
                            width: 'auto',
                            maxWidth: '280px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {data.icon && (
                            <div style={{ paddingTop: '4px' }}>
                              <IconComponent
                                name={data.icon.trim()}
                                color={theme.palette.getContrastText(
                                  theme.palette.background.paper
                                )}
                                size={20}
                                label={data.icon}
                              />
                            </div>
                          )}
                          <Typography
                            sx={{
                              fontSize: '14px',
                              fontWeight: '600px',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignContent: 'center',
                              gap: '15px',
                            }}
                            title={data.name}
                            variant="h6"
                            color={theme.palette?.['common'].white}
                          >
                            {' '}
                            {data.name}
                          </Typography>
                        </div>
                        <div
                          onClick={(e) =>
                            unstable_batchedUpdates(() => {
                              isNodeExpanded(e.target) && e.stopPropagation();
                              if (data.children && data.children.length > 0) {
                                data.children.map((child: any) => {
                                  Ids.push(child._id);
                                });
                              }
                              Ids.push(data._id);
                              props.setDeleteNodeId(Ids);
                              setClickedOutside(false);
                              setSelectedData(data);
                            })
                          }
                          className=" py-1 cursor-pointer"
                        >
                          {data.child_allowed > 0 && (
                            <IconComponent
                              name={'delete_black_24dp'}
                              color={'white'}
                              size={20}
                              label={'delete'}
                            />
                          )}
                        </div>
                        <div
                          onClick={(e) =>
                            unstable_batchedUpdates(() => {
                              isNodeExpanded(e.target) && e.stopPropagation();
                              setShowTextBoxNode(index);
                              setClickedOutside(false);
                              setSelectedData(data);
                              props.setTreeData(data);
                            })
                          }
                          className=" px-2 py-1 cursor-pointer"
                        >
                          {data.child_allowed > 0 && (
                            <IconComponent
                              handleClick={() => props.setTreeData(data)}
                              name={'Vector'}
                              color={'white'}
                              size={18}
                              label={'add'}
                            />
                          )}
                        </div>
                      </div>
                    }
                    style={{ width: '100%' }}
                    classes={{ label: 'py-2' }}
                  >
                    {index === showTextBoxNode && (
                      <ClickAwayListener
                        onClickAway={() => setShowTextBoxNode(-1)}
                      >
                        <div className="flex items-center border-2 border-blue-800">
                          <div className="m-2">
                            <IconComponent
                              name={data.icon.trim()}
                              color={'white'}
                              size={20}
                              label={data.icon}
                            />
                          </div>
                          {!clickedOutside ? (
                            <input
                              style={{
                                outline: 'none',
                                fontSize: '12px',
                                fontWeight: 400,
                              }}
                              className="z-10 w-40 -ml-8 pl-7 h-8 bg-transparent"
                              onKeyUp={onChange}
                              onBlur={(e) => handleOnBlur(e)}
                              value={textValue}
                              onChange={(e) => setTextValue(e.target.value)}
                              autoFocus
                            ></input>
                          ) : (
                            ''
                          )}
                        </div>
                      </ClickAwayListener>
                    )}
                    {renderChilds(data, 1)}
                  </StyledTreeItem>
                </div>
              </div>
            );
          })}
      </TreeView>
    </div>
  );
};
