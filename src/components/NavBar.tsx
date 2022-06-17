import React from "react";
import { Box, Flex, Link } from "@chakra-ui/layout";
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/button";
import { isServerSideRendered } from "../utils/isServerSideRendered";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{fetching: logoutFetching}, logout] = useLogoutMutation()
    const [{data, fetching}] = useMeQuery({
        // Stop this request from getting sent every time the page refreshes if
        // the main page is server side rendered
        pause: isServerSideRendered(),
    })
    let body = null

    if (fetching) {
        //data is loading
    } else if (!data?.me) {
        //user is not logged in
        body = (
            <>
                <NextLink href='/login'>
                   <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href='/register'>
                    <Link>Register</Link>
                </NextLink>
            </>
        );
    } else {
        //user is logged in
        body = (
            <Flex>
                 <Box mr={2}>Logged in as : {data.me.username}</Box>
                 <Button onClick={() => {logout()}}
                 isLoading={logoutFetching}
                  variant="link">Logout</Button>
            </Flex>
        )
    }

    return (
        <Flex bg="tomato" p={4}>
            <Box ml={"auto"}>
                {body}
            </Box>
        </Flex>
    )
}

