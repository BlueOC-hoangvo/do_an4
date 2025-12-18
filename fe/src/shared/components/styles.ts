// components/header/styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
