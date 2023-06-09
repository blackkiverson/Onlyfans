import { Text, StyleSheet, FlatList, View } from 'react-native'
import { useRouter, useGlobalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';
import UserProfileHeader from '../../src/components/UserProfileHeader';
import Post from '../../src/components/Post';
import { FontAwesome5 } from "@expo/vector-icons";
import { DataStore } from 'aws-amplify';
import {User, Post as PostModel} from '../../src/models';

const ProfilePage = () => {
  const [user, setUser] = useState();

  const [posts, setPosts] = useState([]);

  // subscription useState created for dynamic button and text interaction
  const [isSubscribed, setIsSubscribed] = useState(false);

  const router = useRouter();
  const { id } = useGlobalSearchParams();

  useEffect(() => {
    DataStore.query(User, id).then(setUser);
    // '(..., (post) => post.userID.eq(id))' checks to see if a post was made by the user then displays it in user's profile page
    DataStore.query(PostModel, (post) => post.userID.eq(id)).then(setPosts);
  }, [id])

  // const user = users.find((u) => u.id === id);

  if (!user) {
    return <Text> User not found!</Text>;
  }

  if (!isSubscribed) {
    return (
      <View>
        <UserProfileHeader
          user={user}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />

        <View
          style={{
            backgroundColor: "gainsboro",
            alignItems: "center",
            padding: 20,
          }}
        >
          <FontAwesome5 name="lock" size={50} color="gray" />
          <Text
            style={{
              backgroundColor: "royalblue",
              height: 50,
              borderRadius: 25,
              overflow: "hidden",
              padding: 15,
              color: 'white',
              margin: 20
            }}
          >
            {" "}
            Subscribe to see user's post{" "}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        ListHeaderComponent={() => (
          <UserProfileHeader
            user={user}
            isSubscribed={isSubscribed}
            setIsSubscribed={setIsSubscribed}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
});

export default ProfilePage