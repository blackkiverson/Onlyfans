import { View, Text, Image } from 'react-native'
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { DataStore, Storage } from 'aws-amplify';
import { User } from '../models';

const Post = ({ post }) => {

  const [user, setUser] = useState();
  const [imageUri, setImageUri] = useState();

  // ties posts to the user that made the post
  useEffect(() => {
    DataStore.query(User, post.userID).then(setUser);
  }, []);

  useEffect(() => {
    if (post.image) {
      Storage.get(post.image).then(setImageUri);
    }
  }, [post.image])
  
  

  return (
    <View style={{ marginVertical: 15 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Image
          src={user?.avatar}
          style={{
            width: 50,
            aspectRatio: 1,
            borderRadius: 50,
            marginRight: 10,
          }}
        />
        <View>
          <Text style={{ fontWeight: "600", marginBottom: 3, fontSize: 16 }}>
            {user?.name}
          </Text>
          <Text style={{ color: "gray" }}>@{user?.handle}</Text>
        </View>

        <View
          style={{
            marginLeft: "auto",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ marginRight: 5, color: "gray" }}>3 hours ago</Text>
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color="gray"
            style={{ padding: 5 }}
          />
        </View>
      </View>

      <Text style={{ margin: 10, lineHeight: 18 }}>{post.text}</Text>

      {/* {removing image block on post if there is no image} */}
      {post.image && (<Image src={imageUri} style={{ width: "100%", aspectRatio: 1 }} />)}

      <View style={{ margin: 10, flexDirection: "row" }}>
        <AntDesign
          name="hearto"
          size={20}
          color="gray"
          style={{ marginRight: 15 }}
        />

        <FontAwesome5
          name="dollar-sign"
          size={20}
          color="gray"
          style={{ marginRight: 15 }}
        />
      </View>

      <Text style={{ fontWeight: "500", marginHorizontal: 10 }}>
        {post.likes} Likes
      </Text>
    </View>
  );
}

export default Post