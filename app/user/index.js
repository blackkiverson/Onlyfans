import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'

const ProfilePage = () => {
    const router = useRouter();

  return (
    <View style={{ marginTop: 100 }}>
      <Text>Profile Page</Text>
      {/* going to the previous page using onPress router.back() */}
      <Text onPress={() => router.back()}>Go Back</Text>
    </View>
  )
}

export default ProfilePage