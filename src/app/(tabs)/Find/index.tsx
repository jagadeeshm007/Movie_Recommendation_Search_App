import { StyleSheet, View, Text } from 'react-native';
import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import Searchlist from '@/src/components/Searchlist';

export default function TabOneScreen() {

  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={[styles.container]}>
       <View style={styles.search}>
        <View style={{ alignItems: 'center', paddingBottom: 15 }}>
          <Text style={styles.title}>Movie Recommendation</Text>
        </View>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ backgroundColor: '#ede8ed' }}
        />
      </View>

      {searchQuery !== '' && (
        <View>
          <Searchlist searchQuery={searchQuery} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  search: {
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
