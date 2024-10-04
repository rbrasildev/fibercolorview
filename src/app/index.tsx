import { colors } from '../styles/colors';
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'
import { fiberColorsEIA598, fiberColorsABNT, tubeColorsABNT, fiberColorsHexAbnt, fiberColorsHexEia598A } from '../consts/fiber';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';


const Index = () => {
    const [fiberNumber, setFiberNumber] = useState<string>('');
    const [fiberColor, setFiberColor] = useState<string | null>(null);
    const [tubeColor, setTubeColor] = useState<string | null>(null);
    const [selectedStandard, setSelectedStandard] = useState<'EIA598-A' | 'ABNT'>('ABNT');
    const [fiberCountPerTube, setFiberCountPerTube] = useState<number>(12);
    const [colorHexa, setColorHexa] = useState<number | null>(null)
    const [fiberIndex, setFiberIndex] = useState<number | null>(null)
    const [tubeIndex, setTubeIndex] = useState<number | null>(null)
    const [isFocused, setIsFocused] = useState(false)


    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleCheckFiber = () => {
        const fiberNum = parseInt(fiberNumber);

        if (fiberNum < 1 || isNaN(fiberNum)) {
            setFiberColor(null);
            setTubeColor(null);
            Alert.alert('Atenção', 'Digite o número da fibra')
            return;
        }

        const fiberColors = selectedStandard === 'EIA598-A' ? fiberColorsEIA598 : fiberColorsABNT;
        const tubeColors = selectedStandard === 'EIA598-A' ? fiberColorsEIA598 : tubeColorsABNT;

        const fiberIndex = (fiberNum - 1) % fiberCountPerTube;
        const tubeIndex = Math.floor((fiberNum - 1) / fiberCountPerTube);


        setFiberIndex(fiberIndex)
        setTubeIndex(tubeIndex + 1)

        setFiberColor(fiberColors[fiberIndex]);
        setTubeColor(tubeColors[tubeIndex]);

        setColorHexa(fiberIndex)
        bottomSheetRef.current?.expand()
    }


    const closeModal = () => {
        bottomSheetRef.current?.close()
    }


    return (
        <View className='flex-1'>
            <View className='flex-row bg-violet-950 p-5 justify-between'>
                <Image className='w-16 h-16' source={require('@/assets/images/LOGO.png')} />
                <Text className='flex-1 font-light uppercase self-center text-3xl text-violet-500 py-6'>FIBER COLOR VIEW</Text>
            </View>
            <ScrollView className='p-6 bg-violet-950'>
                <Text className='font-semibold text-violet-200  text-lg'>Escolha o padrão</Text>
                <View className='border-[0.5px] border-violet-200 rounded-3xl'>
                    <Picker
                        selectedValue={selectedStandard}
                        onValueChange={(itemValue) => setSelectedStandard(itemValue as 'EIA598-A' | 'ABNT')}
                    >
                        <Picker.Item style={{ color: colors['violet-100'] }} label="Padrão ABNT" value="ABNT" />
                        <Picker.Item style={{ color: colors['violet-100'] }} label="Padrão EIA598-A" value="EIA598-A" />
                    </Picker>
                </View>

                <Text className='font-semibold text-violet-200  text-lg mt-4'>Escolha a quantidade de fibras por tubo</Text>
                <View className='border-[0.5px] border-violet-200 rounded-3xl'>
                    <Picker
                        selectedValue={fiberCountPerTube}
                        onValueChange={(itemValue) => setFiberCountPerTube(itemValue)}
                    >
                        <Picker.Item style={{ color: colors['violet-100'], fontWeight: '700' }} label="02 Fibras" value={2} />
                        <Picker.Item style={{ color: colors['violet-100'], fontWeight: '700' }} label="06 Fibras" value={6} />
                        <Picker.Item style={{ color: colors['violet-100'], fontWeight: '700' }} label="12 Fibras" value={12} />
                    </Picker>
                </View>

                <Text className='font-semibold text-violet-200 text-lg mt-4'>Digite o número da fibra</Text>
                <TextInput
                    className='transparent text-[64px] text-white font-thin text-center rounded-3xl my-2 p-4'
                    placeholder='0'
                    placeholderTextColor={'#ccc'}
                    keyboardType="numeric"
                    value={fiberNumber}
                    onChangeText={setFiberNumber}
                    onFocus={() => closeModal()}

                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCheckFiber}>
                    <MaterialCommunityIcons color={'#fff'} size={16} name='note-search' />
                    <Text className='font-bold text-white'>Verificar</Text>
                </TouchableOpacity>
            </ScrollView>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={['25%', '50%', '90%']}
                backgroundStyle={{ backgroundColor: colors['violet-900'] }}
            >
                <BottomSheetView className='px-4'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-white py-4 font-semibold text-xl'>Padrão {selectedStandard}</Text>
                        <TouchableOpacity onPress={() => closeModal()}>
                            <MaterialCommunityIcons color={'#fff'} name='close' size={32} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        contentContainerClassName='flex-row gap-2 py-4 justify-center'
                        data={selectedStandard === 'ABNT' ? fiberColorsHexAbnt : fiberColorsHexEia598A}
                        horizontal
                        renderItem={({ item, index }) => (
                            <Animatable.View animation={'slideInLeft'} delay={index * 50} className='justify-center'>
                                {fiberIndex === index ?
                                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{ backgroundColor: item }} className='w-16 h-16 border-2 border-white rounded-full' />
                                    :
                                    <View style={{ backgroundColor: item }} className='w-6 h-6 border-2 border-white rounded-full' />
                                }
                            </Animatable.View>
                        )}
                    />
                    {fiberNumber && (
                        <>
                            <View className='flex-row gap-3 justify-center my-6'>
                                <View className='items-center justify-center w-56 h-56 p-4 border-4 border-white rounded-full'>
                                    <Text className='text-[80px] text-white font-black'>{fiberNumber}</Text>
                                </View>
                            </View>
                            <View className='justify-center items-center'>
                                <Text className='text-2xl text-white font-black'>Fibra: {fiberColor}</Text>
                                <Text className='text-2xl text-white font-black'>Tubo Loose: {tubeIndex}</Text>
                            </View>
                        </>
                    )}

                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors['violet-900'],
        borderRadius: 20,
        gap: 2,

    }

});

export default Index;