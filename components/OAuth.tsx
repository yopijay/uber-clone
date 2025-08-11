import { icons } from "@/constants";
import { Image, Text, View } from "react-native";
import Button from "./Button";

const OAuth = () => {
    const onGoogleSignIn = async () => {};
    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
                <View className="flex-1 h-[1px] bg-general-100" />
                <Text className="text-lg">Or</Text>
                <View className="flex-1 h-[1px] bg-general-100" />
            </View>
            <Button
                bgVariant="outline"
                textVariant="primary"
                title="Log In with Google"
                className="mt-5 w-full shadow-none"
                onPress={onGoogleSignIn}
                IconLeft={() => (
                    <Image
                        source={icons.google}
                        resizeMode="contain"
                        className="w-5 h-5 mx-2"
                    />
                )}
            />
        </View>
    );
};

export default OAuth;
