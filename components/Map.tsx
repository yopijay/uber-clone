import { icons } from "@/constants";
import { Drivers } from "@/constants/drivers";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { MarkerData } from "@/types/type";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const Map = () => {
    const {
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
    } = useLocationStore();
    const { selectedDriver, setDrivers } = useDriverStore();
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    const region = calculateRegion({
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
    });

    useEffect(() => {
        if (Array.isArray(Drivers)) {
            if (!userLatitude || !userLongitude) return;

            const newMarkers = generateMarkersFromData({
                data: Drivers,
                userLatitude,
                userLongitude,
            });

            setMarkers(newMarkers);
        }
    }, []);

    return (
        <MapView
            style={{ ...StyleSheet.absoluteFillObject }}
            provider={PROVIDER_GOOGLE}
            className="w-full h-full rounded-2xl"
            tintColor="black"
            showsPointsOfInterest={false}
            initialRegion={region}
            showsUserLocation={true}
            userInterfaceStyle="light"
        >
            {markers.map((marker) => (
                <Marker
                    key={marker.id}
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    }}
                    title={marker.title}
                    image={
                        selectedDriver === marker.id
                            ? icons.selectedMarker
                            : icons.marker
                    }
                />
            ))}
        </MapView>
    );
};

export default Map;
