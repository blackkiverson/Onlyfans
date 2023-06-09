import { Text, View, SafeAreaView, TextInput, Button, Image } from 'react-native'
import { useState } from 'react'
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { DataStore, Storage } from 'aws-amplify';
import { Post } from '../src/models';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import * as Crypto from 'expo-crypto';

const NewPost = () => {
// handling text & image posts
  const [text, setText] = useState(''); 
  const [image, setImage] = useState('');

  const { user } = useAuthenticator();

  const router = useRouter();

  const onPost = async () => {
    console.warn('Post: ', text);

    // before we save image to datastore in post we need to upload to database first
    const imageKey = await uploadImage();

    // sending Posts to the Post database and linking it to a user
    await DataStore.save(new Post({ text, likes: 0, userID: user.attributes.sub, image: imageKey }));

    setText('');
    setImage('');
  };

  async function uploadImage() {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      // denies override of image when new image is uploaded
      const filekey = `${Crypto.randomUUID()}.png`;
      await Storage.put(filekey, blob, {
        contentType: "image/jpeg", // contentType is optional
      });
      return filekey;
    } catch (err) {
      console.log("Error uploading file:", err);
    }
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