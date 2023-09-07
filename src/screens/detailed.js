import { Button, Text, View } from "react-native"

function Detailed({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-500">
      <Text>Detailed</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

export default Detailed