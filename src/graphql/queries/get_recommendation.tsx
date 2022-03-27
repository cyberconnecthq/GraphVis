// src\graphql\queries\get_recommendation.tsx

import { gql } from "@apollo/client";

export const GET_RECOMMENDATION = gql`
    query QueryRec($address: String!) {
        recommendations(address: $address) {
            result
            data {
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                    hasPreviousPage
                }
                list {
                    address
                    domain
                    ens
                    avatar
                    recommendationReason
                    followerCount
                }
            }
        }
    }
`;
