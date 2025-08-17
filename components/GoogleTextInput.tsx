import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import { Image, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    handlePress,
    textInputBackgroundColor,
}: GoogleInputProps) => {
    return (
        <View
            className={`flex flex-row items-center justify-center relative rounded-xl ${containerStyle} mb-5`}
        >
            <GooglePlacesAutocomplete
                fetchDetails={true}
                placeholder="Where you want to go?"
                debounce={200}
                predefinedPlaces={[
                    {
                        description: "Home",
                        geometry: {
                            location: {
                                lat: 37.7749,
                                lng: -122.4194,
                                latitude: 37.7749,
                                longitude: -122.4194,
                            },
                        },
                    },
                    {
                        description: "Work",
                        geometry: {
                            location: {
                                lat: 37.78825,
                                lng: -122.4324,
                                latitude: 37.78825,
                                longitude: -122.4324,
                            },
                        },
                    },
                ]}
                onPress={(data, details = null) => {
                    handlePress({
                        latitude: details?.geometry.location.lat!,
                        longitude: details?.geometry.location.lng!,
                        address: data.description,
                    });
                }}
                onFail={(error) =>
                    console.log("GooglePlacesAutocomplete error:", error)
                }
                query={{ key: `${googlePlacesApiKey}`, language: "en" }}
                renderLeftButton={() => (
                    <View className="justify-center items-center w-6 h-6">
                        <Image
                            source={icon ? icon : icons.search}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </View>
                )}
                textInputProps={{
                    placeholderTextColor: "gray",
                    placeholder: initialLocation ?? "Where do you want to go?",
                }}
                styles={{
                    textInputContainer: {
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                        marginHorizontal: 20,
                        position: "relative",
                        shadowColor: "#D4D4D4",
                    },
                    textInput: {
                        backgroundColor: textInputBackgroundColor || "white",
                        fontSize: 16,
                        fontWeight: 600,
                        marginTop: 5,
                        width: "100%",
                        borderRadius: 200,
                    },
                    listView: {
                        backgroundColor: textInputBackgroundColor || "white",
                        position: "relative",
                        top: 100,
                        width: "100%",
                        borderRadius: 10,
                        shadowColor: "#D4D4D4",
                        zIndex: 99,
                    },
                }}
            />
        </View>
    );
};

export default GoogleTextInput;
