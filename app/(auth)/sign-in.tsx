import Button from "@/components/Button";
import Field from "@/components/Field";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onSignIn = async () => {
        if (!isLoaded) return;
        const attempt = await signIn.create({
            identifier: form.email,
            password: form.password,
        });

        if (attempt.status === "complete") {
            await setActive({ session: attempt.createdSessionId });
            router.replace("/(root)/(tabs)/home");
        } else {
            Alert.alert("Error", "Sign in failed");
        }
        try {
        } catch (error: any) {
            Alert.alert("Error", error.errors[0].longMessage);
        }
    };
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image
                        source={images.signUpCar}
                        className="z-0 w-full h-[250px]"
                    />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Weclome
                    </Text>
                </View>
                <View className="p-5">
                    <Field
                        label="Email"
                        placeholder="Enter your email"
                        icon={icons.email}
                        value={form.email}
                        onChangeText={(value) =>
                            setForm({ ...form, email: value })
                        }
                    />
                    <Field
                        label="Password"
                        placeholder="Enter your password"
                        icon={icons.lock}
                        value={form.password}
                        secureTextEntry={true}
                        onChangeText={(value) =>
                            setForm({ ...form, password: value })
                        }
                    />
                    <Button
                        title="Sign In"
                        onPress={onSignIn}
                        className="mt-6"
                    />
                    <OAuth />
                    <Link
                        href="/sign-up"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        <Text>{`Don't have an account?`} </Text>
                        <Text className="text-primary-500">Sign Up</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignIn;
