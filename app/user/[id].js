import { Text, StyleSheet, FlatList, View } from 'react-native'
import { useRouter, useSearchParams } from 'expo-router'
import users from '../../Asset Bundle OnlyFans/assets/data/users';
import { useState } from 'react';
import UserProfileHeader from '../../src/components/UserProfileHeader';
import posts from '../../Asset Bundle OnlyFans/assets/data/posts';
import Post from '../../src/components/Post';

const ProfilePage = () => {
  // subscription useState created for dynamic button and text interaction
  const [isSubscribed, setIsSubscribed] = useState(false);

  const router = useRouter();
  const { id } = useSearchParams();

  const user = users.find((u) => u.id === id);

  if (!user) {
    return <Text> User not found!</Text>;
  }

  return (
    <View>
      <UserProfileHeader
        user={user}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
      />

      <FlatList 
        data={posts}
        renderItem={({item}) => <Post post={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
});

export default ProfilePage