import { Box, Image, Text } from "@chakra-ui/react";

export default function UserProfile({user}) {
    return(<>
    <Box>
        <Image src={user.PhotoURL}/>
        <Text >
            <i>@{user.username}</i>
        </Text>
        <Text>
            {user.displayName}
        </Text>
    </Box>
    
    </>)

}