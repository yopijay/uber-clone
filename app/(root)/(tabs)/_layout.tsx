import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({
    focused,
    source,
}: {
    focused: boolean;
    source: ImageSourcePropType;
}) => (
    <View
        className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
    >
        <View
            className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}
        >
            <Image
                source={source}
                tintColor="white"
                resizeMode="contain"
                className="w-7 h-7"
            />
        </View>
    </View>
);

const TabLayout = () => {
    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{ tabBarActiveTintColor: "white", tabBarInactiveTintColor: "white", tabBarShowLabel: false, tabBarStyle: { backgroundColor: "#333333"} }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} source={icons.home} />
                    ),
                }}
            />
            <Tabs.Screen
                name="rides"
                options={{
                    title: "Rides",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} source={icons.list} />
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} source={icons.chat} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} source={icons.profile} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
