import Button from "@/components/Button";
import Field from "@/components/Field";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onSignUp = async () => {};

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image
                        source={images.signUpCar}
                        className="z-0 w-full h-[250px]"
                    />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Create your account
                    </Text>
                </View>
                <View className="p-5">
                    <Field
                        label="Name"
                        placeholder="Enter your name"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) =>
                            setForm({ ...form, name: value })
                        }
                    />
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
                        title="Sign Up"
                        onPress={onSignUp}
                        className="mt-6"
                    />
                    <OAuth />
                    <Link
                        href="/sign-in"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        <Text>Already have an account? </Text>
                        <Text className="text-primary-500">Sign In</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp;
