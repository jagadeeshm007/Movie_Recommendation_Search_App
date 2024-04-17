import { Text, View } from '@/src/components/Themed';
import { Image ,Pressable,StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import * as React from 'react';
import { useState } from 'react';
import Loading from './ImageLoading';

export const defaultProductImage =  
  'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';


type ItemsProps = {
  product: number;
};

const Items: React.FC<ItemsProps> = ({ product }) => {

  const [movie, setMovie] = React.useState<any>(null);
  const [id, setid] = React.useState<any>(product);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_API_KEY}&language=en-US`);
    const movieData = await response.json();
    setMovie(movieData);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Link href={{pathname:"/(tabs)/Find/[id]",params:{id:id}}} asChild>
      <Pressable style={styles.container}>
        <View style={styles.imageview}>
            <Image 
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` || defaultProductImage }}  
              style={styles.image}
              resizeMode='contain'
            />
        </View>
        <Text adjustsFontSizeToFit numberOfLines={2} style={styles.title}>{movie?.original_title}</Text>
      </Pressable>
    </Link>
  );
};

export default Items;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding:10,
      flex:1,
      maxWidth: '50%',
      justifyContent: 'center',
       alignContent: 'center', 
       alignItems: 'center',
    },
    image:{
      width: 138,
      height: 203,
      aspectRatio: 1,
      borderRadius: 20,
      justifyContent: 'center',
      alignContent: 'center', 
      alignItems: 'center',
    },
    title:{ 
      fontSize:20,
      fontWeight: 'bold', 
      textAlign: 'center',
      justifyContent: 'center',
      alignContent: 'center', 
      alignItems: 'center',
    },
    imageview:{
      backgroundColor:"white",
      width: 135, 
      height: 200,
      justifyContent: 'center', 
      alignContent: 'center', 
      alignItems: 'center', 
      borderRadius: 20
    },
  });
  