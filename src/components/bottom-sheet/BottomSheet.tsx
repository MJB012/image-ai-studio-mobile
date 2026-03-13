import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/theme";

interface BottomSheetProps {
  title?: string;
  snapPoints?: (string | number)[];
  children: React.ReactNode;
  onClose?: () => void;
}

const BottomSheet = forwardRef<GorhomBottomSheet, BottomSheetProps>(
  ({ title, snapPoints = ["45%"], children, onClose }, ref) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.4}
          pressBehavior="close"
        />
      ),
      []
    );

    return (
      <GorhomBottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onClose={onClose}
        handleIndicatorStyle={styles.indicator}
        backgroundStyle={styles.background}
      >
        <BottomSheetView style={styles.content}>
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (ref && "current" in ref && ref.current) {
                    ref.current.close();
                  }
                }}
                activeOpacity={0.7}
              >
                <MaterialIcons name="close" size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>
          )}
          {children}
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: "#d1d5db",
    width: 36,
  },
  background: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a2e",
  },
});

export default BottomSheet;
