import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native"

export const Pokemon = ({ item }) => {
    const index = item.url.split('/')[6]
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`

    return (
        <TouchableHighlight onPress={() => console.log(item)}>
            <View style={styles.container}>
                <View>
                    <Image style={styles.image} source={{ uri: image }} />
                </View>
                <Text style={{ textTransform: "capitalize" }}>{item.name}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    image: {
        resizeMode: "contain",
        height: 150,
        width: 150
    }
})