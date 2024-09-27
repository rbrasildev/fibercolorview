import { Slot, Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import {
    Montserrat_100Thin,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black
} from '@expo-google-fonts/montserrat'

// Import your global CSS file
import "@/src/styles/global.css"

export default function Layout() {
    const [loaded, error] = useFonts({
        Montserrat_100Thin,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
        Montserrat_900Black
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }
    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor:'#eee' }}>
            <Slot />
        </GestureHandlerRootView>
    )
}
