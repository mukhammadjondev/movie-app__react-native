import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'
import { MagnifyingGlassIcon } from 'react-native-heroicons//outline'
import { fetchPopularMovie, fetchTopRatedMovie, fetchTrendingMovie, fetchUpcomingMovie } from '../api'
import { useEffect, useState } from 'react';
import BigCarousel from '../components/big-carousel';
import SmallCarousel from '../components/small-carousel';
import Loader from '../components/loader';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])
  const [popular, setPopular] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation()

  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie()
    setTrending(data.results)
    setIsLoading(false)
  }

  const getUpcomingMovie = async () => {
    const data = await fetchUpcomingMovie()
    setUpcoming(data.results)
  }

  const getTopRatedMovie = async () => {
    const data = await fetchTopRatedMovie()
    setTopRated(data.results)
  }

  const getPopularMovie = async () => {
    const data = await fetchPopularMovie()
    setPopular(data.results)
  }

  useEffect(() => {
    getTrendingMovie()
    getUpcomingMovie()
    getTopRatedMovie()
    getPopularMovie()
  }, [])

  return  (
    <View className="flex-1 bg-slate-900">
      <SafeAreaView>
        <StatusBar style='light' />
        <View className={'flex-row justify-between items-center mx-4'}>
          <Image source={require('../../assets/logo.png')} />
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {isLoading ? <Loader /> : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}}>
          {trending.length > 0 && <BigCarousel movies={trending} />}
          {upcoming.length > 0 && <SmallCarousel movies={upcoming} title='Upcoming movies' />}
          {trending.length > 0 && <SmallCarousel movies={trending.reverse()} title='Trending movies' />}
          {popular.length > 0 && <SmallCarousel movies={popular} title='Popular movies' />}
          {topRated.length > 0 && <BigCarousel movies={topRated} />}
        </ScrollView>
      )}
    </View>
  )
}