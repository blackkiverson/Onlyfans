import { View, Text, Image } from 'react-native'

const Post = ({ post }) => {
  return (
    <View>
      <Text>Post</Text>

      <Image src={post.image} style={{ width: '100%', aspectRatio: 1}}/>
    </View>
  )
}

export default Post