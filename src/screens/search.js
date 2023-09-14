import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { fetchSearchMovie, image185 } from '../api'
import Loader from '../components/loader'
import { debounce } from 'lodash'

const {width, height} = Dimensions.get('window')

export default function Search() {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = searchText => {
    if(searchText && searchText.length > 3) {
      setIsLoading(true)
      fetchSearchMovie({
        query: searchText,
        include_adult: false,
        page: '1'
      }).then(data => {
        setIsLoading(false)
        setResults(data.results)
      })
    } else {
      setResults([])
      setIsLoading(false)
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), [handleSearch])

  const navigation = useNavigation()

  return (
    <SafeAreaView className={'flex-1 bg-slate-900'}>
      <View className={'mx-4 mb-3 flex-row justify-between items-center border border-neutral-400 rounded-full'}>
        <TextInput placeholder='Search movie' placeholderTextColor={'lightgray'} className={'pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide'} onChangeText={handleTextDebounce} />
        <TouchableOpacity className={'rounded-full p-2 m-2 bg-neutral-400'} onPress={() => navigation.navigate('Home')}>
          <XMarkIcon color={'white'} size={25} />
        </TouchableOpacity>
      </View>

      {isLoading ? <Loader /> : results.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}} className='space-y-3'>
          <Text className={'text-white font-semibold ml-1'}>
            Results ({results.length})
          </Text>

          <View className={'flex-row justify-between flex-wrap'}>
            {results?.map(item => (
              <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('Movie', item.id)}>
                <View className={'space-y-2 mb-4'}>
                  <Image source={{uri: image185(item.poster_path)}} className={'rounded-3xl'} style={{width: width * 0.44, height: height * 0.3}} />
                  <Text className={'text-gray-400 ml-1'}>
                    {item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className={'justify-center items-center bg-slate-500 rounded-3xl mx-4'} style={{height: height * 0.8}}>
          <Image source={require('../../assets/not_found.png')} className={'h-80 w-80'} />
          <Text className={'text-white text-3xl text-center'}>Movies not found</Text>
        </View>
      )}
    </SafeAreaView>
  )
}
