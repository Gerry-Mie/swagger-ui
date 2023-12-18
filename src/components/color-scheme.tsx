import {ActionIcon, useMantineColorScheme, useComputedColorScheme} from '@mantine/core';
import {IconSun, IconMoon} from '@tabler/icons-react';

const ColorScheme = () => {
    const {setColorScheme} = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', {getInitialValueInEffect: true});

    return (
        <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant='subtle' radius='xl'
        >
            {
                computedColorScheme === 'dark' ? <IconSun stroke={1.5}/> : <IconMoon size={20} stroke={1.5}/>
            }
        </ActionIcon>
    );
};

export default ColorScheme;