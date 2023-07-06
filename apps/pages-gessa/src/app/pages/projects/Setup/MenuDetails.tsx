import {IconComponent} from '@iocraft/component-library';
import {Box, Button, MenuItem, Select, TextField, Typography,} from '@mui/material';
import {getLocalStorage} from 'apps/pages-gessa/src/utils/localStorageService';
import {useEffect, useState} from 'react';
import {IconList} from './IconList';

interface pageData {
    name: string;
    page: string;
    icon: string;
}

interface Props {
    data: pageData;
    submittedData: (data: pageData) => any;
}

const MenuDetails = (props: Props) => {
    const [name, setName] = useState<string>('');
    const [page, setPage] = useState<string>('');
    const [icon, setIcon] = useState<string>('');

    useEffect(() => {
        setName(props.data.name);
        setPage(props.data.page);
        setIcon(props.data.icon);
    }, [props]);

    const makePageOptions = () => {
        const pages = JSON.parse(JSON.stringify(getLocalStorage('allpages')));
        const options = [];
        for (let i = 0; i < pages.length; i += 1) {
            const opt = {
                label: pages[i].pageName,
                value: pages[i].pageID,
            };
            options.push(opt);
        }
        return options;
    };
    const [pageList, setPageList] = useState<any>(makePageOptions());

    const renderOptions = (data: any, icon?: boolean) => {
        return (
            data &&
            data.length &&
            data.map((myopt: any) => {
                return (
                    <MenuItem key={Math.random().toString()} value={myopt.value}>
                        <Box style={{display: 'flex', alignItems: 'center'}}>
                            {icon && <IconComponent name={myopt.label} size={24}/>}
                            <Box>{myopt.label}</Box>
                        </Box>
                    </MenuItem>
                );
            })
        );
    };
    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };
    const handlePageChange = (event: any) => {
        setPage(event.target.value);
    };
    const handleIconChange = (event: any) => {
        setIcon(event.target.value);
    };
    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 100,
                gap: '15px',
                padding: '15px',
            }}
        >
            <Typography> Menu Details</Typography>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography variant="body1"> Menu Name </Typography>
                </Box>
                <Box>
                    <TextField
                        style={{width: '300px'}}
                        name="name"
                        placeholder={'Enter menu name'}
                        onChange={handleNameChange}
                        value={name}
                    ></TextField>
                </Box>
            </Box>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography variant="body1">Page </Typography>
                </Box>
                <Box>
                    <Select
                        style={{width: '300px'}}
                        name="page"
                        placeholder={'Select Page'}
                        onChange={handlePageChange}
                        value={page || props.data.page}
                    >
                        {renderOptions(pageList, false)}
                    </Select>
                </Box>
            </Box>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography variant="body1">Select Icon </Typography>
                </Box>
                <Box>
                    <Select
                        style={{width: '300px'}}
                        name="icon"
                        placeholder={'Select Icon'}
                        onChange={handleIconChange}
                        value={icon || props.data.icon}
                    >
                        {renderOptions(IconList, true)}
                    </Select>
                </Box>
            </Box>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => {
                        const obj = {name, page, icon};
                        props.submittedData(obj);
                    }}
                    sx={{textTransform: 'none'}}
                    name="Submit"
                    size="small"
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default MenuDetails;
