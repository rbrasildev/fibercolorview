import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Usando Picker externo
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// Definir as cores das fibras e tubos para os padrões EIA598-A e ABNT (corrigido)
const fiberColorsEIA598 = ['Azul', 'Laranja', 'Verde', 'Marrom', 'Cinza', 'Branco', 'Vermelho', 'Preto', 'Amarelo', 'Violeta', 'Rosa', 'Aqua'];

// Padrão ABNT (Corrigido)
const fiberColorsABNT = ['Verde', 'Amarelo', 'Branco', 'Azul', 'Vermelho', 'Violeta', 'Marrom', 'Rosa', 'Preto', 'Cinza', 'Laranja', 'Aqua'];

const tubeColorsABNT = fiberColorsABNT; // Usando as mesmas cores para os tubos
const abntFiberColorsHex = [
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

const Index = () => {
    const [fiberNumber, setFiberNumber] = useState<string>('');
    const [fiberColor, setFiberColor] = useState<string | null>(null);
    const [tubeColor, setTubeColor] = useState<string | null>(null);
    const [selectedStandard, setSelectedStandard] = useState<'EIA598-A' | 'ABNT'>('EIA598-A');
    const [fiberCountPerTube, setFiberCountPerTube] = useState<number>(12);
    const [colorHexa, setColorHexa] = useState<number | null>(null)

    const bottomSheetRef = useRef<BottomSheet>(null);
    // Função para verificar a fibra de acordo com o padrão selecionado e quantidade de fibras por tubo
    const handleCheckFiber = () => {
        const fiberNum = parseInt(fiberNumber);

        if (fiberNum < 1 || isNaN(fiberNum)) {
            setFiberColor(null);
            setTubeColor(null);
            return;
        }

        // Escolher o padrão baseado na seleção do usuário
        const fiberColors = selectedStandard === 'EIA598-A' ? fiberColorsEIA598 : fiberColorsABNT;
        const tubeColors = selectedStandard === 'EIA598-A' ? fiberColorsEIA598 : tubeColorsABNT;

        // Calcular o índice com base na quantidade de fibras por tubo
        const fiberIndex = (fiberNum - 1) % fiberCountPerTube;
        const tubeIndex = Math.floor((fiberNum - 1) / fiberCountPerTube);

        setFiberColor(fiberColors[fiberIndex]);
        setTubeColor(tubeColors[tubeIndex]);
        setColorHexa(fiberIndex)
        bottomSheetRef.current?.expand()
    };



    return (
        <View className='p-4 mt-5 flex-1'>
            <View className='flex-row items-center'>
                <Image className='w-32 h-32' source={require('@/assets/images/LOGO.png')} />
                <Text className='font-bold text-2xl'>Fiber Color View</Text>
            </View>

            <View>
                <Text className='font-light'>Escolha o padrão:</Text>
                <Picker
                    selectedValue={selectedStandard}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedStandard(itemValue as 'EIA598-A' | 'ABNT')}
                >
                    <Picker.Item label="Padrão EIA598-A" value="EIA598-A" />
                    <Picker.Item label="Padrão ABNT" value="ABNT" />
                </Picker>

                <Text className='font-light'>Escolha a quantidade de fibras por tubo:</Text>
                <Picker
                    selectedValue={fiberCountPerTube}
                    style={styles.picker}
                    onValueChange={(itemValue) => setFiberCountPerTube(itemValue)}
                >
                    <Picker.Item label="6 fibras por tubo" value={6} />
                    <Picker.Item label="12 fibras por tubo" value={12} />
                    <Picker.Item label="24 fibras por tubo" value={24} />
                </Picker>

                <TextInput
                    className='border border-slate-400  font-bold text-center rounded-3xl my-2 p-4'
                    placeholder="Digite o número da fibra"
                    placeholderClassName='text-gray-500 font-semibold'
                    keyboardType="numeric"
                    value={fiberNumber}
                    onChangeText={setFiberNumber}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCheckFiber}>
                    <Text className='font-bold'>Verificar</Text>
                </TouchableOpacity>
            </View>





            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[0.1, '30%', '40%']}
                backgroundStyle={{ backgroundColor: abntFiberColorsHex[colorHexa] }}
            >
                <BottomSheetView className='p-4'>
                    <View>
                        <Text className='font-bold text-2xl'>Fibra: {fiberColor}</Text>
                        <Text className='font-bold text-2xl'>Tubo: {tubeColor}</Text>
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
        backgroundColor: '#ddd',
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
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#fff',
    },

    result: {
        marginTop: 20,
    },
    resultText: {
        fontSize: 18,
    },
});

export default Index;
