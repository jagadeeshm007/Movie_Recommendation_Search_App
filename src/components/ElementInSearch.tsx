import { Text } from '@/src/components/Themed';
import { Pressable, StyleSheet,useWindowDimensions } from 'react-native';
import * as React from 'react';
import { Link } from 'expo-router';

function useStyles() {
    const { width,height } = useWindowDimensions();
    return {
        width,
        height
    };
}

const ElementInSearch = ({item}: {item: { id: string | number ,movie_id: string | number, title: string }}) => {
    const sizez = useStyles();
    return (
        <Link href={{pathname:"/(tabs)/Find/[id]",params:{id:item.movie_id}}} asChild >
        <Pressable style={ {backgroundColor: '#e6f2ff',justifyContent: 'flex-start',alignContent:'flex-start',flexDirection: 'row', width: sizez.width - 40 ,height: 65,flex: 1,margin: 0.5,borderRadius: 12,padding: 10,}}>
            <Text adjustsFontSizeToFit numberOfLines={2} style={styles.title}>
                {item.title}
            </Text>
        </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    title: {
        paddingLeft: 10,
        color: 'black',
        fontSize: 18,
    },
});


export default ElementInSearch;