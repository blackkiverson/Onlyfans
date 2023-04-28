import { View, Text } from 'react-native'
import { useRouter, useSearchParams } from 'expo-router'

const ProfilePage = () => {
    const router = useRouter();
    const { id } = useSearchParams();

  return (
    <View style={{ marginTop: 100 }}>
      <Text>Profile Page: {id}</Text>
      {/* going to the previous page using onPress router.back() */}
      <Text onPress={() => router.back()}>Go Back</Text>
    </View>
  )
}

export default ProfilePage