import {View, StatusBar, Text, FlatList, StyleSheet, Animated, Image} from "react-native";
import { useRef } from 'react'

const H_MAX_HEIGHT = 150;
const H_MIN_HEIGHT = 50;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const App = () => {
   const data = [
    {id: "1", title: 'Item 1'},
    {id: "2", title: 'Item 2'},
    {id: "3", title: 'Item 3'},
    {id: "4", title: 'Item 4'},
];

const scrollOffestY = useRef(new Animated.Value(0)).current;

const headerScrollHeight = scrollOffestY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: 'clamp'
})

return (
    <View style={{ flex: 1}}>
        <StatusBar backgroundColor={"#121212"} barStyle="light content" translucent= {false} />

        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99,
                width: '100%',
                height: headerScrollHeight,
                padding: 10,
                backgroundColor: "#121212",
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
            >
                <Text Style={styles.headerText}>Meu header</Text>
            </Animated.View>

            <FlatList
            style={{ paddingTop: H_MAX_HEIGHT}}
            data={data}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={ ({ item}) => (
                <View style={styles.item}>
                    <Text>{item.title}</Text>
                </View>
            )}

            onScroll={Animated.event ([
                { nativeEvent: {contentOffset:  { y: scrollOffsetY } } },
            ], { useNativeDriver: false } )}
            scrollEventThrottle={16}
        />

    </View>
)
}

export default App;

const styles = StyleSheet.create({
    contentHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight:'bold',
        textAlign: 'center',
        color: '#fff',
    },
    item: {
        height: 350,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
