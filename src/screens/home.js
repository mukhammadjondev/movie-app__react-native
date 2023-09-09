import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'
import { MagnifyingGlassIcon } from 'react-native-heroicons//outline'
import { fetchTopRatedMovie, fetchTrendingMovie, fetchUpcomingMovie } from '../api'
import { useEffect, useState } from 'react';
import TrendingMovie from '../components/trending-movie';
import UpcomingMovie from '../components/upcoming-movie';
import TopRatedMovie from '../components/top-rated-movie';

export default function Home() {
  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])

  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie()
    setTrending(data.results)
  }

  const getUpcomingMovie = async () => {
    const data = await fetchUpcomingMovie()
    setUpcoming(data.results)
  }

  const getTopRatedMovie = async () => {
    const data = await fetchTopRatedMovie()
    setTopRated(data.results)
  }

  useEffect(() => {
    getTrendingMovie()
    getUpcomingMovie()
    getTopRatedMovie()
  }, [])

  return (
    <View className="flex-1 bg-slate-950">
      <SafeAreaView>
        <StatusBar style='light' />
        <View className={'flex-row justify-between items-center mx-4'}>
          <Image source={require('../../assets/logo.png')} />
          <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'} />
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}}>
        {trending.lenght > 0 && <TrendingMovie />}
        {upcoming.lenght > 0 && <UpcomingMovie />}
        {topRated.lenght > 0 && <TopRatedMovie />}
      </ScrollView>
    </View>
  )
}