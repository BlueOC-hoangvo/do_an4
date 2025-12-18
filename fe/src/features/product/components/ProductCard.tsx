import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../types";
import { Colors } from "@/src/constants/theme";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onPress: () => void;
}

export const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  onPress,
}: ProductCardProps) => {
  return (
    // w-[48%] để chia 2 cột, mb-4 tạo khoảng cách dưới
    <View className="w-[48%] bg-white rounded-xl mb-4 p-2 shadow-sm border border-gray-100">
      {/* Nút Yêu thích - Absolute positioning */}
      <TouchableOpacity
        className="absolute top-2 right-2 z-10 bg-white/90 p-1.5 rounded-full shadow-sm"
        onPress={() => onToggleFavorite(product)}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={20}
          color={isFavorite ? "#e63946" : "#555"}
        />
      </TouchableOpacity>

      {/* Nội dung Card */}
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Image
          source={{ uri: product.image_url }}
          className="w-full h-36 rounded-lg mb-2"
          resizeMode="cover"
        />

        <View className="items-start">
          <Text className="text-base font-bold text-red-600 mb-1">
            {Number(product.price).toLocaleString("vi-VN")}đ
          </Text>
          <Text className="text-sm text-gray-800 leading-5" numberOfLines={2}>
            {product.product_name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
