import { View, Text,useWindowDimensions,StyleSheet,Image } from 'react-native';
import * as React from 'react';
import { useState} from 'react';
import { useLocalSearchParams } from "expo-router";
import movies from '@/assets/movies/movies.json';
import Recommendation from '@/assets/movies/recommend.json';
import LoadingScreen from '@/src/components/ActivityIndicator';

function useStyles() {
    const { width,height } = useWindowDimensions();
    return {
        width,
        height
    };
}
const SelectedMovie = ({ id }: { id: string }) => {

    const [movie, setMovie] = React.useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const data = Recommendation.filter((key)=>(id) === String(key.movie));
    
    const fetchData = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_API_KEY}&language=en-US`);
        const movieData = await response.json();
        setIsLoading(false);
        setMovie(movieData);  
    };

    const theMovie = movies.find((movie) => String(movie.movie_id) === id);

    const sizewidth = useStyles();
    React.useEffect(() => {
        fetchData();
    }, [id]);

    const runtimeInMinutes = Number(movie?.runtime);
    const runtimeInHours = Math.floor(runtimeInMinutes / 60);
    const runtimeInMinutesRemainder = runtimeInMinutes % 60;

    if (isLoading) {
        return <LoadingScreen />;
    }
    
    return (
            <View style={{ backgroundColor: 'white', padding: 7,flexDirection: 'row',}}>
                <View style={{ backgroundColor: 'white', padding: 10, width: 138, height: 203, justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} style={{ width: 135, height: 200, resizeMode: 'contain', borderRadius: 20 }} />
                </View>
                <View style={{ backgroundColor: 'white', padding: 5,width: sizewidth.width-158,height:203,marginLeft:2, }}>

                    <View style={{backgroundColor:'white', flexDirection: 'row', justifyContent:'space-between' ,width: sizewidth.width-168,height:40}}>

                        <View style={{backgroundColor:'white',alignContent:'center',justifyContent:'center',}}>
                            <Text adjustsFontSizeToFit numberOfLines={2} style={{ fontSize: 30, fontWeight: 'bold', maxWidth: 200, }}>{movie?.original_title}</Text>
                        </View>

                        <View style={{ backgroundColor: 'white', padding: 2, justifyContent:'flex-start', alignContent:'flex-start', alignItems:'flex-start' }}>
                            <Text style={{ fontSize: 8 }}>{movie?.vote_average.toFixed(1)}/10</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white',flexDirection: 'row', alignItems: 'center' }}>
                        <Text adjustsFontSizeToFit numberOfLines={2} style={{ fontSize: 8, marginLeft: 0 }}>{movie?.tagline}</Text>
                    </View>

                    <View style={{ backgroundColor: 'white',flexDirection: 'row', alignItems: 'center',justifyContent:'flex-start',marginTop:5, }}>
                        <View style={{ backgroundColor: 'white',marginRight:10,}}><Text style={{ fontSize: 14,fontWeight: 'bold', }}>{movie?.release_date.slice(0,4)}</Text></View>
                        <View style={{ backgroundColor: 'white'}}><Text style={{ fontSize: 12,fontWeight: 'bold', }}>{runtimeInHours}H {runtimeInMinutesRemainder}M</Text></View>
                    </View>
                    <View style={{backgroundColor:'white', flexDirection: 'row', justifyContent:'flex-start' ,}}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={{ fontSize: 10 }}>{movie?.genres.map((genre: any) => genre.name).join(' | ')}</Text>
                    </View>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={{ fontSize: 10, }}>{movie?.spoken_languages.map((language: any) => language.name).join(', ')}</Text>

                    <View style={{backgroundColor:'white',marginTop:5, justifyContent:'flex-start' ,}}>
                            <Text style={{ fontSize: 10,fontWeight:'900', }}>overview : </Text>
                            <Text  numberOfLines={6} style={{ fontSize: 10 }}>{movie?.overview}</Text>
                    </View>
                </View>
            </View>
    );
};

export default SelectedMovie;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
