import { StyleSheet } from 'react-native';
import { View, Text, Dimensions } from 'react-native';
import * as React from 'react';
import { useLocalSearchParams, Stack } from "expo-router";
import movies from '@/assets/movies/movies.json'
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AboutMovie = () => {
    const [movie, setMovie] = React.useState<any>(null);

    const fetchData = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_API_KEY}&language=en-US`);
        const movieData = await response.json();
        setMovie(movieData);
    };
    
    const { id } = useLocalSearchParams();
    const theMovie = movies.find((movie) => String(movie.movie_id) === id);

    React.useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <View style={{}}>
            <View style={{ backgroundColor: 'pink', padding: 7, borderRadius: 10 ,flexDirection: 'row'}}>
                <View style={{ backgroundColor: 'white', padding: 10, width: 138, height: 203, justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} style={{ width: 135, height: 200, resizeMode: 'contain', borderRadius: 10 }} />
                </View>
                <View style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 10,width: SCREEN_WIDTH-158,height:203,marginLeft:5, }}>

                    <View style={{backgroundColor:'orange', flexDirection: 'row', justifyContent:'space-between' }}>
                        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>{movie?.original_title}</Text>
                        <View style={{ backgroundColor: 'lightgreen', padding: 10, borderRadius: 100, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15 }}>{movie?.vote_average.toFixed(1)}/10</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'lightyellow',flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, marginLeft: 5 }}>{movie?.tagline}</Text>
                    </View>

                    <View style={{ backgroundColor: 'purple',flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>
                        <Text style={{ fontSize: 20 }}>{movie?.release_date.slice(0,4)}</Text>
                        <Text style={{ fontSize: 15 }}>{movie?.runtime} mins</Text>
                    </View>

                    <Text style={{ fontSize: 10 }}>Genres : {movie?.genres.map((genre: any) => genre.name).join(' | ')}</Text>
                    <Text style={{ fontSize: 10 }}>language : {movie?.spoken_languages.map((language: any) => language.name).join(', ')}</Text>
                    <Text style={{ fontSize: 10 }}>overview : {"\n"} {movie?.overview}</Text>
                </View>
            </View>
            <Stack.Screen options={{ title: String(theMovie?.title) }} />
        </View>
    );
};

export default AboutMovie;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
