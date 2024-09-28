import { colors } from '../styles/colors';
import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Usando Picker externo
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
const fiberColorsEIA598 = ['Azul', 'Laranja', 'Verde', 'Marrom', 'Cinza', 'Branco', 'Vermelho', 'Preto', 'Amarelo', 'Violeta', 'Rosa', 'Aqua'];

// Padrão ABNT (Corrigido)
const fiberColorsABNT = ['Verde', 'Amarelo', 'Branco', 'Azul', 'Vermelho', 'Violeta', 'Marrom', 'Rosa', 'Preto', 'Cinza', 'Laranja', 'Aqua'];

const tubeColorsABNT = fiberColorsABNT; // Usando as mesmas cores para os tubos
const fiberColorsHexAbnt = [
    '#008000', // Verde
    '#FFFF00', // Amarela
    '#FFFFFF', // Branco
    '#0000FF', // Azul
    '#FF0000', // Vermelho
    '#800080', // Lilás
    '#A52A2A', // Marrom
    '#FFC0CB', // Rosa
    '#000000', // Preto
    '#808080', // Cinza
    '#FFA500', // Laranja
    '#000080'  // Azul Marinho
];

const fiberColorsHexEia598A = [
    '#0000FF', // Azul
    '#FFA500', // Laranja
    '#008000', // Verde
    '#A52A2A', // Marrom
    '#808080', // Cinza
    '#FFFFFF', // Branco
    '#FF0000', // Vermelho
    '#000000', // Preto
    '#FFFF00', // Amarela
    '#800080', // Lilás
    '#FFC0CB', // Rosa
    '#000080'  // Azul Marinho
];

const Index = () => {
    const [fiberNumber, setFiberNumber] = useState<string>('');
    const [fiberColor, setFiberColor] = useState<string | null>(null);
    const [tubeColor, setTubeColor] = useState<string | null>(null);
    const [selectedStandard, setSelectedStandard] = useState<'EIA598-A' | 'ABNT'>('ABNT');
    const [fiberCountPerTube, setFiberCountPerTube] = useState<number>(12);
    const [colorHexa, setColorHexa] = useState<number | null>(null)


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

            <ScrollView className='mt-2 p-6'>
                <Text className='font-light text-violet-500 text-lg'>Escolha o padrão:</Text>
                <View className='border-[0.5px] border-violet-100 rounded-3xl'>
                    <Picker
                        selectedValue={selectedStandard}
                        onValueChange={(itemValue) => setSelectedStandard(itemValue as 'EIA598-A' | 'ABNT')}
                    >
                        <Picker.Item style={{ color: colors['violet-100'] }} label="Padrão ABNT" value="ABNT" />
                        <Picker.Item style={{ color: colors['violet-100'] }} label="Padrão EIA598-A" value="EIA598-A" />
                    </Picker>
                </View>

                <Text className='font-light text-violet-100 text-lg mt-4'>Escolha a quantidade de fibras por tubo:</Text>
                <View className='border-[0.5px] border-violet-100 rounded-3xl'>
                    <Picker
                        selectedValue={fiberCountPerTube}
                        onValueChange={(itemValue) => setFiberCountPerTube(itemValue)}
                    >
                        <Picker.Item style={{ color: colors['violet-100'], fontWeight: '700' }} label="06 Fibras" value={6} />
                        <Picker.Item style={{ color: colors['violet-100'], fontWeight: '700' }} label="12 Fibras" value={12} />
                        <Picker.Item style={{ color: colors['violet-100'], fontWeight: '700' }} label="24 Fibras" value={24} />
                    </Picker>
                </View>

                <Text className='font-light text-violet-100 text-lg mt-4'>Digite o número da fibra</Text>
                <TextInput
                    className='border-[0.5px] border-violet-100/75 bg-white text-violet-900 font-normal text-xl text-center rounded-3xl my-2 p-4'
                    placeholderClassName='text-gray-500 font-thin'
                    keyboardType="numeric"
                    value={fiberNumber}
                    onChangeText={setFiberNumber}

                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCheckFiber}>
                    <Text className='font-bold text-white'>Verificar</Text>
                </TouchableOpacity>
            </ScrollView>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[0.1, '20%', '50%', '90%']}
                backgroundStyle={{ backgroundColor: colors['violet-950'] }}
            >
                <BottomSheetView className='p-4'>
                    <Text className='text-white py-4 font-semibold text-xl'>Padrão {selectedStandard}</Text>
                    <FlatList
                        alwaysBounceHorizontal
                        contentContainerClassName='flex-row gap-2'
                        data={selectedStandard === 'ABNT' ? fiberColorsHexAbnt : fiberColorsHexEia598A}
                        horizontal
                        renderItem={({ item, index }) => (
                            <Animatable.View delay={index * 300} animation={'slideInRight'}>
                                {fiberColorsABNT.indexOf(fiberColor) === index ? <View style={{ backgroundColor: item }} className='w-32 h-8' /> : <View style={{ backgroundColor: item }} className='w-8 h-8' />}
                            </Animatable.View>
                        )}
                    />

                    <View className='flex-row gap-3 justify-center my-6'>
                        <View className='items-center justify-center border-4 w-48 h-48 border-lime-500 rounded-full'>
                            <Text className='text-[96px] text-white font-black'>{fiberNumber}</Text>
                        </View>
                    </View>
                    <View className='gap-3'>
                        <View className='flex-row items-center gap-3'>
                            <View className='h-4 w-4 bg-slate-500' />
                            <Text className='text-xl text-white font-black'>Fibra: {fiberColor}</Text>
                        </View>
                        <View className='flex-row items-center gap-3'>
                            <View className='h-4 w-4 bg-lime-500' />
                            <Text className='text-xl text-white font-black'>TuboLoose: {tubeColor}</Text>
                        </View>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors['violet-900'],
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },

});

export default Index;
