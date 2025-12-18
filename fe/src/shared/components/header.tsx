import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
export default function HeaderCart() {
  const router = useRouter();
  const handleUserPress = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      router.push("/profile"); // đã đăng nhập → vào profile
    } else {
      router.push("/login"); // chưa đăng nhập → vào login
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GIỎ HÀNG</Text>
      <View style={styles.iconGroup}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Feather name="search" size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUserPress}>
          <Feather name="user" size={22} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
