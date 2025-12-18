import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Import Components & Data
import Banner from "@/src/features/home/components/Banner";
import { ProductCard } from "@/src/features/product/components/ProductCard";
import { MOCK_PRODUCTS } from "@/src/data/mockData";

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]); // Giả lập state yêu thích tạm thời

  // Giả lập chức năng Refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Giả lập toggle favorite
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fid) => fid !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />

      {/* Header giả lập (Tìm kiếm) */}
      <View className="px-4 pt-12 pb-4 bg-white flex-row items-center justify-between border-b border-gray-100">
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 h-10 mr-3">
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            placeholder="Tìm kiếm đồng hồ..."
            className="flex-1 ml-2 text-gray-700"
          />
        </View>
        <TouchableOpacity onPress={() => router.push("/cart")}>
          <View className="relative">
            <Ionicons name="cart-outline" size={26} color="#333" />
            <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full justify-center items-center">
              <Text className="text-white text-[10px] font-bold">2</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Phần 1: Banner */}
        <View className="px-4 mt-4">
          <Banner />
        </View>

        {/* Phần 2: Sản phẩm nổi bật */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <Text className="text-lg font-bold text-gray-800">
              Sản phẩm nổi bật
            </Text>
            <TouchableOpacity onPress={() => router.push("/explore")}>
              <Text className="text-blue-500 text-sm">Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between px-4">
            {MOCK_PRODUCTS.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
                onPress={() => router.push(`/product/${item.id}`)}
              />
            ))}
          </View>
        </View>

        {/* Phần 3: Danh mục (Mock nhỏ) */}
        <View className="mt-4 px-4">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Thương hiệu hàng đầu
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {["Rolex", "Casio", "Seiko", "Hublot", "Omega"].map(
              (brand, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-white px-5 py-2 rounded-full mr-3 border border-gray-200"
                >
                  <Text className="font-medium text-gray-700">{brand}</Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
