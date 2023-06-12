import { useRouter } from "expo-router";
import { IconButton } from "react-native-paper";
import { colors } from "../Themed";


const HeaderBack = () => {
    const router = useRouter();
    return <IconButton icon="chevron-left" onPress={() => router.back()} iconColor={colors.blue} />
}

export default HeaderBack