import {Box, InputBase, styled, Typography} from '@mui/material';
import generateRandomString from 'apps/pages-gessa/src/utils/randomString';

type Props = {};

const AcceptMenus = (props: Props) => {
    const BootstrapInput = styled(InputBase)(({theme}) => ({
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            fontSize: 16,
            width: '100%',
            padding: '10px 12px',
        },
        '& .MuiInputBase': {
            margin: 'none',
        },
    }));
    return (
        <Box
            style={{
                height: '500px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}
        >
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6"> Enter Menu Name</Typography>
                <BootstrapInput
                    defaultValue=""
                    placeholder={'Enter menu name'}
                    key={generateRandomString()}
                    onChange={(e: any) => {
                    }}
                    id="name"
                />
            </Box>
            <Box style={{position: 'relative', width: '100%'}}>
            </Box>
        </Box>
    );
};

export default AcceptMenus;
