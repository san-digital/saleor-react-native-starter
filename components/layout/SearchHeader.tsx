import { useRouter, } from "expo-router"
import { View, colors } from "../Themed";
import { IconButton } from "react-native-paper";
import ProductSearch from "../products/ProductsSearch";
import { SafeAreaView, StyleSheet } from "react-native";
import { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoadingIndicator from "./LoadingIndicator";

interface Props {
  withBack?: boolean
  cleanSearch?: boolean
  searchOnLoad?: boolean
}

const SearchHeaderWithBack = () => {
  const router = useRouter();
  const statusBarInset = useSafeAreaInsets();

  return (
    <>
      <SafeAreaView style={{
        ...styles.container,
        marginTop: statusBarInset.top + 8
      }}>
        <View style={styles.containerWithBack}>
          <View style={styles.searchBarWrapper}>
            <IconButton
              icon="arrow-left"
              onPress={() => router.back()}
              iconColor={colors.blue}
            />

            <ProductSearch />
          </View>
        </View>

      </SafeAreaView>
      <LoadingIndicator style={{marginTop: 12}}/>
    </>
  );
}

const SearchHeader: FC<Props> = ({ withBack, cleanSearch, searchOnLoad = true }) => {
  const statusBarInset = useSafeAreaInsets();

  if (withBack) {
    return <SearchHeaderWithBack />
  }


  return (
    <View style={{ display: "flex", justifyContent: "flex-start", backgroundColor: "white" }}>
      <View style={{
        ...styles.container,
        padding: 16,
        marginTop: statusBarInset.top + 8
      }} >
        <View style={styles.searchBarWrapperFull}>
          <ProductSearch cleanSearch={cleanSearch} searchOnLoad={searchOnLoad} />
        </View>


      </View>
      <LoadingIndicator  />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 30,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  containerWithBack: {
    width: "100%",
    height: 40,
    marginTop: 30,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  searchBarWrapperFull: {
    width: "100%",
  },
  searchBarWrapper: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    color: colors.blue,
  },
});

export default SearchHeader
