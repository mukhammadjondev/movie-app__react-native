import { View, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import MovieCard from './movie-card'

const {width} = Dimensions.get('window')

export default function BigCarousel({movies}) {
  return (
    <View className={'mb-5'}>
      <Carousel data={movies} renderItem={({item}) => <MovieCard item={item} />} firstItem={1} sliderWidth={width} itemWidth={width * 0.7} inactiveSlideOpacity={0.6} slideStyle={{display: 'flex', alignItems: 'center'}} />
    </View>
  )
}