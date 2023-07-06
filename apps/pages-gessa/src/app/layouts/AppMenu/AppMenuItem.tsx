import React from 'react';
import {Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import {IconComponent} from '@iocraft/component-library';
import themes from 'apps/pages-gessa/src/theme';

export function getIcon(label: string) {
    const theme = themes.default;
    switch (label) {
        case 'Dashboard':
            return (
                <IconComponent
                    name={'view_quilt_black_24dp'}
                    size={25}
                    label={'Quilt'}
                    color={theme?.palette?.primary?.pri200}
                />
            );
        case 'Orders':
            return (
                <IconComponent
                    name={'view_quilt_black_24dp'}
                    size={25}
                    label={'Quilt'}
                    color={theme?.palette?.primary?.pri200}
                />
            );
        case 'Customers':
            return (
                <IconComponent
                    name={'view_quilt_black_24dp'}
                    size={25}
                    label={'Quilt'}
                    color={theme?.palette?.primary?.pri200}
                />
            );
        case 'Reports':
            return (
                <IconComponent
                    name={'view_quilt_black_24dp'}
                    size={25}
                    label={'Quilt'}
                    color={theme?.palette?.primary?.pri200}
                />
            );
        case 'Nested Pages':
            return (
                <IconComponent
                    name={'view_quilt_black_24dp'}
                    size={25}
                    label={'Quilt'}
                    color={theme?.palette?.primary?.pri200}
                />
            );
        default:
            return (
                <IconComponent
                    name={'analytics_black_24dp'}
                    size={25}
                    label={'Quilt'}
                    color={theme?.palette?.primary?.pri200}
                />
            );
    }
}

interface Props {
    label: string;
    link?: string | undefined;
    items?: any;
    icon?: any;
    isSelected: boolean;
}

function AppMenuItem(props: Props) {
    const {label, icon, link, items = []} = props;
    const isExpandable = items && items.length > 0;
    const [open, setOpen] = React.useState(false);
    const theme = themes.default;

    function handleClick() {
        setOpen(!open);
    }

    const Icon: any = getIcon(label);

    const MenuItemRoot = (
        <div
            style={{
                height: '48px',
                marginBottom: '10px',
                paddingLeft: '10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: '4px',
                background: props.isSelected
                    ? theme?.palette?.primary?.pri300Main
                    : theme?.palette?.background?.bacopWhite,
            }}
        >
            <div
                style={{
                    color: props.isSelected
                        ? theme?.palette?.background?.bacopWhite
                        : theme?.palette?.text?.tex600,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '300px',
                    fontWeight: props.isSelected ? 600 : 400,
                }}
            >
                <IconComponent
                    name={icon.trim()}
                    size={30}
                    label={'icon'}
                    color={
                        props.isSelected
                            ? theme?.palette?.background?.bacopWhite
                            : theme?.palette?.text?.tex300Main
                    }
                />
                <ListItemText
                    sx={{
                        textTransform: 'capitalize',
                    }}
                    className="text-red"
                    inset={!Icon}
                >
                    <Typography
                        variant={'body1'}
                        sx={{
                            width: '118px',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                        title={label}
                    >
                        {label}
                    </Typography>
                </ListItemText>
            </div>
        </div>
    );

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider/>
            <List component="div" disablePadding>
                {' '}
                {items.map((item: any, index: number) => (
                    <>
                        <AppMenuItem
                            {...item}
                            key={index}
                            onClick={(e: any) => {

                            }}
                        />
                    </>
                ))}
            </List>
        </Collapse>
    ) : null;

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {MenuItemRoot}
        </>
    );
}

export default AppMenuItem;
