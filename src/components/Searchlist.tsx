import { FlatList, View } from 'react-native';
import * as React from 'react';
import movies from '../../assets/movies/movies.json';
import { useState, useEffect } from 'react';
import ElementInSearch from './ElementInSearch';
const Searchlist = ({ searchQuery }: { searchQuery: string }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const Results = movies
      .filter((movie) => {
        const title = String(movie.title);
        const lowerCaseTitle = title.toLowerCase();
        const lowerCaseQuery = searchQuery.toLowerCase();

        // First, check if the title starts with the search query
        if (lowerCaseTitle.startsWith(lowerCaseQuery)) {
          return true;
        }

        // Then, check if the title contains the search query
        return lowerCaseTitle.includes(lowerCaseQuery);
      })
      .sort((a, b) => {
        const titleA = String(a.title).toLowerCase();
        const titleB = String(b.title).toLowerCase();

        // Custom sorting logic: prioritize titles that start with the search query
        if (titleA.startsWith(searchQuery.toLowerCase()) && !titleB.startsWith(searchQuery.toLowerCase())) {
          return -1;
        } else if (!titleA.startsWith(searchQuery.toLowerCase()) && titleB.startsWith(searchQuery.toLowerCase())) {
          return 1;
        } else {
          return titleA.localeCompare(titleB);
        }
      })
      .slice(0, 5);

    setSearchResults(Results);
  }, [searchQuery]);

  return (
    <View>
      <FlatList 
        data={searchResults} 
        renderItem={({ item }) => <ElementInSearch item={item} />} 
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Searchlist;
