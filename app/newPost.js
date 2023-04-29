import { Text, View, SafeAreaView, TextInput, Button, Image } from 'react-native'
import { useState } from 'react'
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const NewPost = () => {
// handling text & image posts
  const [text, setText] = useState(''); 
  const [image, setImage] = useState('');

  const router = useRouter();

  const onPost = () => {
    console.warn('Post: ', text);
  }  

//   expo image picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* going to the previous page using onPress router.back() */}
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.back()}
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontWeight: "500", fontsize: 20 }}>New Post</Text>
      </View>

      <TextInput
        placeholder="Compose new post..."
        placeholderTextColor={"gray"}
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={3}
      />

      <View style={{ marginVertical: 15 }}>
        <Feather onPress={pickImage} name="image" size={24} color="gray" />
      </View>

      {image && <Image src={image} style={{ width: "100%", aspectRatio: 1 }} />}

      <Button title="Post" onPress={onPost} />
    </SafeAreaView>
  );
}

export default NewPost