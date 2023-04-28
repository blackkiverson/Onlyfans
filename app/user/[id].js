import { View, Text } from 'react-native'
import { useRouter, useSearchParams } from 'expo-router'
import users from '../../Asset Bundle OnlyFans/assets/data/users';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = useSearchParams();

  const user = users.find((u) => u.id === id);

  if (!user) {
    return <Text> User not found!</Text>;
  }

  return (
    <View style={{ marginTop: 100 }}>
      <Text>Profile Page: {user.name}</Text>
      {/* going to the previous page using onPress router.back() */}
      <Text onPress={() => router.back()}>Go Back</Text>
    </View>
  )
}

export default ProfilePage