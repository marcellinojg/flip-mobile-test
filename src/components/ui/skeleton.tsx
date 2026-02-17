
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";

type SkeletonProps = {
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    style?: ViewStyle;
};

export const Skeleton: React.FC<SkeletonProps> = ({
    width = "100%",
    height = 20,
    borderRadius = 8,
    style = {},
}) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.4,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [pulseAnim]);

    return (
        <Animated.View
            style={[
                styles.skeletonBase,
                {
                    width: width as unknown as number,
                    height: height as unknown as number,
                    borderRadius,
                    opacity: pulseAnim,
                },
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    skeletonBase: {
        backgroundColor: "#E1E9EE",
        overflow: "hidden",
        position: "relative",
    },
});
