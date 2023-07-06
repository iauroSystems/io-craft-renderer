import {ListItem} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
    className?: string;
    onClick: () => void;
    link: string | undefined;
    children: any;
}

function AppMenuItemComponent(props: Props) {
    const {className, onClick, link, children} = props;
    if (!link || typeof link !== 'string') {
        return (
            <ListItem
                button
                className={className}
                children={children}
                onClick={onClick}
            />
        );
    }

    return (
        <div
            style={{
                border: '1px solid green',
            }}
        >
            <ListItem
                button
                className={className}
                children={children}
                component={Link}
                to={link}
            />
        </div>
    );
}

export default AppMenuItemComponent;
