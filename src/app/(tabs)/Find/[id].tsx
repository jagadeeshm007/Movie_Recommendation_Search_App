import { View, Text,useWindowDimensions,StyleSheet,Image } from 'react-native';
import { GestureHandlerRootView,ScrollView,FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { useState} from 'react';
import { useLocalSearchParams, Stack } from "expo-router";
import Recommendation from '@/assets/movies/recommend.json';
import Items from '@/src/components/items';
import LoadingScreen from '@/src/components/ActivityIndicator';
import SelectedMovie from '@/src/components/SelectedMovie';

const MovieInfo = () => {

    const [movie, setMovie] = React.useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [Title, setTitle] = useState("Movie");

    const { id } = useLocalSearchParams();
    const data = Recommendation.filter((key)=>(id) === String(key.movie));
    
    const fetchData = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_API_KEY}&language=en-US`);
        const movieData = await response.json();
        setIsLoading(false);
        setMovie(movieData);
        setTitle(movieData.title);  
    };

    React.useEffect(() => {
        fetchData();
    }, [id]);

    if (isLoading) {
        return <LoadingScreen />;
    }
    
    return (
        <GestureHandlerRootView style={styles.GestureHandlerstyle}>
            <ScrollView style={styles.scrollviewstyle}>

                <SelectedMovie id={String(id)} />

                <View style={styles.RecommendationsContainer}>
                    <Text style={styles.Recommendations}>Recommendations</Text>
                </View>

                <View style={styles.Flatliststyle}>
                    <FlatList
                        data={Object.values(data[0]).slice(0,6)}
                        renderItem={({ item }) => (
                            <Items product={item} />
                        )}
                        key={2}
                        numColumns={2}
                        contentContainerStyle={{gap:10, padding:10}}
                        columnWrapperStyle={{gap:10, justifyContent:'space-between'}}
                        scrollEnabled={false}
                    />
                </View>

                <Stack.Screen options={{ title: String(Title) }} />

            </ScrollView>
        </GestureHandlerRootView>
    );
};

export default MovieInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    GestureHandlerstyle: { 
        flex: 1 ,
        backgroundColor: 'white',
    },
    scrollviewstyle:{
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    Recommendations:{
        fontSize:30,
        fontWeight:'bold',
        paddingLeft:20,
    },
    RecommendationsContainer:{
        backgroundColor:'white',
        marginTop:5,
    },
    Flatliststyle : {
        backgroundColor:'white',
        marginTop:5,
    },
});
