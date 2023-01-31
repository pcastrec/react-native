import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import { Colors } from "../Colors"

export const Detail = ({ route }) => {

    const { item, image } = route.params

    const [pokemon, setPokemon] = React.useState({})
    const [colors, setColors] = React.useState(['#FFF', '#FFF'])

    React.useEffect(() => {
        fetch(item.url)
            .then(res => res.json())
            .then(data => {
                const colors = data.types.map(item => Colors[item.type.name])
                if (colors.length === 1) colors.push(colors[0])
                setColors(colors)
                setPokemon(data)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <LinearGradient style={{ flex: 1, alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={colors}>
                <View style={[styles.texts, { backgroundColor: '#FFF' }]}>
                    <Text style={{ fontWeight: "bold" }}>#{pokemon.id}</Text>
                    <Text> - </Text>
                    <Text style={{ fontWeight: "bold", textTransform: 'capitalize' }}>{pokemon.name}</Text>
                </View>
                <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
                <FlatList style={{ width: '100%', padding: 15 }} data={pokemon.types}
                    renderItem={({ item }) => (
                        <Text style={[styles.types, { backgroundColor: Colors[item.type.name] }]}>{item.type.name}</Text>
                    )}>
                </FlatList>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    texts: {
        borderColor: "#DDDDDD",
        flexDirection: "row",
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        margin: 15,
    },
    types: {
        textAlignVertical: 'center',
        textTransform: 'capitalize',
        borderColor: "#DDDDDD",
        borderRadius: 5,
        borderWidth: 3,
        padding: 10,
        margin: 5
    },
})