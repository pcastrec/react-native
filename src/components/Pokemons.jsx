import React from "react"
import { Dimensions, FlatList, StyleSheet, TextInput, View } from "react-native"
import { ContextSettings } from "../Context"
import { Pokemon } from "./Pokemon"

const width = Dimensions.get('window').width

export const Pokemons = ({ navigation }) => {

    const { offset, limit } = React.useContext(ContextSettings)

    const [input, setInput] = React.useState('')
    const [pokemons, setPokemons] = React.useState([])

    React.useEffect(() => {
        const controller = new AbortController()
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, { signal: controller.signal })
            .then(res => res.json())
            .then(data => setPokemons(data.results))
            .catch(err => console.log(err))
        return () => controller.abort()
    }, [offset, limit])

    return (
        <View style={{ justifyContent: 'space-around', backgroundColor: '#AAA' }}>
            <TextInput
                style={styles.search}
                onChangeText={text => setInput(text)}
                placeholder="Search ..."
                value={input}
            />
            <FlatList style={{ width: '100%' }} data={pokemons
                .filter(p => p.name.includes(input.toLowerCase()))}

                keyExtractor={item => item.url.split('/')[6]}

                renderItem={({ item }) => (
                    <Pokemon nav={navigation} item={item} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderColor: "#DDDDDD",
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 5,
        marginBottom: 2.5,
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 5,
        height: 40,
    }
})