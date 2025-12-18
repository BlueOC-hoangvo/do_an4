import React, { memo, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { MOCK_BANNERS } from "@/src/data/mockData"; // Đảm bảo bạn đã có file này từ bước trước

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // 1. Tự động trượt ảnh
  useEffect(() => {
    const interval = setInterval(() => {
      // Tính index tiếp theo
      const nextIndex =
        currentIndex === MOCK_BANNERS.length - 1 ? 0 : currentIndex + 1;

      // Cập nhật state và cuộn
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 4000); // 4 giây đổi 1 lần cho đỡ chóng mặt

    return () => clearInterval(interval);
  }, [currentIndex]);

  // 2. Xử lý khi người dùng vuốt tay (Cập nhật lại index để auto-scroll không bị giật)
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View className="relative w-full h-52 mt-4">
      <FlatList
        ref={flatListRef}
        data={MOCK_BANNERS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        // Dùng onMomentumScrollEnd để bắt sự kiện khi vuốt xong
        onMomentumScrollEnd={handleScroll}
        // Render ảnh
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_WIDTH, height: 208 }}>
            {/* Lưu ý: Dùng style width trực tiếp từ Dimensions để Paging chuẩn xác nhất */}
            <Image
              source={{ uri: item }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        )}
        // Tối ưu hiệu năng layout
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {/* Dots indicator (Dấu chấm) */}
      <View className="absolute bottom-3 flex-row w-full justify-center items-center gap-2">
        {MOCK_BANNERS.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-red-500" // Active: dài hơn, màu đỏ
                : "w-2 bg-gray-300" // Inactive: tròn, màu xám
            }`}
          />
        ))}
      </View>
    </View>
  );
}

export default memo(Banner);
