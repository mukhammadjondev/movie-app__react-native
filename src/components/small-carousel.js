import { useNavigation } from '@react-navigation/native'
import { View, Text, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
import { image185 } from '../api'

const {width, height} = Dimensions.get('window')

export default function SmallCarousel({movies, title}) {
  const navigation = useNavigation()

  return (
    <View className='mb-8 space-y-4' key={movies.id}>
      <Text className={'text-white text-xl font-semibold ml-2'}>{title}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}}>
        {movies && movies.map(movie => (
          <TouchableWithoutFeedback key={movie.id} onPress={() => navigation.navigate('Movie', movie.id)}>
            <View className='space-y-1 mr-4'>
              <Image source={{uri: image185(movie.poster_path)}} className={'rounded-3xl'} style={{width: width * 0.3, height: height * 0.2}} />
              <Text className='text-white'>
                {movie.title.length > 15 ? movie.title.slice(0, 15) + '...' : movie.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  )
}