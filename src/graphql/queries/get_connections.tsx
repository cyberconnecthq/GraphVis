import { gql } from "@apollo/client";

export const GET_ADDR_CONNECTION_QUERY = gql`
    enum Network {
        ETH
        SOLANA
    }
    query identity(
        $address: String!
        $network: Network
        $after: String
        $first: Int
        $after: String
        $namespace: String
    ) {
        identity(address: $address, network: $network) {
            followings(
                namespace: $namespace
                type: FOLLOW
                first: $first
                after: $after
            ) {
                pageInfo {
                    hasNextPage
                }
                list {
                    address
                }
            }
            followers(
                namespace: $namespace
                type: FOLLOW
                first: $first
                after: $after
            ) {
                pageInfo {
                    hasNextPage
                }
                list {
                    address
                }
            }
        }
    }
`;
