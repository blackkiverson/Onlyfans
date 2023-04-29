import { View, SafeAreaView, TextInput, Button } from 'react-native'
import { useState } from 'react'
import { Feather } from "@expo/vector-icons";

const NewPost = () => {
  const [text, setText] = useState(''); 

  const onPost = () => {
    console.warn('Post: ', text);
  }  

  const selectImage = () => {

  }

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <TextInput
        placeholder="Compose new post..."
        placeholderTextColor={"gray"}
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={3}
      />

      <View style={{ marginVertical: 15 }}>
        <Feather onPress={selectImage} name="image" size={24} color="gray" />
      </View>

      <Button title="Post" onPress={onPost} />
    </SafeAreaView>
  );
}

export default NewPost