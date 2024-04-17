import React from 'react';
import { ExternalLink } from '../../components/ExternalLink';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MonoText } from '../../components/StyledText';
import { Text, View } from '../../components/Themed';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabTwoScreen = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
        <MonoText style={{fontWeight:'900',fontSize:35,}}>Project Overview</MonoText>
        <MonoText style={styles.text}>
          This project is made by React Native and Expo to build a cross-platform mobile application with TypeScript
          support. The project aims to showcase and interface for the <MonoText style={{fontWeight:'bold'}}>"Movie Recommendation Engine" </MonoText>System{"\n"}
          i build through Machine Learnig.{"\n\n    "}
          As you can experiences the movie recommendation system by searching & selecting the movie from the list and 
          the system will recommend the movies based on the selected movie.{"\n\n    "} 
          You can find the source code for this project on GitHub.
          For more information on how to get started, check out the documentation on the GitHub repository.
          Read the ReadMe file for more information and understanding of the project.
        </MonoText>

        <MonoText style={styles.text}>
          Connect with me on
          <ExternalLink
            style={styles.helpLink}
            href="https://github.com/jagadeeshm007"> 
             {" "}<Icon name="github" size={20} color="#000" />{" "}
            <MonoText style={styles.helpLinkText} lightColor={Colors.light.tint}>GitHub</MonoText>
          </ExternalLink>
          {' '}and{'\n'}
          <ExternalLink
            style={styles.helpLink}
            href="https://www.linkedin.com/in/mandalajagadeesh/"> 
            {" "}<Icon name="linkedin" size={20} color="#000" />{" "}
            <MonoText style={styles.helpLinkText} lightColor={Colors.light.tint}>Linkedin</MonoText>
          </ExternalLink>{' '}
          to stay updated on my projects or for any queries.
        </MonoText>
        <MonoText style={{fontWeight:'300',fontSize:20}}>
        Repositry Links
        </MonoText>
        <MonoText>
          <ExternalLink
            style={styles.helpLink}
            href="https://github.com/jagadeeshm007/Movie_Recommendation_Search_App">
            {" "}<Icon name="link" size={14} color={Colors.light.tint} />{" "}
            <MonoText style={styles.helpLinkText} lightColor={Colors.light.tint}>Search App</MonoText>
          </ExternalLink>{"\n"}
          <ExternalLink
            style={styles.helpLink}
            href="https://github.com/jagadeeshm007/Movie_Recommendation_Engine">
              {" "}<Icon name="link" size={14} color={Colors.light.tint} />{" "}
            <MonoText style={styles.helpLinkText} lightColor={Colors.light.tint}>Recommendation Engine</MonoText>
          </ExternalLink>
        </MonoText>
        <View style={{backgroundColor:"white",flex:1,padding:10,justifyContent:'flex-end'}}>
        <MonoText>Made by Jagadeesh Mandala{"\n"}& Gowtham Varri </MonoText>
        </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    marginBottom: 15,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});

export default TabTwoScreen;
