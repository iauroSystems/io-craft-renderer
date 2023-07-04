import { IconComponent } from '@iocraft/component-library';
import { InputBase, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import themes from 'apps/pages-gessa/src/theme';
import { useEffect, useState } from 'react';
import './SearchBox.css';

interface IAnyProps {
  [key: string]: string | number | any;
}
export interface ISearchInputTypes {
  label: string;
  placeholder: string;
  value: string;
  onChange?: (e: any) => void;
  chartProps?: IAnyProps;
}

export const SearchInput = (props: ISearchInputTypes) => {
  const [searchText, setSearchText] = useState<string>('');
  const theme = themes.default;

  useEffect(() => {
    setSearchText(props.value);
  }, [props]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        width: '100%',
        background:
          props?.chartProps?.background_color ||
          themes.default?.palette?.background?.bacopWhite,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          background:
            props?.chartProps?.background_color ||
            themes.default?.palette?.background?.bacopWhite,
          borderColor:
            props?.chartProps?.border_color || theme.palette?.neutral?.neu100,
        }}
      >
        <Typography variant={'body1'}>
          <div
            style={{
              padding: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              height: 34,
              width: '100%',
              // border: `1px solid ${theme.palette.text.c100} !important`,
              border: 1,
              borderStyle: 'solid',
              borderColor:
                props?.chartProps?.border_color ||
                theme.palette?.neutral?.neu100,
              backgroundColor: theme.palette?.background?.bacopWhite,
            }}
          >
            <IconComponent
              name={'search_black_24dp-1'}
              size={20}
              label={'search'}
              color={theme?.palette?.neutral?.neu500}
            />

            {/* <IconButton sx={{ p: '10px' }} aria-label="search">
            <SearchIcon style={{ color: theme?.palette?.text?.disabled }} />
          </IconButton> */}
            {/* <input
              style={{
                fontWeight: '400',
                marginLeft: 1,
                flex: 1,
                fontSize: '12px',
                background:
                  props?.chartProps?.background_color ||
                  themes.default?.palette?.background?.bacopWhite,
                color: theme?.palette?.text?.tex300Main,
              }}
              
              placeholder={props.placeholder}
              value={searchText}
              name="search"
            ></input> */}
            <InputBase
              sx={{
                fontWeight: '400',
                ml: 1,
                flex: 1,
                y: 25,
                fontSize: '12px',
                background:
                  props?.chartProps?.background_color ||
                  themes.default?.palette?.background?.bacopWhite,
                color: theme?.palette?.text?.tex300Main,
              }}
              style={{
                background:
                  props?.chartProps?.background_color ||
                  themes.default?.palette?.background?.bacopWhite,
                color: theme?.palette?.text?.tex300Main,
              }}
              placeholder={props.placeholder}
              value={searchText}
              name="search"
              onChange={(e: any) => {
                setSearchText(e.target.value);
                props.onChange && props.onChange(e.target.value);
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Typography>
      </div>
    </div>
  );
};

export default SearchInput;
