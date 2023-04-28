import { StyleSheet, Text, View, Image, ImageBackground, Pressable } from "react-native";
import { Link } from "expo-router";

export default function UserCard({ user }) {
  //function UserCard(props){
  //  const user = props.user;
  //}

  //function UserCard(props){
  //  const {user} = props;
  //}

  return (
    <Link href={`/user/${user.id}`} asChild>
      {/* using *template string* (``) to fetch user profile dynamically, based on UserCard clicked */}
      {/* using asChild in the link component, the link component will us the child component instead of a text */}
      <Pressable>
        <ImageBackground
          source={{ uri: user.coverImage }}
          style={styles.userCard}
        >
          <View style={styles.overlay} />
          {/* Image */}
          <Image src={user.avatar} style={styles.userImage} />

          {/* Name & handle */}
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "500",
                marginBottom: 5,
              }}
            >
              {user.name}
            </Text>
            <Text style={{ color: "white" }}>@{user.handle}</Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: "gray",
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",

    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 5,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // ...StyleSheet.absoluteFillObject,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
});
