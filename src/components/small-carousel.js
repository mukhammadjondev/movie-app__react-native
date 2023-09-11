import { View, Text, ScrollView, Dimensions, Image } from 'react-native'
import { image185 } from '../api'

const {width, height} = Dimensions.get('window')

export default function SmallCarousel({movies, title}) {
  return (
    <View className='mb-8 space-y-4' key={movies.id}>
      <Text className={'text-red-400 text-xl font-semibold'}>{title}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}}>
        {movies.map(movie => (
          <View className='space-y-1 mr-4'>
            <Image source={{uri: image185(movie.poster_path)}} className={'rounded-3xl'} style={{width: width * 0.3, height: height * 0.2}} />
            <Text className='text-white'>
              {movie.title.length > 15 ? movie.title.slice(0, 15) + '...' : movie.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}