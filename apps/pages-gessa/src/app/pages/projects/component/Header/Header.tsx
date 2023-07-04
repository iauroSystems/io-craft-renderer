import React, { useEffect, useState } from 'react';

// import './header-component.css';
import { IconComponent, IconComponentProps } from '@iocraft/component-library';
import themes from 'apps/pages-gessa/src/theme';
import SearchInput, { ISearchInputTypes } from '../SearchBox';
import UserAvatar from './UserAvatar';
interface IAnyProps {
  [key: string]: string | number | any;
}
export interface IHeaderComponentProps {
  logoImagePath?: string;
  searchData: ISearchInputTypes;
  headerBackgroundColor?: string;
  userData: any;
  notificationData: IconComponentProps;
  chartProps?: IAnyProps;
  searchdivEvent?: (data?: any) => any;
  notificationClickEvent?: (data?: any) => any;
  headerLogoClickEvent?: (data?: any) => any;
  logoutClickAction?: (data?: any) => any;
}

export const HeaderComponent = (props: IHeaderComponentProps) => {
  const [inputText, setInputText] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = useState<any>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? 'simple-popover' : undefined;

  const inputHandler = (e: any) => {
  };

  const notificationClicked = () => {
    props.notificationClickEvent && props.notificationClickEvent();
  };

  useEffect(() => {
    // console.log(props);
  }, [props]);

  const theme = themes.default;

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '8vh',
        height: '8vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background:
          props.headerBackgroundColor ||
          themes.default?.palette?.background?.bacopWhite,
        borderBottom: `1px solid ${theme.palette?.neutral?.neu100}`,
      }}
    >
      <div
        style={{
          height: '100%',
          justifyContent: 'flex-start',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            background: themes.default?.palette?.background?.bacopWhite,
            height: '22px',
            paddingLeft: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          onClick={() => {
            props.headerLogoClickEvent && props.headerLogoClickEvent();
          }}
        >
          {props.logoImagePath && <img src={props.logoImagePath} />}
        </div>
      </div>
      <div
        style={{
          width: '30%',
          margin: '12px',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: themes.default?.palette?.background?.bacopWhite,
        }}
      >
        {props && props.searchData && (
          <SearchInput
            label={props.searchData.label || 'Search'}
            placeholder={props.searchData.placeholder || 'Search'}
            value={props.searchData.value || ''}
            chartProps={props.chartProps}
            onChange={(e: any) => inputHandler(e)}
          />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '8px',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          onClick={() => {
            notificationClicked();
          }}
        >
          <IconComponent
            name={props.notificationData.name}
            size={props.notificationData.size}
            label={props.notificationData.label}
            color={props.notificationData.color}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          onClick={(e: any) => handleClick(e)}
        >
          <UserAvatar
            text={props.userData.text || ''}
            chartProps={{
              background_color: themes.default?.palette?.primary?.pri100,
              text_color: themes.default?.palette?.primary?.pri500,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
