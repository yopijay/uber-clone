import { SignedIn, useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";

const Home = () => {
    const { user } = useUser();
    return (
        <SignedIn>
            <Text>{user?.emailAddresses[0]?.emailAddress}</Text>
        </SignedIn>
    );
};

export default Home;
