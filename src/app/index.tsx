import { colors } from '../styles/colors';
import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Usando Picker externo
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable'

const fiberColorsEIA598 = ['Azul', 'Laranja', 'Verde', 'Marrom', 'Cinza', 'Branco', 'Vermelho', 'Preto', 'Amarelo', 'Violeta', 'Rosa', 'Aqua'];

const fiberColorsABNT = ['Verde', 'Amarelo', 'Branco', 'Azul', 'Vermelho', 'Violeta', 'Marrom', 'Rosa', 'Preto', 'Cinza', 'Laranja', 'Aqua'];

const tubeColorsABNT = fiberColorsABNT;
const fiberColorsHexAbnt = [
    '#008000', 
    '#FFFF00', 
    '#FFFFFF', 
    '#0000FF', 
    '#FF0000', 
    '#800080', 
    '#A52A2A', 
    '#FFC0CB', 
    '#000000', 
    '#808080', 
    '#FFA500', 
    '#000080'  
];

const fiberColorsHexEia598A = [
    '#0000FF', 
    '#FFA500', 
    '#008000', 
    '#A52A2A', 
    '#808080', 
    '#FFFFFF', 
    '#FF0000', 
    '#000000', 
    '#FFFF00', 
    '#800080', 
    '#FFC0CB', 
    '#000080' 
];

const Index = () => {
    const [fiberNumber, setFiberNumber] = useState<string>('');
    const [fiberColor, setFiberColor] = useState<string | null>(null);
    const [tubeColor, setTubeColor] = useState<string | null>(null);
    const [selectedStandard, setSelectedStandard] = useState<'EIA598-A' | 'ABNT'>('ABNT');
    const [fiberCountPerTube, setFiberCountPerTube] = useState<number>(12);
    const [colorHexa, setColorHexa] = useState<number | null>(null)
    const [fiberIndex, setFiberIndex] = useState<number | null>(null)
    const [tubeIndex, setTubeIndex] = useState<number | null>(null)


    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleCheckFiber = () => {
        const fiberNum = parseInt(fiberNumber);

        if (fiberNum < 1 || isNaN(fiberNum)) {
            setFiberColor(null);
            setTubeColor(null);
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
    };

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
                        <Picker.Item style={{ color: colors['violet-100'], fontWeight: '700' }} label="06 Fibras" value={6} />
                        <Picker.Item style={{ color: colors['violet-100'], fontWeight: '700' }} label="12 Fibras" value={12} />
                        <Picker.Item style={{ color: colors['violet-100'], fontWeight: '700' }} label="24 Fibras" value={24} />
                    </Picker>
                </View>

                <Text className='font-semibold text-violet-200 text-lg mt-4'>Digite o número da fibra</Text>
                <TextInput
                    className='transparent text-[64px] text-white font-thin text-center rounded-3xl my-2 p-4'
                    placeholder='00'
                    keyboardType="numeric"
                    value={fiberNumber}
                    onChangeText={setFiberNumber}

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
                snapPoints={[0.1, '20%', '50%', '90%']}
                backgroundStyle={{ backgroundColor: colors['violet-900'] }}
            >
                <BottomSheetView className='p-4'>
                    <Text className='text-white py-4 font-semibold text-xl'>Padrão {selectedStandard}</Text>
                    <FlatList
                        alwaysBounceHorizontal
                        contentContainerClassName='flex-row gap-2'
                        data={selectedStandard === 'ABNT' ? fiberColorsHexAbnt : fiberColorsHexEia598A}
                        horizontal
                        renderItem={({ item, index }) => (
                            <View className='justify-center'>
                                {fiberIndex === index ?
                                    <View style={{ backgroundColor: item }} className='w-16 h-16 border-2 border-white rounded-full' />
                                    :
                                    <View style={{ backgroundColor: item }} className='w-6 h-6 border-2 border-white rounded-full' />
                                }
                            </View>
                        )}
                    />

                    <View className='flex-row gap-3 justify-center my-6'>
                        <View className='items-center justify-center border-4 w-56 h-56 p-4 border-lime-500 rounded-full'>
                            <Text className='text-[96px] text-white font-black'>{fiberNumber}</Text>
                        </View>
                    </View>
                    <View className='gap-3'>
                        <View className='flex-row items-center gap-3'>
                            <View className='h-4 w-4 bg-slate-500' />
                            <Text className='text-xl text-white font-black'>Fibra: {fiberColor}</Text>
                        </View>
                        <View className='flex-row items-center justify-start gap-3'>
                            <View style={{ backgroundColor: fiberColorsHexAbnt.indexOf(tubeColor) }} className='p-2 w-12 h-12 bg-lime-500 rounded-full items-center justify-center'>
                                <Text className='font-bold text-white text-2xl'>{tubeIndex}</Text>
                            </View>
                            <Text className='text-xl text-white font-black'>TuboLoose: {tubeIndex}</Text>
                        </View>
                    </View>
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