import Button from "@/components/Button";
import Field from "@/components/Field";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onSignUp = async () => {
        if (!isLoaded) return;

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            setVerification({ ...verification, state: "pending" });
        } catch (error: any) {
            Alert.alert("Error", error.errors[0].longMessage);
        }
    };

    const onVerify = async () => {
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                { code: verification.code }
            );

            if (completeSignUp.status === "complete") {
                await fetchAPI("/(api)/user", {
                    method: "POST",
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        clerkId: completeSignUp.createdUserId,
                    }),
                });
                await setActive({ session: completeSignUp.createdSessionId });
                setVerification({ ...verification, state: "success" });
            } else {
                setVerification({
                    ...verification,
                    state: "failed",
                    error: "Verification failed",
                });
            }
        } catch (error: any) {
            setVerification({
                ...verification,
                state: "failed",
                error: error.errors[0].longMessage,
            });
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
                <ReactNativeModal isVisible={verification.state === "success"}>
                    <View className="bg-white min-h-[300px] px-7 py-9 rounded-2xl">
                        <Image
                            source={images.check}
                            className="w-[110px] h-[110px] mx-auto my-5"
                        />
                        <Text className="text-3xl font-JakartaBold text-center">
                            Verified
                        </Text>
                        <Text className="text-base text-gray-400 font-Jakarta mt-2 text-center">
                            You have successfully verified your account
                        </Text>
                        <Button
                            title="Browse Home"
                            onPress={() =>
                                router.replace("/(root)/(tabs)/home")
                            }
                            className="mt-5"
                        />
                    </View>
                </ReactNativeModal>
                <ReactNativeModal
                    isVisible={verification.state === "pending"}
                    onModalHide={() =>
                        setVerification({ ...verification, state: "success" })
                    }
                >
                    <View className="bg-white min-h-[300px] px-7 py-9 rounded-2xl">
                        <Text className="text-2xl font-JakartaExtraBold mb-2">
                            Verification
                        </Text>
                        <Text className="font-Jakarta mb-5">
                            {`We've sent verification code to`} {form.email}
                        </Text>
                        <Field
                            label="Code"
                            icon={icons.lock}
                            placeholder="12345"
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(code) =>
                                setVerification({ ...verification, code })
                            }
                        />
                        {verification.error && (
                            <Text className="text-red-500 text-sm mt-1">
                                {verification.error}
                            </Text>
                        )}
                        <Button
                            title="Verifiy Email"
                            onPress={onVerify}
                            className="mt-5 bg-success-500"
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    );
};

export default SignUp;
