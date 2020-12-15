import { DefaultTheme } from '@react-navigation/native';
import { Colors } from '../utility/colors';

export default {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.primaryBackground,
        background: Colors.primaryBackground
    }
};