import { useRouter } from "expo-router";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, colors } from "../Themed";
import LoadingIndicator from "./LoadingIndicator";


const SimpleBackHeader = () => {
  const router = useRouter();
  const statusBarInset = useSafeAreaInsets();

  return (
    <>
    <SafeAreaView style={{
      ...styles.container,
      height: styles.container.height,
      marginTop: statusBarInset.top + 8
    }}>
        <View style={styles.backContainer}>
          <IconButton
            icon="arrow-left"
            onPress={() => router.back()}
            style={{  marginLeft: Platform.OS === "android" ? -10 : 0 }}
            iconColor={colors.blue}
          />

      </View>
      </SafeAreaView>
      <LoadingIndicator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 50,
    marginTop: 30,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  backContainer: {
    width: "100%",
    height: 50,
    marginTop: 30,
    marginBottom: 10,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  searchBarWrapperFull: {
    width: "100%",
  },
  backButton: {
    color: colors.blue,
  },
});

export default SimpleBackHeader
