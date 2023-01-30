import React from "react"
import { Dimensions, FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import { Pokemon } from "./Pokemon"

const width = Dimensions.get('window').width

export const Pokemons = () => {

    const [input, setInput] = React.useState('')
    const [pokemons, setPokemons] = React.useState([])

    React.useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(res => res.json())
            .then(data => setPokemons(data.results))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <View>
                <TextInput
                    placeholder="Search ..."
                    onChangeText={text => setInput(text)}
                    value={input}
                />
            </View>
            <FlatList style={styles.list} data={pokemons
                .filter((p, i) => p.name.includes(input.toLowerCase()))}

                keyExtractor={(item, index) => item.url.split('/')[6]}

                ItemSeparatorComponent={<View style={{
                    flex: 1,
                    height: 5,
                    backgroundColor: 'red'
                }} />}

                renderItem={({ item, index }) => (
                    <Pokemon item={item} />
                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
    list: {
        width: width
    }
})