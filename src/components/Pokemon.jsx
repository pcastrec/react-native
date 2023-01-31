import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export const Pokemon = ({ nav, item }) => {
    const index = item.url.split('/')[6]
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`

    return (
        <TouchableOpacity onPress={() => nav.navigate('Detail', { item, image })}>
            <View style={styles.container}>
                <View>
                    <Image style={styles.image} source={{ uri: image }} />
                </View>
                <Text style={{ textTransform: "capitalize" }}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 5,
        marginVertical: 2.5,
        marginHorizontal: 5,
        borderColor: '#DDD',
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: '#FFF',
        justifyContent: "space-around"
    },
    item: {
        backgroundColor: "#FFFFFF",
        borderColor: "#DDDDDD",
        flexDirection: "row",
        marginHorizontal: 5,
        marginVertical: 2.5,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 18,
        height: 150,
    },
    image: {
        resizeMode: "contain",
        height: 150,
        width: 150
    }
})