import { Route, Link } from 'react-router-dom';

import { styled } from '@mui/system';
import { Avatar, Typography } from '@mui/material';
import themes from 'apps/pages-gessa/src/theme';

/* eslint-disable-next-line */
interface IAnyProps {
  [key: string]: string | number | any;
}

export interface IUserAvatarProps {
  text: string;
  chartProps?: IAnyProps;
}

export function UserAvatar(props: IUserAvatarProps) {
  const theme = themes.default;
  const stringAvatar = (name: string) => {
    if (name && name.length > 0) {
      return {
        children: (
          <Typography>
            {name.split(' ')[0][0] + name.split(' ')[1][0]}
          </Typography>
        ),
      };
    } else {
      return {
        children: ``,
      };
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor:
          props.chartProps?.background_color || theme?.palette?.primary?.pri100,
        color: props.chartProps?.text_color || theme?.palette?.primary?.pri500,
      }}
    >
      <Typography>
        {props.text.split(' ')[0][0] + props.text.split(' ')[1][0]}
      </Typography>
    </div>
  );
}

export default UserAvatar;
